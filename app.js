import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "https://gridflock.github.io",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

const users = [];

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
}

app.post("/register", (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Всі поля обов'язкові!"})
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: "Невірна адреса електронної пошти!"})
    }
    if (!isValidPassword(password)) {
        return res.status(400).json({ success: false, message: "Пароль повинен містити мінімум 6 символів, принаймні одну літеру та одну цифру!"})
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: "Користувач з таким email вже існує!"})
    }
    users.push({ email, password});

    console.log("Registered users:", email);

    res.json({ success: true, message: "Користувача успішно зареєстровано!"});

});
app.get("/", (req, res) => {
    res.send("Server is running");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})