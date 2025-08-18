"use server";
import { db } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function isAdminByEmail({ email }: { email: string | undefined | null }): Promise<boolean> {
    if (!email || typeof email !== "string") return false;
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail) return false;
    const user = await db.user.findUnique({ where: { email: normalizedEmail }, select: { isAdmin: true } });
    return !!user?.isAdmin;
}

export async function isCurrentUserAdmin(userId: string): Promise<boolean> {
    if (!userId) return false;
    const user = await db.user.findUnique({ where: { id: userId }, select: { isAdmin: true } });
    return !!user?.isAdmin;
}

export async function isAuthedUserAdmin(): Promise<boolean> {
    const userId = await getCurrentUserId();
    if (!userId) return false;
    const user = await db.user.findUnique({ where: { id: userId }, select: { isAdmin: true } });
    return !!user?.isAdmin;
}