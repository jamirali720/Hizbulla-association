// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxL70jeEsQKF4PSBZRxrONCc7nxk4KWXg",
  authDomain: "bangladesh-jomyate-hizbullah.firebaseapp.com",
  projectId: "bangladesh-jomyate-hizbullah",
  storageBucket: "bangladesh-jomyate-hizbullah.firebasestorage.app",
  messagingSenderId: "268924791074",
  appId: "1:268924791074:web:773fd2953a3e59e7b05d7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;