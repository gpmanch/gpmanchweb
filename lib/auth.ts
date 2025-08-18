import jwt, { type Secret } from "jsonwebtoken";
import { cookies, headers } from "next/headers";

function getSecret(envVarName: string, devFallback?: string): Secret {
    const value = process.env[envVarName] ?? (process.env.NODE_ENV !== "production" ? devFallback : undefined);
    if (!value) {
        throw new Error(`${envVarName} is not set`);
    }
    return value as Secret;
}

export async function getCurrentUserId(): Promise<string | null> {
    const h = await headers();
    const auth = h.get("authorization");
    let token: string | undefined;

    if (auth && auth.startsWith("Bearer ")) {
        token = auth.slice(7);
    }
    if (!token) {
        const c = await cookies();
        token = c.get("accessToken")?.value;
    }
    if (!token) return null;

    try {
        const payload = jwt.verify(token, getSecret("ACCESS_TOKEN_SECRET", "dev-access-secret"));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return typeof payload === "object" && payload && "id" in payload ? (payload as any).id : null;
    } catch {
        return null;
    }
}


