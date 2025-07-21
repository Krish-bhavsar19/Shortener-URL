const { nanoid } = require("nanoid");
const URL = require("../Models/url");

async function HandleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const ShortId = nanoid(8);
    await URL.create({
        shortId: ShortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    const baseUrl = process.env.BASE_URL;

    return res.render("home", {
        id: ShortId,
        fullUrl: `${baseUrl}/${ShortId}`, 
        user: req.user,
    });
}

module.exports = { HandleGenerateNewShortUrl };
