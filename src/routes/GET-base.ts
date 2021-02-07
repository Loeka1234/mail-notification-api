import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.json({
    message: "mail-notification-api working",
  });
});

export { router as GETBaseRouter };
