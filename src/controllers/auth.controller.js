import { createUserSchema } from "../schemas/auth.schema.js";
import { getErrorMessage } from "../utils/error.utils.js";

export function getRegisterPage(req, res) {
    res.render('auth/register');
}

export async function register(req, res) {

    try {
        const userData = await createUserSchema.parseAsync(req.body);
        console.log('Validated and transformed user data:', userData);

        //Call auth service to create user (not implemented yet)
        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('auth/register', { err: errorMessage, user: req.body });
    }
}