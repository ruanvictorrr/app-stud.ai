import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("AUTH_ME_ERROR:", err);
    return NextResponse.json(
      { success: true, user: null },
      { status: 200 }
    );
  }
}
