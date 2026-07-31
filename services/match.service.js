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
            createdAt: 'desc',
        },
        take: 3,
    });
}

export function removeMatchById(matchId, userId) {
    return prisma.match.delete({
        where: {
            id: matchId,
            userId
        }
    });
}

export async function update(matchId, matchData, userId) {
 return prisma.match.update({
    where: {
        id: matchId,
        userId,
    },
    data: matchData,
 })
}

export async function getTopScoredMatches() {
    const matches = await prisma.match.findMany({
        include: {
            owner: true,
        }
    });

    const topScoredMatches = matches.map(match => ({
            ...match,
            totalGoals: match.homeGoals + match.awayGoals,
        }))
        .sort((a, b) => b.totalGoals - a.totalGoals)
        .slice(0, 3); 

    return topScoredMatches;
}