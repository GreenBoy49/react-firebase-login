import React,{useState} from 'react'
import fire from './fire'
import './App.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

// alert('compte est connecte'); 

const db=fire.firestore();

const Home = ({handleLogout}) =>  {
    const [startDate, setStartDate] = useState(new Date());
    const user=fire.auth().currentUser;
    const email=user.email;

 // recuperation 
 let userJSON
 let dateJSON

 // await :  L'opérateur await permet d'attendre la résolution d'une promesse (Promise).
 //  Il ne peut être utilisé qu'au sein d'une fonction asynchrone (définie avec l'instruction async function).

 
// recuperation des informations de client connecté
  async function getdataUsr(){
   const docRef = db.collection('users').doc(email)
   const doc = await docRef.get();
   if (!doc.exists) {
   console.log('No such document!');
   } else {
     userJSON=JSON.stringify(doc.data())
     localStorage.setItem("userJSON", userJSON);
   }
   
 }
  
 getdataUsr()
  let usertext = localStorage.getItem("userJSON");
  let userobj = JSON.parse(usertext);

// cette fonction nous permet de recevoir un message de notification dans notre boite gmail
  function sendEmail(a, b, c) {
    window.Email.send({
      Host: "smtp.gmail.com",
      Username: "GoodDoctor451@gmail.com",
      Password: "GoodDoctor123456",
      To: "hamza.bouchtii@gmail.com",
      From: "GoodDoctor451@gmail.com",
      Subject: "New Appointment",
      Body:
        "Le patient " +b +" " + c +" a prit un rendez vous pour le " +a.split(":")[0] +" a " +a.split(":")[1],
    }).then(message => alert("rendez vous pris"));
    
  }

  let con = [];

//recuperation des dates de rendez-vous
  async function getdataDate() {
    const docRef = db.collection("Appointment");
    const doc = await docRef.get();
    doc.forEach((doc) => {
      con.push(doc.id);
    });
  }

  getdataDate(); 

  async function EnregistrerDate(){
    let dtp=document.getElementById("datee");
    let valuee=dtp.value;
    var o = con.includes(valuee);
    getdataDate();
    // condition : le client n'pas le droit de prendre un rendez vous a une date 
    //qui est deja reservé par un autre patient
    if(o==true){
      alert('Cette Date est déja résérvé'); 
    } else {
      
      sendEmail(valuee, userobj.nom, userobj.prenom);
       const docRef = db.collection('Appointment').doc(valuee)
      await docRef.set({
        date:valuee.split(':')[0],
        time:valuee.split(':')[1],
        user:userobj.email
     })
    } 
  }

    return (
  

        <div id="div">
          <h1>Welcome {userobj.nom} {userobj.prenom} </h1>
          <hr></hr>
          <br></br>
          <h2>Your information</h2>
          <br></br>
          <p id="p">
            <h3> Adress : { userobj.adresse } </h3>

            <h3> Phone number : { userobj.telephone} </h3>

            <h3> Email : {userobj.email} </h3> 
          
            </p>
            <br></br><br></br>

            <h2>Reservation</h2>

            <DatePicker
      selected={startDate}
      showTimeSelect
      dateFormat="d-M-yyyy:h"
      timeFormat="HH"
      timeIntervals={60}
      id="datee"
      onChange={(date) => setStartDate(date)}
    />

<br></br><br></br>

<button onClick={EnregistrerDate.bind()}>
             Valider
            </button>

            <br></br><br></br><br></br><br></br><br></br><br></br>

          <button textalign="left" onClick={handleLogout}>Log out</button> 
            
            
        </div>
    )
}

export default Home
