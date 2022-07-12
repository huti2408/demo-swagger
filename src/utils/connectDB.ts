import mongoose from "mongoose";
const connectDB = async () => {
  const url: string = process.env.DB_URL || "";
  await mongoose
    .connect(url, {})
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => console.error(err.message));
};
export default connectDB;
