// Firebase Config

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDV18FO9dqrVOY3RkxNimbehI_PytCzr6w",
  authDomain: "qai-platform-7bd96.firebaseapp.com",
  projectId: "qai-platform-7bd96",
  storageBucket: "qai-platform-7bd96.firebasestorage.app",
  messagingSenderId: "970714117363",
  appId: "1:970714117363:web:a2efd59bf1a5718fa6b386",
  measurementId: "G-D9JKC385FZ"
};

const app = initializeApp(firebaseConfig);

console.log("Firebase Connected Successfully");

export { app };
