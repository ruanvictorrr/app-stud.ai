import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "studai_session";
const SESSION_DAYS = 30;

function parseAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  const admins = parseAdminEmails();
  return admins.includes(email.toLowerCase());
}

export async function hashPassword(plain: string) {
  const saltRounds = 12;
  return bcrypt.hash(plain, saltRounds);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function makeSessionToken() {
  return randomBytes(32).toString("hex");
}

export function sessionExpiryDate() {
  const d = new Date();
  d.setDate(d.getDate() + SESSION_DAYS);
  return d;
}

export async function createSession(userId: string) {
  const sessionToken = makeSessionToken();
  const expires = sessionExpiryDate();

  await prisma.session.create({
    data: {
      userId,
      sessionToken,
      expires,
    },
  });

  // seta cookie (httpOnly)
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });

  return { sessionToken, expires };
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
  }

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });

  if (!session) return null;

  // Expirada
  if (session.expires.getTime() < Date.now()) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
    return null;
  }

  // Se email estiver na lista ADMIN_EMAILS, garante role ADMIN
  const user = session.user;
  if (user.email && isAdminEmail(user.email) && user.role !== "ADMIN") {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });
    user.role = "ADMIN";
  }

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}
