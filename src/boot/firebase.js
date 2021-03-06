import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUsersStore } from "../store";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { Loading } from "quasar";

const firebaseConfig = {
  apiKey: "AIzaSyAiLISjwX0tMFO9vkh2MNoLGcOIn-WrRok",
  authDomain: "t-racker.firebaseapp.com",
  projectId: "t-racker",
  storageBucket: "t-racker.appspot.com",
  messagingSenderId: "552815749100",
  appId: "1:552815749100:web:c3ddd930c4b4b2e02cc2c9",
  measurementId: "G-HV9YJNYD6R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);

onAuthStateChanged(firebaseAuth, (user) => {
  const userStore = useUsersStore();

  if (user) {
    Loading.show();
    userStore.currentUser = user;
    localStorage.setItem("uid", user.uid);
    Loading.hide();
  } else {
    localStorage.removeItem("uid");
    userStore.$reset();
  }
});
