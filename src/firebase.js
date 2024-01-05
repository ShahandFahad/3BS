// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkiNZTr1ywZZj0urFKQElUCFqlKS4oGbs",
  authDomain: "serb-8b4e1.firebaseapp.com",
  projectId: "serb-8b4e1",
  storageBucket: "serb-8b4e1.appspot.com",
  messagingSenderId: "16825710970",
  appId: "1:16825710970:web:32079cd3b2135f4cc53ec3",
  measurementId: "G-EQ9HGXMZR2",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
