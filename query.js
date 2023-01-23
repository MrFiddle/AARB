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

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
// // import { firestore } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, getDocs, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
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

const db = getFirestore(app);

var sections = [];

async function queryData() {
    const querySnapshot = await getDocs(collection(db, "mainPage"));

    querySnapshot.docs.forEach((doc) => {
        sections.push(doc.data());
    });
    return sections;
}

// body

const body = document.querySelector('body');

// header queries
const hero__slogan = document.querySelector('#hero__slogan');
const header = document.querySelector('header');

// news queries
const fNew__title = document.querySelector('#fNew__title');
const fNew__date = document.querySelector('#fNew__date');

// about queries

const nosotros__content = document.querySelector('#nosotros__content');
const nosotros__img = document.querySelector('#nosotros__img');

// services queries

const servicios__content = document.querySelector('#servicios__content');
const servicios__img = document.querySelector('#servicios__img');

// contacto queries

const contactoaddress__calle = document.querySelector('#contacto-address__calle');
const contacto__horario = document.querySelector('#contacto__horario');

const contacto__maps = document.querySelector('#contacto__maps');
const contacto__facebook = document.querySelector('#contacto__facebook');
const contacto__telefono = document.querySelector('#contacto__telefono');
const contacto__correo = document.querySelector('#contacto__correo');
const contacto_wha = document.querySelector('#contacto__wha');

// footer queries

const footer__content = document.querySelector('#footer__content');
const footerContact__phone = document.querySelector('#footer-contact__phone');
const footerContact__mail = document.querySelector('#footer-contact__mail');
const footer__year = document.querySelector('#footer__year');

queryData().then((sections) => {
  console.log(sections);
  // hero
  hero__slogan.innerHTML = sections[2]['org_slogan'];
  // nosotros
  nosotros__content.innerHTML = sections[0]['content'];
  body.style.display = 'block';
  // servicios

  // contacto

  // footer
});