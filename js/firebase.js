import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBPAy9KdIk8e34yruaL32wyj_MJANHlN2g",
  authDomain: "bomgesto-15634.firebaseapp.com",
  projectId: "bomgesto-15634",
  storageBucket: "bomgesto-15634.appspot.com", 
  messagingSenderId: "672802069001",
  appId: "1:672802069001:web:356d0b5ab9ae09d29236d8",
  databaseURL: "https://bomgesto-15634-default-rtdb.firebaseio.com", 
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); 

export { database };