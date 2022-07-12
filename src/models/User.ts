import { model, Schema } from "mongoose";
interface User {
  username: string;
  name: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    min: [8, "Username must be at least 8 character"],
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Username must be at least 8 character"],
  },
});
const UserModel = model<User>("User", UserSchema);
export default UserModel;
