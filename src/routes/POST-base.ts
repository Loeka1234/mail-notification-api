import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import { protectedRoute } from "../middlewares/protectedRoute";
import { escapeString } from "../utils/escapeString";
import { MailOptions } from "nodemailer/lib/json-transport";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.post(
  "/",
  limiter,
  protectedRoute,
  [
    body("fromEmail").isEmail(),
    body("toEmail").isEmail(),
    body("message").trim().isString().isLength({
      min: 1,
      max: 500,
    }),
    body("subject").trim().isLength({
      min: 1,
      max: 30,
    }),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) res.status(400).json(errors.array());

    const { fromEmail, toEmail, message, subject } = req.body;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    const emailToSend: MailOptions = {
      from: process.env.EMAIL,
      to: toEmail,
      subject: `${fromEmail} contacted you! | Mailserver Loeka`,
      html:
        `<p>Message from ${fromEmail}</p>` +
        (subject ? `<p>Subject: ${escapeString(subject)}</p>` : "") +
        `<p>${escapeString(message)}</p>`,
    };
    transport
      .sendMail(emailToSend)
      .then(response => {
        console.log(`Email from ${fromEmail} to ${response.envelope.to}`);
        res.sendStatus(200);
      })
      .catch(console.log);
  }
);

export { router as POSTBaseRouter };
