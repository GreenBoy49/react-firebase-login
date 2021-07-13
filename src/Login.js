import React from 'react'; 
import Home from './Home';
import './App.css';

const Login = (props) => {
   
const {
email,
setEmail,
password,
setPassword,
handleLogin,
handleSignup,
hasAccount,
setHasAccount,
emailError,
passwordError,
nom,
setNom,
prenom,
setPrenom,
adresse,
setAdresse,
Telephone,
setTelephone

} = props ; 




return (

    <section className="login">
        <div className="loginContainer"> 
        <h2>Welcome to the Good Doctor</h2>
        <label>Email </label>
        <input type="email" autofocus required value={email} 
        onChange={(e)=>setEmail(e.target.value)}
       />
      <p className="errorMsg">{emailError}</p>
      <label>Password</label>
      <input type="password" autofocus required value={password} 
        onChange={(e)=>setPassword(e.target.value)}></input>
        <p >{passwordError}</p>
        
        <div className="btnContainer">
          {hasAccount ? (
            <>
            <button id="button" onClick={handleLogin}>Sign in</button>
            <p>Don't have account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p>
            </>
          ):(
            <>
            <label>Last name :</label>
        <input type="text" autofocus required value={nom} 
        onChange={(e)=>setNom(e.target.value)}
       />
       <label>First name : </label>
        <input type="text" autofocus required value={prenom} 
        onChange={(e)=>setPrenom(e.target.value)}
       />
       <label>Phone number : </label>
        <input type="tel" autofocus required value={Telephone} 
        onChange={(e)=>setTelephone(e.target.value)}
       />
       <label>Adress : </label>
        <input type="text" autofocus required value={adresse} 
        onChange={(e)=>setAdresse(e.target.value)}
       />
       <br></br><br></br><br></br>
            <button  id="button"
            onClick={handleSignup}
            
               >Sign Up   </button>
      
            <p>Don't have account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p>

          
            </>
          )}é
        </div>
        </div>
        </section>

)
    
}


export default Login ; 