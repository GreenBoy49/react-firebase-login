import React,{useState,useEffect} from "react";
import fire from './fire'
// import logo from './logo.svg';
import Login from './Login'
import Home from './Home';
import './App.css';

export default function App() {
  const db=fire.firestore();
// c'est le login 
  const [user,setUser]=useState('');
  const [nom,setNom]=useState('');
  const [prenom,setPrenom]=useState('');
  const [telephone,setTelephone]=useState('');
  const [adresse,setAdresse]=useState(''); 
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState(''); 
  const [emailError,setEmailError]=useState('');
  const [passwordError,setpasswordError]=useState('');
  const[hasAccount,setHasAccount]=useState(false);    

let variable=setHasAccount; 
console.log(setHasAccount) ;

     const clearInputs = () => {
       setEmail(''); 
       setPassword(''); 
       setAdresse('');
       setNom('');
       setPrenom('');
       setTelephone('');
     }

     const clearErrors = () => {
      setEmailError(''); 
      setpasswordError(''); 
     }

     const handleLogin = () => {
      clearErrors(); 
    // if(setHasAccount==true){
    //   alert('compte est connecté'); 
    //   alert('compte est connecté'); 
    // }
      fire 
      .auth() 
      .signInWithEmailAndPassword(email.toLowerCase(),password)

      .catch((err)=>{
       switch(err.code){
         case "auth/invalid-email":
         case "auth/user-disabled": 
         case "auth/user-not-found": 
            setEmailError(err.message); 
            break ; 
          case "auth/wrong.password": 
          setpasswordError(err.message);
          break ; 

       }
      });
      //  alert('compte est connecté'); 
    }; 
    // fin de login 

    // inscrire ==> creer un compte 
// trasnmettre tous les informations ===> collection ==> users 
const handleSignup = async() => {
  clearErrors();
  const docRef = db.collection('users').doc(email.toString().toLowerCase())
    await docRef.set({
      email : email.toLowerCase(),
      nom:nom,
      prenom:prenom,
      telephone:telephone,
      adresse:adresse
    })
    // message d'alerte on le fait avant fire
    alert("compte est créé")
  fire
  .auth() 
  .createUserWithEmailAndPassword(email,password)
 .catch( (err)=>{
  switch(err.code){
    case "auth/email.already-in-use":
    case "auth/Invalid-email": 
       setEmailError(err.message); 
       break ; 
     case "auth/weak.password": 
     setpasswordError(err.message);
     break ; 

  }
 });};
// LogOut ==> pour sortir

const handleLogout = () => {
  fire.auth().signOut(); 
  alert('compte est deconnecté')
};

const authListenern = () => {
  fire.auth().onAuthStateChanged(user =>{
    if(user) {
      clearInputs(); 
    setUser(user); 
    } else{
      setUser(""); 
    }
  });
};
useEffect(()=>{
  authListenern();
},[]);
  return (
    
    <div>
      
      
      {user ? (
        <Home handleLogout={handleLogout}></Home>
      ):(
        <Login
       email= {email}
       setEmail={setEmail}
       password={password}
       setPassword={setPassword}
       handleLogin={handleLogin}
       handleSignup={handleSignup}
       hasAccount={hasAccount}
       setHasAccount={setHasAccount}
       emailError={emailError}
       passwordError={passwordError}
       nom= {nom}
       setNom={setNom}
       prenom={prenom}
       setPrenom={setPrenom}
       telephone={telephone}
       setTelephone={setTelephone}
       adresse={adresse}
       setAdresse={setAdresse}

       /> 
      )}
       
    </div>
  )
}

