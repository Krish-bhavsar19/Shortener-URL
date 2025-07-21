const express = require("express");
const { restrictToLoggedinUserOnly } = require('../middleware/auth');
const { getUser } = require('../Service/auth');
const URL = require("../Models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const user = req.cookies?.uid ? getUser(req.cookies.uid) : null;
        return res.render("home", { user, id: null });
    } catch (error) {
        console.error(error);
        return res.render("home", { user: null, id: null });
    }
});

router.get("/signup", (req, res) => {
    const error = req.query.error;
    return res.render("signup", { error });
});

router.get("/login", (req, res) => {
    const error = req.query.error;
    return res.render("login", { error });
});

router.get("/dashboard", restrictToLoggedinUserOnly, async (req, res) => {
    const urls = await URL.find({ createdBy: req.user._id });
    res.render("dashboard", { urls, baseUrl: process.env.BASE_URL });

});

router.get("/logout", (req, res) => {
    res.clearCookie("uid");
    return res.redirect("/login");
});

module.exports = router;
