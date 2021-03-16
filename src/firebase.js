import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBrrzLUP5f6Yux9NtRlANHknhH1cCiAN9E",
    authDomain: "story-share-4e313.firebaseapp.com",
    projectId: "story-share-4e313",
    storageBucket: "story-share-4e313.appspot.com",
    messagingSenderId: "717143657494",
    appId: "1:717143657494:web:ca210776955d08c8303937",
    measurementId: "G-JX7D8EYF8S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth()

const storiesCollection = db.collection('stories');
const usersCollection = db.collection('users');

export {
    db, 
    auth,
    storiesCollection,
    usersCollection
}
