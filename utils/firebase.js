import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBEbxzKivDvTuKwL7HYTLUPHj3BDz56krY",
  authDomain: "bdus-82bc7.firebaseapp.com",
  projectId: "bdus-82bc7",
  storageBucket: "bdus-82bc7.appspot.com",
  messagingSenderId: "1048593462024",
  appId: "1:1048593462024:web:8d3f1368a05a5921a7b2bd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
