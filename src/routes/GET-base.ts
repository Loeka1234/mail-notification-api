import express from "express";
import { BASE } from "../constants";

const router = express.Router();

router.get(BASE ?? "/", (req, res) => {
  return res.json({
    message: "mail-notification-api working",
  });
});

export { router as GETBaseRouter };
