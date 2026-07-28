import * as z from 'zod';
import bcrypt from 'bcrypt';

export const createUserSchema = z.object({
    email: z.string()
        .min(10, { message: 'Email must be at least 10 characters long' })
        .email({ message: 'Invalid email address' }),
    password: z.string()
        .min(4, { message: 'Password must be at least 4 characters long' }),
    rePassword: z.string()
        .min(4, { message: 'Password must be at least 4 characters long' })
}).refine((data) => data.password === data.rePassword, { 
    message: 'Passwords do not match',
    path: ["password"]
}).transform( async ({rePassword, ...data}) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return { ...data, password: hashedPassword };
})