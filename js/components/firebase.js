// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyC4h7Q-j6PsndavFn2oHkm1FjgQKwLswuI",
authDomain: "vehiclecounter-051709.firebaseapp.com",
projectId: "vehiclecounter-051709",
storageBucket: "vehiclecounter-051709.firebasestorage.app",
messagingSenderId: "956200032909",
appId: "1:956200032909:web:92a8ce33abf5dca2a3a0c4",
measurementId: "G-KNE7X1N6JV"
};
export { firebaseConfig };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);