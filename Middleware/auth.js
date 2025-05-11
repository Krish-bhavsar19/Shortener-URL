const { getUser } = require('../Service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const userId = req.cookies?.uid;
    if (!userId) return res.redirect("/login?error=Please log in to continue");

    const user = getUser(userId);
    if (!user) return res.redirect("/login?error=Invalid or expired session. Please log in again");

    req.user = user;
    next();
}

module.exports = { restrictToLoggedinUserOnly };