import firebase  from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAe_IMjZPy3BYgqimCABzkN0JSROpdRQDs",
    authDomain: "login-f379a.firebaseapp.com",
    projectId: "login-f379a",
    storageBucket: "login-f379a.appspot.com",
    messagingSenderId: "950800387545",
    appId: "1:950800387545:web:eacc7d171d77dfca60ddc8"
  };
  
 const fire =  firebase.initializeApp(firebaseConfig);

 export default fire ; 