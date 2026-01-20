import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({
    success: true,
    user: user
      ? { id: user.id, name: user.name, email: user.email, role: user.role }
      : null,
  });
}
