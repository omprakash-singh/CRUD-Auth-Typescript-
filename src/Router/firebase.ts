import express from "express";
const FirebaseRouter = express.Router();
import { uploadImage } from "../firebase-controllers/stroageController";
import { createData } from "../firebase-controllers/dbController";

FirebaseRouter.route("/").post(uploadImage);
FirebaseRouter.route("/firestore/create").post(createData);

export { FirebaseRouter };
