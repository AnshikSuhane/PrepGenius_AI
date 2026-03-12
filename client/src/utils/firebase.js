import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "auth-aa064.firebaseapp.com", // ✅ MUST match projectId
  projectId: "auth-aa064",
  storageBucket: "auth-aa064.appspot.com", // ✅ also fix this
  messagingSenderId: "757160614367",
  appId: "1:757160614367:web:47a81ebe5c033391788c6a",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
