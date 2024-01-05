"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWaqXUH8Z_qZR6qKa-YJgVUMi-yLr63zE",
  authDomain: "next-file-server.firebaseapp.com",
  projectId: "next-file-server",
  storageBucket: "next-file-server.appspot.com",
  messagingSenderId: "914544896464",
  appId: "1:914544896464:web:9f175eb3437895bd80f1d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
