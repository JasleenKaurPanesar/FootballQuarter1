import firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg_nMaHTjZmNdnXEwfhcbbx-wqaLfkHPQ",
  authDomain: "players-59978.firebaseapp.com",
  projectId: "players-59978",
  storageBucket: "players-59978.appspot.com",
  messagingSenderId: "718788140603",
  appId: "1:718788140603:web:858251cbf943c3d414861e"
};

  // Initialize Firebase
// export Firebase so it can be used elsewhere 
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

