import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";
import { generateAccessToken as jwtGenerateAccessToken, generateRefreshToken as jwtGenerateRefreshToken, type TokenPayload } from "@/lib/jwt";

interface CreateUserInput {
    email: string;
    password: string;
    userName?: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
}

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
    const payload: TokenPayload = {
        userId: user.id,
        email: user.email,
        userName: user.userName ?? undefined,
        isAdmin: user.isAdmin,
    };
    return jwtGenerateAccessToken(payload);
}

export function generateRefreshToken(user: User): string {
    const payload: TokenPayload = {
        userId: user.id,
        email: user.email,
    };
    return jwtGenerateRefreshToken(payload);
}