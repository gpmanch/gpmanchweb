import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { SignOptions, Secret } from "jsonwebtoken";
import { db } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";

interface CreateUserInput {
    email: string;
    password: string;
    userName?: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
}

function getSecret(envVarName: string, devFallback?: string): Secret {
    const value = process.env[envVarName] ?? (process.env.NODE_ENV !== "production" ? devFallback : undefined);
    if (!value) {
        throw new Error(`${envVarName} is not set`);
    }
    return value as Secret;
}

const ACCESS_SECRET: Secret = getSecret("ACCESS_TOKEN_SECRET", "dev-access-secret");
const ACCESS_EXPIRES_IN = (process.env.ACCESS_TOKEN_EXPIRY ?? "15m") as unknown as SignOptions["expiresIn"];
const REFRESH_SECRET: Secret = getSecret("REFRESH_TOKEN_SECRET", "dev-refresh-secret");
const REFRESH_EXPIRES_IN = (process.env.REFRESH_TOKEN_EXPIRY ?? "7d") as unknown as SignOptions["expiresIn"];

export async function createUser(data: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const normalizedEmail = data.email.toLowerCase().trim();
    const normalizedUserName = (data.userName ?? normalizedEmail.split("@")[0])
        .toLowerCase()
        .trim();

    try {
        return await db.user.create({
            data: {
                userName: normalizedUserName,
                firstName: data.firstName.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                ...(data.lastName ? { lastName: data.lastName.trim() } : {}),
                ...(data.phone ? { phone: data.phone.trim() } : {}),
                ...(data.avatar ? { avatar: data.avatar } : {}),
            },
        });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            const fields = (err.meta?.target as string[] | undefined);
            if (!fields || fields.includes("email")) {
                throw new Error("EMAIL_IN_USE");
            }
        }
        throw err;
    }
}

export async function isPasswordCorrect(userId: string, password: string): Promise<boolean> {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) return false;
    return bcrypt.compare(password, user.password);
}

export function generateAccessToken(user: User): string {
    return jwt.sign(
        {
        id: user.id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName ?? undefined,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        },
        ACCESS_SECRET,
        { expiresIn: ACCESS_EXPIRES_IN }
    );
}

export function generateRefreshToken(user: User): string {
    return jwt.sign(
        { id: user.id },
        REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRES_IN }
    );
}