import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import md5 from "md5";
import lodash from "lodash";
import UserModel from "../models/User";

export default class UserController {
  public static async GetAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err: any) {
      console.log(err.message);
      res.status(404).json({ error: err.message });
    }
  }
  public static async GetUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await UserModel.findById(user_id);
      res.status(200).json(user);
    } catch (err: any) {
      console.log(err.message);
      res.status(404).json({ error: err.message });
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
        await UserModel.create({ username, name, passwordHash });
        res.status(201).json({ message: "Register Succsessfully!" });
      }
    } catch (err: any) {
      console.log(err.message);
      res.status(400).json({ error: err.message });
    }
  }
  public static async Login(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const password = md5(req.body.password);
      if (!username || !password) {
        res.status(400).json({ message: "Username doesn't exist" });
      }
      const user = await UserModel.findOne({ username });
      if (!user || user.password !== password) {
        res
          .status(400)
          .json({ message: "Username or password is not correct!" });
      }
      const userid = user._id;
      const token = await jwt.sign(
        { _id: userid },
        process.env.KEY_JWT || "ABC",
        { expiresIn: 60 * 60 * 4 }
      );
      res.status(200).json({ token, userid });
    } catch (err: any) {
      console.log(err.message);
      res.status(400).json({ error: err.message });
    }
  }
  public static async UpdateUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await UserModel.findById(user_id);
      lodash.extend(user, req.body);
      user?.save();
      res.status(200).json("Update Successful!");
    } catch (err: any) {
      console.log(err.message);
      res.status(400).json({ error: err.message });
    }
  }
}
