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
export const firebaseAuth = getAuth();
export const db = getFirestore(app);

export const getUID = () =>
  firebaseAuth.currentUser?.uid || localStorage.getItem("uid");

onAuthStateChanged(firebaseAuth, (user) => {
  const userStore = useUsersStore();

  if (user) {
    Loading.show();
    userStore.currentUser = user;
    Loading.hide();
  } else {
    userStore.$reset();
  }
});
