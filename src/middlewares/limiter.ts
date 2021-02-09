import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  handler: (_, res) => {
    return res.status(429).json({
      error: "You are contacting to much times. Please try again in a minute.",
    });
  },
});
