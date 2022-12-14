import * as admin from "firebase-admin";
import * as serviceAccountKey from "./serviceAccountKey.json";

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

export { firebaseAdmin };
