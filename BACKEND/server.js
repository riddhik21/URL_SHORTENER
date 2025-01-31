// backend/server.js
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

let urls = JSON.parse(fs.readFileSync(path.join(__dirname, "urls.json")));
// Route for shortening URLs
app.post("/shorten", (req, res) => {
    const originalUrl = req.body.originalUrl;
    if (!originalUrl) {
        return res.status(400).send("URL is required!");
    }

    const shortUrl = Math.random().toString(36).substring(2, 8);
    urls[shortUrl] = originalUrl;
    fs.writeFileSync("urls.json", JSON.stringify(urls));

    res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
});

// Route for redirecting to original URL
app.get("/:shortUrl", (req, res) => {
    const originalUrl = urls[req.params.shortUrl];
    if (!originalUrl) {
        return res.status(404).send("URL not found!");
    }
    res.redirect(originalUrl);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
