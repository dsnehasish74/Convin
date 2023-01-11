import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAODtY1NMSHzySLLKRjpN7T421SV0I7GRY",
  authDomain: "pullapp-eeb7f.firebaseapp.com",
  databaseURL: "https://pullapp-eeb7f.firebaseio.com",
  projectId: "pullapp-eeb7f",
  storageBucket: "pullapp-eeb7f.appspot.com",
  messagingSenderId: "685891233767",
  appId: "1:685891233767:web:ba3524666adc208c5fbf42",
  measurementId: "G-HSL67MSMXZ",
};

var app = firebase.initializeApp(firebaseConfig);
var db = app.firestore();
var auth = app.auth();
var storage = app.storage();
var provider = new firebase.auth.GoogleAuthProvider();
export { db, storage, auth, firebase, provider };
