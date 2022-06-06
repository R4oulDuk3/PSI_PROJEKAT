// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
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
const storage = getStorage(app);

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

async function uploadImage(file){
  let id = makeid(30);
  let img_ref= ref(storage, id)
  //let blob = await fetch(url).then(r => r.blob());
  await uploadBytes(img_ref, file)
  console.log('Uploaded a blob or file!');
  return id;
}

async function downloadImage(path){
  let url = await getDownloadURL(ref(storage, path))
  return url
}


// $(document).ready( async ()=>{
  
// //  var ret = await $.get( 'https://jsonplaceholder.typicode.com/posts')
// // console.log(ret)
// //  console.log("check2")
// const img = document.getElementById('myimg');
// //console.log(await downloadImage("beer.jpg"))
// img.setAttribute('src',await downloadImage("background.jpg"));
  
// })

export { uploadImage,downloadImage};

