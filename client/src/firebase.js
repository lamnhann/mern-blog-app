// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-20c55.firebaseapp.com",
  projectId: "mern-blog-20c55",
  storageBucket: "mern-blog-20c55.appspot.com",
  messagingSenderId: "1076601545457",
  appId: "1:1076601545457:web:f294bfc986a834cd837f50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);