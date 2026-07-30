import * as z from 'zod';

export const createMatchSchema = z.object({
    homeTeam: z.string()
        .min(1, 'Home team is required'),
    awayTeam: z.string()
        .min(1, 'Away team is required'),
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
        .min(1, 'Venue is required'),
    date: z.string()
        .min(1, 'Date is required'),
    imageUrl: z.string()
        .url('Image URL must be a valid URL'),
    description: z.string().min(1, 'Description is required'),
})