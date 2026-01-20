import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("LOGOUT_ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao sair.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
