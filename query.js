// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
// import { apiKey } from './creds.js';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: "aarb-testing.firebaseapp.com",
//   projectId: "aarb-testing",
//   storageBucket: "aarb-testing.appspot.com",
//   messagingSenderId: "78881099467",
//   appId: "1:78881099467:web:5b0d9bed430a9b0519554e",
//   measurementId: "G-JG1VN5RNSQ"
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const db = getFirestore(app);

// // Get data

// var sections = [];

// async function queryData() {
//     const querySnapshot = await getDocs(collection(db, "mainPage"));

//     querySnapshot.forEach((doc) => {
//         sections.push(doc.data());
//     });

//     return sections;
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
// import { firestore } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
import { firestore }
import { apiKey } from './creds.js';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "aarb-testing.firebaseapp.com",
  projectId: "aarb-testing",
  storageBucket: "aarb-testing.appspot.com",
  messagingSenderId: "78881099467",
  appId: "1:78881099467:web:5b0d9bed430a9b0519554e",
  measurementId: "G-JG1VN5RNSQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firestore(app);

var sections = [];

async function queryData() {
    const querySnapshot = await db.collection("mainPage").get();

    querySnapshot.docs.forEach((doc) => {
        sections.push(doc.data());
    });
    return sections;
}