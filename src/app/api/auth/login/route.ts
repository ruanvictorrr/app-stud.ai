import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword, isAdminEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = (body?.email || "").toString().trim().toLowerCase();
    const password = (body?.password || "").toString();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    // garante admin se o email estiver na lista
    if (isAdminEmail(user.email) && user.role !== "ADMIN") {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      });
      user.role = "ADMIN";
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    console.error("LOGIN_ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao fazer login.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
