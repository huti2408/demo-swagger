import { model, Schema } from "mongoose";
interface Post {
  title: string;
  subContent: string;
  content: string;
  author_id: string;
}

const PostSchema = new Schema<Post>({
  title: {
    type: String,
    required: [true, "Title is required!"],
    unique: true,
  },
  subContent: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
  },
});
const PostModel = model<Post>("Post", PostSchema);
export default PostModel;
