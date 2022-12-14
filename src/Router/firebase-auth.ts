import express from "express";
import {
  createUser,
  loginUser,
  emailVerification,
  logout,
  updateUserEmail,
} from "../firebase-controllers/authController";
const firebaseAuthRouter = express.Router();

firebaseAuthRouter.route("/").post(createUser);
firebaseAuthRouter.route("/login").post(loginUser);
firebaseAuthRouter.route("/verify").post(emailVerification);
firebaseAuthRouter.route("/logout").post(logout);
firebaseAuthRouter.route("/update/email").post(updateUserEmail);

export { firebaseAuthRouter };
