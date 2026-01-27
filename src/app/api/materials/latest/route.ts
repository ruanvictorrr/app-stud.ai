import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser(req);

    const latest = await prisma.studyMaterial.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        topic: true,
        originalFilename: true,
        mimeType: true,
        data: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: latest || null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: "Não autenticado", details: e?.message || String(e) },
      { status: 401 }
    );
  }
}
