// Import the functions you need from the SDKs you need
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
const beerRef = ref(storage, 'beer.jpg');

var currentUser=null

onAuthStateChanged(auth, user=>{
    if(user!=null){
        console.log("logged in")
        currentUser=user
        console.log(user)
    }else{
        console.log('No user')
        currentUser=null
    }
}
)


function googleLogin(){
    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
function logout(){
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}
function createUserEmailPass(email,password){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
async function uploadImage(file,type){
  const metadata = {
    contentType: type,
  };
  let img_ref= ref(storage, 'zurka.jpg')
  //let blob = await fetch(url).then(r => r.blob());
  uploadBytes(img_ref, file,metadata).then((snapshot) => {
  console.log('Uploaded a blob or file!');

  });
  
}

async function downloadImage(path){
  let url = await getDownloadURL(ref(storage, path))
  return url
}


$(document).ready( async ()=>{
  
//  var ret = await $.get( 'https://jsonplaceholder.typicode.com/posts')
// console.log(ret)
//  console.log("check2")
const img = document.getElementById('myimg');
//console.log(await downloadImage("beer.jpg"))
img.setAttribute('src',await downloadImage("background.jpg"));
  
})

export { uploadImage,downloadImage};

