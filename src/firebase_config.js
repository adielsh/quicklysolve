import firebase from "firebase";
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
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const settings = {};
export let authInstance = firebase.auth;
export let db = firebase.firestore();
export let auth = firebase.auth();
export let fieldPath = firebase.firestore.FieldPath;
db.settings(settings);

export default { authInstance, auth, db, fieldPath };
