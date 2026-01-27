import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// Limite do FREE por mês (mude quando quiser)
const FREE_LIMIT_PER_MONTH = 5;

function isSameMonth(a: Date, b: Date) {
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();
}

function isProActive(dbUser: { plan: any; proUntil: Date | null }) {
  if (dbUser.plan !== "PRO") return false;
  if (!dbUser.proUntil) return false;
  return dbUser.proUntil.getTime() > Date.now();
}

export async function GET() {
  try {
    const user = await requireUser();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        role: true,
        plan: true,
        proUntil: true,
        monthlyUsed: true,
        monthlyResetAt: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const now = new Date();

    // reset mensal se virou o mês
    if (!isSameMonth(dbUser.monthlyResetAt, now)) {
      const updated = await prisma.user.update({
        where: { id: dbUser.id },
        data: { monthlyUsed: 0, monthlyResetAt: now },
        select: {
          role: true,
          plan: true,
          proUntil: true,
          monthlyUsed: true,
          monthlyResetAt: true,
        },
      });

      dbUser.role = updated.role;
      dbUser.plan = updated.plan;
      dbUser.proUntil = updated.proUntil;
      dbUser.monthlyUsed = updated.monthlyUsed;
      dbUser.monthlyResetAt = updated.monthlyResetAt;
    }

    const admin = dbUser.role === "ADMIN";
    const proActive = isProActive({ plan: dbUser.plan, proUntil: dbUser.proUntil });

    // Admin e PRO não têm limite
    if (admin || proActive) {
      return NextResponse.json({
        success: true,
        allowed: true,
        plan: admin ? "ADMIN" : "PRO",
        monthlyUsed: null,
        limit: null,
        proUntil: dbUser.proUntil,
      });
    }

    // FREE
    const allowed = dbUser.monthlyUsed < FREE_LIMIT_PER_MONTH;

    return NextResponse.json({
      success: true,
      allowed,
      plan: "FREE",
      monthlyUsed: dbUser.monthlyUsed,
      limit: FREE_LIMIT_PER_MONTH,
      proUntil: null,
    });
  } catch (e: any) {
    const msg = e?.message || String(e);

    if (msg === "UNAUTHORIZED") {
      return NextResponse.json(
        { success: false, error: "Não autenticado." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erro ao checar limite.", details: msg },
      { status: 500 }
    );
  }
}
