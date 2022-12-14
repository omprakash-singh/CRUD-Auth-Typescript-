import { Request, Response } from "express";
import { firebase } from "../firebase/firbase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage(firebase);
import express from "express";

export const uploadImage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const file: any = req.files?.file;
    res.send(file);
    console.log(file);
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem..",
      error: error,
    });
  }
};
