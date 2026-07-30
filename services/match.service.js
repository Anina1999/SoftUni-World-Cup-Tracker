import { prisma } from "../src/lib/prisma.js";

export async function create(matchData, userId) {
    const result = await prisma.match.create({
        data: {
            ...matchData,
            userId,
        },
    });

    return result;
}