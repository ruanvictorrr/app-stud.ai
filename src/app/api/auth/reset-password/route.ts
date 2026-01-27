import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const token = (body?.token || "").toString().trim();
    const password = (body?.password || "").toString();

    if (!token || token.length < 20) {
      return NextResponse.json(
        { success: false, error: "Token inválido." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const prt = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!prt) {
      return NextResponse.json(
        { success: false, error: "Token inválido ou expirado." },
        { status: 400 }
      );
    }

    if (prt.expiresAt && prt.expiresAt.getTime() < Date.now()) {
      // limpa token expirado
      await prisma.passwordResetToken.delete({ where: { token } }).catch(() => {});
      return NextResponse.json(
        { success: false, error: "Token expirado. Solicite um novo link." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: prt.userId },
      data: { passwordHash },
    });

    // token usado -> remove
    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("RESET_PASSWORD_ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao redefinir senha.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Método não permitido." },
    { status: 405 }
  );
}
