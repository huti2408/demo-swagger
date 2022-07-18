import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import md5 from "md5";
import lodash from "lodash";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";

interface DecodeType {
  _id: string;
  user_id: string;
  iat: number;
  exp: number;
}

export default class UserController {
  public static async GetAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (err: any) {
      console.log(err.message);
      return res.status(404).json({ error: err.message });
    }
  }
  public static async GetUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await UserModel.findById(user_id);
      return res.status(200).json(user);
    } catch (err: any) {
      console.log(err.message);
      return res.status(404).json({ error: err.message });
    }
  }
  public static async Register(req: Request, res: Response) {
    try {
      const { username, name, password } = req.body;
      var passwordHash = md5(password);
      var existedUser = await UserModel.findOne({ username });
      if (existedUser) {
        return res
          .status(400)
          .json({ message: "Username is already existed!" });
      } else {
        await UserModel.create({ username, name, password: passwordHash });
        return res.status(201).json({ message: "Register Succsessfully!" });
      }
    } catch (err: any) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
  }
  public static async Login(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const password = md5(req.body.password);

      if (!username || !password) {
        return res.status(404).json({ message: "Username doesn't exist" });
      }
      const user = await UserModel.findOne({ username });
      if (!user || user.password !== password) {
        return res
          .status(400)
          .json({ message: "Username or password is not correct!" });
      }
      const userid = user._id;
      const token = await jwt.sign(
        { user_id: userid },
        process.env.KEY_JWT || "ABC",
        { expiresIn: 60 * 60 * 4 }
      );
      return res.status(200).json({ token, userid });
    } catch (err: any) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
  }
  public static async UpdateUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const token = req.headers["authorization"]?.split(" ")[1] || "";
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "You have to login!" });
      }
      const user = await UserModel.findById(user_id);
      const decode = jwt.decode(token) as DecodeType;

      if (decode.user_id !== user._id.toString()) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "You don't have permission to do this" });
      }
      lodash.extend(user, req.body);
      user?.save();
      return res.status(200).json("Update Successful!");
    } catch (err: any) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
  }
}
