import * as z from "zod";

export const getErrorMessage = (error) => {
    let err = null;

    if (error.name === 'ZodError') {
        const errors = z.flattenError(error).fieldErrors;
        err = Object.values(errors).flat().at(0) || 'Invalid input';
    } else if (error.name === 'PrismaClientKnownRequestError') {
        switch (error.code) {
            case 'P2002':
            err = 'Unique constraint failed';
            break;

            case 'P2003':
            err = 'Foreign key constraint failed';
            break;

        default:
            err = 'Database error';
        }
    } else {
        err = error.message || 'An unexpected error occurred';
    }

    return err;
}