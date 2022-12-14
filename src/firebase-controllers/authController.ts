import { Request, Response } from "express";
import { firebaseAdmin } from "../firebase/firebase-admin";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { firebase } from "../firebase/firbase-config";

const Auth = firebaseAdmin.auth();
const firebaseAuth = getAuth(firebase);

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, contact } = req.body;
    if (!name || !email || !password || !contact) {
      return res.status(422).json({
        status: "Fail",
        message: "Fill all detail...",
      });
    }
    await Auth.createUser({
      email: email,
      password: password,
      displayName: name,
      phoneNumber: contact,
    })
      .then((doc: any) => {
        res.status(201).json({
          status: "success",
          message: "user created and login succesfully...",
          data: doc,
        });
      })
      .catch((err: any) => {
        res.status(404).json({
          status: "Fail",
          message: err.message,
        });
      });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "something is problem!..",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((user: any) => {
        // Sign in user
        res.status(200).json({
          status: "success",
          message: "user sign in successfully...",
          user: user,
        });
      })
      .catch((err: any) => {
        res.status(404).json({
          status: "Fail",
          message: err.message,
        });
      });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "something is problem!..",
      error: error.message,
    });
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "something is problem!..",
      error: error.message,
    });
  }
};

export const emailVerification = async (req: Request, res: Response) => {
  try {
    const currentUser: any = firebaseAuth.currentUser;
    if (!currentUser.emailVerified) {
      await sendEmailVerification(currentUser)
        .then(() => {
          res.status(201).json({
            status: "success",
            message: "link send successfully...",
          });
        })
        .catch((err: any) => {
          res.status(404).json({
            status: "fail",
            message: err.message,
          });
        });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Email verify already...",
      });
    }
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "something is problem!..",
      error: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    signOut(firebaseAuth)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: "signOut user",
        });
      })
      .catch((err: any) => {
        res.status(404).json({
          status: "Fail",
          message: err.message,
        });
      });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "something is problem!..",
      error: error.message,
    });
  }
};

export const updateUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        status: "Fail",
        message: "Enter new Email",
      });
    }
    const currentUser: any = firebaseAuth.currentUser;
    if (!currentUser) {
      return res.status(422).json({
        status: "Fail",
        message: "No any current User...",
      });
    }
    updateEmail(currentUser, email)
      .then((doc: any) => {
        res.status(200).json({
          status: "success",
          message: "Email update successfully",
          data: doc,
        });
      })
      .catch((err: any) => {
        res.status(422).json({
          status: "Fail",
          message: err.message,
        });
      });
  } catch (err: any) {
    res.status(404).json({
      status: "Fail",
      message: "something is problem",
      Error: err.message,
    });
  }
};
