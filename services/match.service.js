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
        },
        include: {
            likedBy: true,
        },
    });

    return result;
}

export function hitLike(matchId, userId) {
    return prisma.match.update({
        where: {
            id: matchId
        },
        data: {
            likedBy: {
                connect: {
                    id: userId,
                }
            }
        }
    })
}

export function getRecents() {
    //better with createdAt if in schema
    return prisma.match.findMany({
        orderBy: {
            id: 'desc',
        },
        take: 3,
    });
}