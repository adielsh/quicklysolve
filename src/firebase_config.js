import firebase from "firebase";
import store from "./store";
const config = 
  {
    apiKey: "AIzaSyCWR4AZNjz1mhTl07nZtma3uLjy0UWEeMY",
    authDomain: "quicksolveapp.firebaseapp.com",
    projectId: "quicksolveapp",
    storageBucket: "quicksolveapp.appspot.com",
    messagingSenderId: "561066623048",
    appId: "1:561066623048:web:30d60a96a9ca4fc338187d",
    measurementId: "G-JBW83P7VH5"
  };
try {
  firebase.initializeApp(config);
  //When ever the user authentication state changes write the user to vuex.
  firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        store.commit('SET_LOGGEDIN', user);
    }else{
        store.commit('SET_LOGGEDIN', null);
    }
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const settings = {};
export let db = firebase.firestore();
export let auth = firebase.auth;
export let fieldPath = firebase.firestore.FieldPath;
db.settings(settings);
const o = {  auth, db, fieldPath };
window.Firebase  = o;
export default  o ;
