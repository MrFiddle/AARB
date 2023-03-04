// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import './firestore'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6odc2rl8o4jTllq9ymRBvMlxZAgO44QQ",
  authDomain: "aarb-testing.firebaseapp.com",
  projectId: "aarb-testing",
  storageBucket: "aarb-testing.appspot.com",
  messagingSenderId: "78881099467",
  appId: "1:78881099467:web:5b0d9bed430a9b0519554e",
  measurementId: "G-JG1VN5RNSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;