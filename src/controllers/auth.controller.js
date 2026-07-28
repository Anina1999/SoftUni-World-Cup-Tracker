import { createUserSchema } from "../schemas/auth.schema.js";
import { getErrorMessage } from "../utils/error.utils.js";

export function getRegisterPage(req, res) {
    res.render('auth/register');
}

export function register(req, res) {

    try {
        const userData = createUserSchema.parse(req.body);

        //Call auth service to create user (not implemented yet)
        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('auth/register', { err: errorMessage, user: req.body });
    }
}