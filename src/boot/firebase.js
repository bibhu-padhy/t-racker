import { boot } from "quasar/wrappers";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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

export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
