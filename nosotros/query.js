import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, getDocs, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { apiKey } from '../creds.js';

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

const sections = [];

async function queryData() {
    const querySnapshot = await getDocs(collection(db, "aboutUs"));

    querySnapshot.docs.forEach((doc) => {
        sections.push(doc.data());
    });
    return sections;
}

const comite__slider = document.querySelector('.comite__slider');
const nosotros__content = document.querySelector('#nosotros__content');

queryData().then((sections) => {
    // console.log(sections);
    var comite = sections[0]['comite'];
    nosotros__content.innerHTML = sections[0]['content'];

    Object.values(comite).forEach((value, index) => {

        if (index == 0) {
            comite__slider.innerHTML = `<article class="comite-slider__member"><img src="${value[2]}" alt=""><h2>${value[0]}</h2><p>${value[1]}</p></article>`
        } else {
            comite__slider.innerHTML += `<article class="comite-slider__member"><img src="${value[2]}" alt=""><h2>${value[0]}</h2><p>${value[1]}</p></article>`;
        }
    });
});
