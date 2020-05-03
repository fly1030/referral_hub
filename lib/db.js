import firebase from 'firebase'
import 'firebase/firestore'

export function loadDB() {
    const firebaseConfig = {
        apiKey: "AIzaSyAv7o9D1clP_BL6v46l2Jutv07cfCIMIgI",
        authDomain: "referral-hub-7513f.firebaseapp.com",
        databaseURL: "https://referral-hub-7513f.firebaseio.com",
        projectId: "referral-hub-7513f",
        storageBucket: "referral-hub-7513f.appspot.com",
        messagingSenderId: "766657238679",
        appId: "1:766657238679:web:ff2fe5c6d38581ac9d3bd2",
        measurementId: "G-5CS8LVEGC3"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    return firebase;
    }
