import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword, isAdminEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim().toLowerCase();
    const password = (body?.password || "").toString();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "A senha precisa ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Esse email já está cadastrado." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        role: isAdminEmail(email) ? "ADMIN" : "USER",
      },
      select: { id: true, name: true, email: true, role: true },
    });

    await createSession(user.id);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("REGISTER_ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao cadastrar.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
