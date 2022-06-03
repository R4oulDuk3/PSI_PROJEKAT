
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {getAuth, onAuthStateChanged,signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup,signOut,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import {getStorage,ref, uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdsfPn2kelSwnsff4zUqZryzZhQ8A7ICs",
  authDomain: "film-caffe.firebaseapp.com",
  projectId: "film-caffe",
  storageBucket: "film-caffe.appspot.com",
  messagingSenderId: "1021931948817",
  appId: "1:1021931948817:web:c214b6aed9a96d6e849ab0",
  measurementId: "G-Q3LJ19MRWE"
};

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };


// Initialize Firebase
const app=initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app);

async function downloadImage(path){
    let url = await getDownloadURL(ref(storage, path))
    return url
  }


  export {
    downloadImage
  }