import express, { Application } from "express";
import Mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { Router } from "./Router/index";
import { firebaseAuthRouter } from "./Router/firebase-auth";
import { FirebaseRouter } from "./Router/firebase";
import fileUpload from "express-fileupload";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Note that this option available for versions 1.0.0 and newer.
app.use(
  fileUpload({
    limits: {
      fileSize: 1000000,
    },
  })
);

const db = process.env.DB_URL;
Mongoose.connect(
  db as string,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
  } as ConnectOptions
)
  .then((db) => {
    console.log("Connection successfully..");
  })
  .catch((err: any) => {
    console.log("DB error message: ", +err);
  });

app.use("/", Router);
app.use("/auth/user", firebaseAuthRouter);
app.use("/upload", FirebaseRouter);

app.listen(PORT, () => {
  console.log(`Running on port http://localhost:${PORT}`);
});
