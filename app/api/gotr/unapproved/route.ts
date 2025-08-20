import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const gotras = await db.gotr.findMany({
        where: { isApproved: false },
        select: { id: true, nameHi: true, nameEn: true },
        orderBy: { nameEn: "asc" },
        });
        return NextResponse.json(gotras);
    } catch (error) {
        console.error("[GOTR_UNAPPROVED_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}