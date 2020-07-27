import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Mail server working."));
app.post("/contactmail", (req, res) => {
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

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD,
        },
    });
    const emailToSend = {
        from: process.env.MAIL,
        to: email,
        subject: `${email} contacted you! | Mailserver`,
        html: `<p>Message from ${email}</p><p>${message}</p>`,
    };
    transport.sendMail(emailToSend).then(response => {
        console.log(response);
        res.sendStatus(200);
    }).catch(console.log);
});

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => console.log(`Mail server listening on port ${PORT}`));
