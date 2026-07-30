import { prisma } from "../src/lib/prisma.js";

export async function register(userData) {
    const result = await prisma.user.create({
        data: userData,
    });

    return result;
}