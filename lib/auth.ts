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


