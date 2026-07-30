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

export async function getAll() {
    const result = await prisma.match.findMany();

    return result;
}

export async function getById(matchId) {
    const result = await prisma.match.findUnique({
        where: {
            id: matchId
        }
    });

    return result;
}