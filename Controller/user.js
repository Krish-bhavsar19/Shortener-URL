const user = require("../Models/user");
const { setUser } = require('../Service/auth');

async function HandleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await user.create({
        name,
        email,
        password,
    });
    return res.redirect("/login");
}

async function HandleUserLogin(req, res) {
    const { email, password } = req.body;
    const User = await user.findOne({ email, password });
    if (!User) {
        return res.render("login", {
            error: "Invalid email or password",
        });
    }
    const token = setUser(User);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = {
    HandleUserSignup,
    HandleUserLogin,
};