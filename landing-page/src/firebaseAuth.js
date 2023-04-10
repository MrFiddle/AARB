import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firestoreConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
