import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdxFLNc3-a-Y1dOGymquFYzWdgQZr5fiI",
  authDomain: "college-event-development.firebaseapp.com",
  databaseURL:
    "https://college-event-development-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "college-event-development",
  messagingSenderId: "253716620546",
  appId: "1:253716620546:web:8daa4293a7148d345a4e1b",
  storageBucket: "gs://college-event-development.appspot.com/",
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export { firebase };
