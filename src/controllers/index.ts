import { Request, Response } from "express";
import { User } from "../model";

export const create = (req: Request, res: Response) => {
  try {
    const { name, email, contact } = req.body;
    User.create({ name, email, contact }, (err: any, data: any) => {
      if (err) {
        return res.status(404).json({
          status: "Fail",
          message: err.message,
        });
      } else {
        res.status(201).json({
          status: "Success",
          message: "Created user",
          User: data,
        });
      }
    });
  } catch (err: any) {
    const ErrorMessage = err.message;
    res.status(404).json({
      status: "Fail",
      message: "Something is problem",
      ErrorMessage: ErrorMessage,
    });
  }
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    await User.find({}, (err: any, data: any) => {
      if (err) {
        return res.status(404).json({
          status: "Fail",
          message: err.message,
        });
      } else {
        res.status(200).json({
          status: "success",
          result: data.length,
          data: {
            Users: data,
          },
        });
      }
    });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem",
      ErrorMessage: error.message,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params._id;
    await User.findByIdAndUpdate({ _id }, req.body, (err: any, data: any) => {
      if (err) {
        return res.status(404).json({
          status: "Fail",
          message: "Data not find of this id",
        });
      } else {
        res.status(201).json({
          status: "Success",
          message: "update successfully...",
          User: data,
        });
      }
    });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem!..",
      Error: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params._id;
    await User.findOneAndDelete({ _id }, {}, (err: any, doc: any) => {
      if (err) {
        return res.status(404).json({
          status: "success",
          message: err.message,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Delete successfully...",
        data: doc,
      });
    });
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem!..",
      Error: error.message,
    });
  }
};
