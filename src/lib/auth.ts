import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "studai_session";
const SESSION_DAYS = 30;

export type CurrentUser =
  | {
      id: string;
      email: string;
      role?: string;
      name?: string | null;
    }
  | null;

/** Emails admin via env (recomendado) */
export function isAdminEmail(email: string) {
  const one = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  if (one && email.toLowerCase() === one) return true;

  const many = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (many.length && many.includes(email.toLowerCase())) return true;

  return false;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

/**
 * Cria sessão no DB e retorna token + expires.
 * (A rota de login deve setar cookie)
 */
export async function createSession(userId: string, days: number = SESSION_DAYS) {
  const sessionToken = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId,
      sessionToken,
      expires,
    },
  });

  return { sessionToken, expires };
}

/** Destroi a sessão do token (se existir) */
export async function destroySession(sessionToken: string) {
  try {
    await prisma.session.delete({ where: { sessionToken } });
  } catch {
    // ignore
  }
}

/** Seta cookie de sessão (usado por algumas rotas/handlers) */
export async function setSessionCookie(params: { token: string; expires: Date }) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, params.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: params.expires,
  });
}

/** Limpa cookie de sessão */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

/**
 * ✅ Resiliente: se o DB estiver fora, não quebra o app.
 */
export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: { user: true },
    });

    if (!session) return null;

    if (session.expires && session.expires.getTime() < Date.now()) {
      return null;
    }

    if (!session.user) return null;

    return {
      id: session.user.id,
      email: session.user.email,
      role: (session.user as any).role,
      name: (session.user as any).name ?? null,
    };
  } catch {
    console.warn("[auth] DB indisponível, retornando user=null");
    return null;
  }
}

/**
 * ✅ “Obrigar usuário logado” para rotas protegidas (ex.: upload)
 * Se não estiver logado, lança erro com status 401.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    const err: any = new Error("Não autorizado");
    err.status = 401;
    throw err;
  }
  return user;
}
