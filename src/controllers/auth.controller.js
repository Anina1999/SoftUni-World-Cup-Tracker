import { createUserSchema } from "../schemas/auth.schema.js";

export function getRegisterPage(req, res) {
    res.render('auth/register');
}

export function register(req, res) {

    try {
        const userData = createUserSchema.parse(req.body);

        //Call auth service to create user (not implemented yet)
        res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.status(404).send(err.errors)
    }
}