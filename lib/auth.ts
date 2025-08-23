import { headers } from "next/headers";
import { verifyAccessToken, type TokenPayload } from "@/lib/jwt";

export { type TokenPayload } from "@/lib/jwt";

// Server-side utility to get current user from request headers
export async function getCurrentUserFromHeaders(): Promise<TokenPayload | null> {
    try {
        const headersList = await headers();
        const authHeader = headersList.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.substring(7);
        return verifyAccessToken(token);
    } catch {
        return null;
    }
}

// Server-side utility to check if user is admin from request headers
export async function isUserAdminFromHeaders(): Promise<boolean> {
    const user = await getCurrentUserFromHeaders();
    return user?.isAdmin === true;
}

// Server action utility to get current user ID from cookies
export async function getCurrentUserId(): Promise<string | null> {
    try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token) {
            return null;
        }

        const payload = verifyAccessToken(token);
        return payload?.userId || null;
    } catch {
        return null;
    }
}


