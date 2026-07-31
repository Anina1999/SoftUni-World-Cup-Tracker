import * as z from 'zod';

export const createMatchSchema = z.object({
    homeTeam: z.string()
        .min(2, 'Home team is required'),
    awayTeam: z.string()
        .min(2, 'Away team is required'),
    homeGoals: z.coerce.number()
        .int()
        .nonnegative('Home goals is required and nonnegative'),
    awayGoals: z.coerce.number()
        .int()
        .nonnegative('Away goals is required and nonnegative'),
    stage: z.enum(['Group Stage', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'], {
        error: 'Stage is required'
    }),
    venue: z.string()
        .min(5, 'Venue is required and must be at least 5 characters long'),
    date: z.string()
        .min(1, 'Date is required'),
    imageUrl: z.string()
        .url('Image URL is required and must start with http:// or https://'),
    description: z.string().min(10, 'Description is required and at least 10 characters long'),
})