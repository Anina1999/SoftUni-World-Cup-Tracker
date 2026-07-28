export function getRegisterPage(req, res) {
    res.render('auth/register');
}

export function register(req, res) {
    console.log(req.body);

    res.redirect('/');
}