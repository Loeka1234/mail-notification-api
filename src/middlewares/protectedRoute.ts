import { Response, Request, NextFunction } from "express";
import { API_KEY } from "../constants";

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apiKey } = req.body;
  if (apiKey !== API_KEY?.toString()) return res.sendStatus(401);
  else next();
};
