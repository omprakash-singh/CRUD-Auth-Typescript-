import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  name: String,
  email: String,
  contact: String,
});
export const User = Mongoose.model("User", UserSchema);
