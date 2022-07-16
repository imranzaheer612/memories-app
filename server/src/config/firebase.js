const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.MEMORIES_FIREBASE_API_KEY,
    authDomain: process.env.MEMORIES_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.MEMORIES_FIREBASE_PROJECT_ID,
    storageBucket: process.env.MEMORIES_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.MEMORIES_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.MEMORIES_FIREBASE_APP_ID,
    measurementId: process.env.MEMORIES_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

module.exports = storage;
