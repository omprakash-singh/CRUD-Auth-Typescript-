import { Request, Response } from "express";
import { firebase } from "../firebase/firbase-config";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebase);

export const createData = async (req: Request, res: Response) => {
  try {
    await setDoc(doc(db, "UsersData", "User1"), req.body)
      .then(() => {
        res.status(201).json({
          status: "success",
          message: "Data saved",
        });
      })
      .catch((err: any) => {
        res.status(404).json({
          status: "fail",
          message: err.message,
        });
      });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem in server",
      error: error.message,
    });
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const docRef = doc(db, "UsersData", "User1");
    await updateData(docRef, req.body);
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem in server",
      error: error.message,
    });
  }
};
