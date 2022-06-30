// Import the functions you need from the SDKs you need
const { initializeApp } = require ("firebase/app");
// const { getAnalytics } = require ("firebase/analytics");
const { getStorage } = require ("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYgWDwq7o2v6ICV12daMEyl3mQ3ayV4QU",
  authDomain: "memoriesstore.firebaseapp.com",
  projectId: "memoriesstore",
  storageBucket: "memoriesstore.appspot.com",
  messagingSenderId: "261230909043",
  appId: "1:261230909043:web:97634d55878fc217667c06",
  measurementId: "G-SQ3EFBHFVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

module.exports = storage;