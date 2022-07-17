import { Request, Response } from "express";
import PostModel from "../models/Post";
import lodash from "lodash";
import { StatusCodes } from "http-status-codes";
export default class PostController {
  public static async GetAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostModel.find();
      res.status(200).json(posts);
    } catch (err: any) {
      console.log(err.message);
      res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
    }
  }
  public static async GetPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await PostModel.findById(id);
      res.status(StatusCodes.OK).json({ post });
    } catch (err: any) {
      console.log(err.message);
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
  public static async CreatePost(req: Request, res: Response) {
    try {
      ///Author ID get from JWT Login
      const { title, subContent, content } = req.body;
      const authorId = "";
      await PostModel.create({
        authorId,
        title,
        subContent,
        content,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "Create Successfully!" });
    } catch (err: any) {
      console.log(err.message);
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
  public static async UpdatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await PostModel.findById(id);
      lodash.extend(post, req.body);
      await post?.save();
      return res
        .status(StatusCodes.OK)
        .json({ message: "Update Successfully!" });
    } catch (err: any) {
      console.log(err.message);
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
  public static async DeletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await PostModel.findByIdAndDelete(id);
      res.status(StatusCodes.OK).json({ message: "Deleted Post" });
    } catch (err: any) {
      console.log(err.message);
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
}
