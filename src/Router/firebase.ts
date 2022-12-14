import express from "express";
const FirebaseRouter = express.Router();
import { uploadImage } from "../firebase-controllers/stroageController";

FirebaseRouter.route("/").post(uploadImage);

export { FirebaseRouter };
