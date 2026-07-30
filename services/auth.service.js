import bcrypt from 'bcrypt';
import { prisma } from "../src/lib/prisma.js";

export async function register(userData) {
    const result = await prisma.user.create({
        data: userData,
    });

    return result;
}

export async function login(email, password) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    //Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    return user;
}