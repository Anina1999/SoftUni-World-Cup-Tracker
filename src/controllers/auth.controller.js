import { authService } from "../../services/index.js";
import { createUserSchema } from "../schemas/auth.schema.js";
import { getErrorMessage } from "../utils/error.utils.js";
import { createAuthToken } from "../utils/tokenUtils.js";

export function getRegisterPage(req, res) {
    res.render('auth/register');
}

export async function register(req, res) {

    try {
        const userData = await createUserSchema.parseAsync(req.body);
        console.log('Validated and transformed user data:', userData);

        const result = await authService.register(userData);

        const token = createAuthToken(result);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('auth/register', { err: errorMessage, user: req.body });
    }
}

export function getLoginPage(req, res) {
    res.render('auth/login');
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);

        const token = createAuthToken(user);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('auth/login', { err: errorMessage, user: req.body });
    }
}

export function logout (req, res) {
    res.clearCookie('auth');
    res.redirect('/');
}