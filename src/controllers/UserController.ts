import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import md5 from "md5";
export default class UserController {
  public static GetAllUsers = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
      console.log(err.message);
      res.status(400);
    }
  };
  public static GetUser = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
      console.log(err.message);
      res.status(400);
    }
  };
  public static Register = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
      console.log(err.message);
      res.status(400);
    }
  };
  public static Login = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
      console.log(err.message);
      res.status(400);
    }
  };
  public static UpdateUser = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
      console.log(err.message);
      res.status(400);
    }
  };
}
