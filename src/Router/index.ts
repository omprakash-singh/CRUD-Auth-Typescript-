import express from "express";
import { create, getUser, putUser, deleteUser } from "../controllers/index";

const Router = express.Router();

Router.route("/").post(create);
Router.route("/user").get(getUser);
Router.route("/update/:_id").put(putUser);
Router.route("/delete/:_id").delete(deleteUser);

export { Router };
