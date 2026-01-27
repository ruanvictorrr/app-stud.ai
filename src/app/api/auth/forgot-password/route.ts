import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  console.log("🚀 /api/auth/forgot-password HIT");

  try {
    const body = await req.json().catch(() => null);
    const email = (body?.email || "").toString().trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email é obrigatório." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // ⚠️ Segurança: não revelar se existe ou não
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // remove tokens antigos
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // gera token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1h

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // monta link (funciona mesmo sem NEXT_PUBLIC_APP_URL)
    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      req.nextUrl.origin ||
      "http://localhost:3000";

    const resetLink = `${origin}/reset-password?token=${token}`;

    console.log("🔐 RESET PASSWORD LINK:");
    console.log(resetLink);

    // ✅ futuramente: enviar email aqui (Resend/Sendgrid/Mailgun)
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FORGOT_PASSWORD_ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao processar solicitação." },
      { status: 500 }
    );
  }
}

// (Opcional) Se alguém acessar via GET no browser, retorna 405 bonitinho
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Método não permitido." },
    { status: 405 }
  );
}
