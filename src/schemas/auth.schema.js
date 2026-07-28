import * as z from 'zod';

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
}).transform(({rePassword, ...data}) => {
    return data;
})