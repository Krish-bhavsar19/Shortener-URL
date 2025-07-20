const user = require("../Models/user");
const { setUser } = require('../Service/auth');

async function HandleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("signup", {
                error: "All fields are required.",
                name,
                email
            });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).render("signup", {
                error: "User with this email already exists.",
                name,
                email
            });
        }

        await user.create({ name, email, password });

        return res.redirect("/login");

    } catch (err) {
        return res.status(500).render("signup", {
            error: "Something went wrong. Please try again.",
            name: req.body.name,
            email: req.body.email
        });
    }
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
