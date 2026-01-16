const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { use } = require("react");

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

app.post("/register", (req, res) => {
    const{ login, password } = req.body;

    if(!login || !password) {
        return res.json({ success: false, message: "тут пусто"});
    }

    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

    const exists = users.find(u => u.login === login);
    if (exists) {
        return res.json({ success: false, message: "Користувач існує"});
    }

    users.push({ login, password });
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({ success: true, message: "Реєстрація успішна"}); 
});

