// Stuff from the last project, which is from udemy vids, also axios is
// added now
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// displays the home page
app.get("/", (req, res) => {
    res.render("index");
});

// dsiplays the results page (crypto.ejs)
app.post("/crypto", async (req, res) => {
    // the crypto ticker, which i converted to uppercase to get rid of errors
    const crypto = req.body.crypto.toUpperCase();
    // crypto api
    const cryptoResponse = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${crypto}-USD`);
    // joke api
    const jokeResponse = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single&blacklistFlags=nsfw,religious,political,racist,sexist");

    // actually renders the crypto.ejs page
    res.render("crypto", { data: cryptoResponse.data, joke: jokeResponse.data, crypto });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});