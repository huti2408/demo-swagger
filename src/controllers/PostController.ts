import { Request, Response } from "express";
import PostModel from "../models/Post";
import lodash from "lodash";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

interface DecodeType {
  _id: string;
  user_id: string;
  iat: number;
  exp: number;
}
export default class PostController {
  public static async GetAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostModel.find();
      return res.status(200).json(posts);
    } catch (err: any) {
      console.log(err.message);
      return res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
    }
  }
  public static async GetPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await PostModel.findById(id);
      return res.status(StatusCodes.OK).json({ post });
    } catch (err: any) {
      console.log(err.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
  public static async CreatePost(req: Request, res: Response) {
    try {
      ///Author ID get from JWT Login
      const { title, subContent, content } = req.body;
      const token = req.headers["authorization"]?.split(" ")[1] || "";
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "You have to login!" });
      }
      const decode = jwt.decode(token) as DecodeType;
      const author_id = decode.user_id;
      await PostModel.create({
        author_id,
        title,
        subContent,
        content,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "Create Successfully!" });
    } catch (err: any) {
      console.log(err.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
  public static async UpdatePost(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || "";
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "You have to login!" });
      }
      const decode = jwt.decode(token) as DecodeType;

      const { id } = req.params;
      const existedPost = await PostModel.findById(id);
      if (decode.user_id !== existedPost.author_id) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "You don't have permission to do this" });
      }
      lodash.extend(existedPost, req.body);
      await existedPost?.save();
      return res
        .status(StatusCodes.OK)
        .json({ message: "Update Successfully!" });
    } catch (err: any) {
      console.log(err.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
  public static async DeletePost(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || "";
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "You have to login!" });
      }
      const decode = jwt.decode(token) as DecodeType;
      const { id } = req.params;
      const existedPost = await PostModel.findById(id);
      if (decode.user_id !== existedPost.author_id) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "You don't have permission to do this" });
      }
      await PostModel.findByIdAndDelete(id);
      return res.status(StatusCodes.OK).json({ message: "Deleted Post" });
    } catch (err: any) {
      console.log(err.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
}
