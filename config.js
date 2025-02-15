
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB32f7VsCTH51D4tLdqBUSvUtDT4Q3gNpQ",
  authDomain: "blog-app-38ded.firebaseapp.com",
  projectId: "blog-app-38ded",
  storageBucket: "blog-app-38ded.firebasestorage.app",
  messagingSenderId: "1033542601821",
  appId: "1:1033542601821:web:04f2fd4bf76d80267ed1b4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  createUserWithEmailAndPassword,
  database,
  ref,
  set,
  onAuthStateChanged,
  push,
  onChildAdded,
};
