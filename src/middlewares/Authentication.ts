import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const TOKEN_VALUE_INDEX = 1;

export default async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers["authorization"]?.split(" ")[TOKEN_VALUE_INDEX] || "";
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Invalid token" });
  try {
    jwt.verify(token, process.env.KEY_JWT || "abc");
    next();
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.UNAUTHORIZED).json(err);
    return;
  }
};
