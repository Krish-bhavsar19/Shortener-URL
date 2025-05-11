const express = require("express");
const { HandleGenerateNewShortUrl} = require("../Controller/url");

const router = express.Router();

router.post("/", HandleGenerateNewShortUrl);

module.exports = router;