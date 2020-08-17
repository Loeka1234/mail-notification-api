import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

dotenv.config();

const API_KEY = process.env.API_KEY;

const app = express();

app.use(cors());
app.use(express.json());

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    const { apiKey } = req.body;
    if (apiKey !== API_KEY?.toString()) res.sendStatus(401);
    else next();
};

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
});

app.get("/", (req, res) => res.send("Mail server working."));
app.post("/contactmail", protectedRoute, (req, res) => {
    const { email, message, to } = req.body;
    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(email))
        return res.status(400).json({ error: "Please provide a valid email." });
    if (!emailValidation.test(to))
        return res
            .status(400)
            .json({ error: "Please provide a valid receiver!" });
    if (!message || !message.trim())
        return res.status(400).json({ error: "Please provide a message! " });

    const emailToSend = {
        from: process.env.MAIL,
        to: email,
        subject: `${email} contacted you! | Mailserver Loeka`,
        html: `<p>Message from ${email}</p><p>${message}</p>`,
    };
    transport
        .sendMail(emailToSend)
        .then(response => {
            console.log(`Email from ${email} to ${response.envelope.to}`);
            res.sendStatus(200);
        })
        .catch(console.log);
});

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () =>
    console.log(
        `Mail server listening on port ${PORT} using API key: ${API_KEY}`
    )
);
