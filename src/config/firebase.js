import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbDitxOEDlIcOfALa56HNanc0RZoLQgmY",
  authDomain: "languagepoll.firebaseapp.com",
  projectId: "languagepoll",
  storageBucket: "languagepoll.appspot.com",
  messagingSenderId: "244394278219",
  appId: "1:244394278219:web:8deed3433f9a69a1ff3cce",
  measurementId: "G-7XYKCB0QQJ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// export default analytics;
export default db;
