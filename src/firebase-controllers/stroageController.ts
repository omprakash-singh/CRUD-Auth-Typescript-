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
    const metadata = {
      contentType: "image/jpeg",
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file.data, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            res.status(401).json({
              status: "Fail",
              message: "User doesn't have permission to access the object",
            });
            break;
          case "storage/canceled":
            // User canceled the upload
            res.status(499).json({
              status: "Fail",
              message: "User canceled the upload",
            });
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            res.status(404).json({
              status: "Fail",
              message: error.serverResponse,
            });
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          res.status(201).json({
            status: "success",
            url: `File available at ${downloadURL}`,
            message: "Image upload successfully....",
          });
        });
      }
    );
  } catch (error: any) {
    res.status(404).json({
      status: "Fail",
      message: "Something is problem..",
      error: error,
    });
  }
};
