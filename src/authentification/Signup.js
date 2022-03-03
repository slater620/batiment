import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./signup.css"

var validator = require("email-validator");
var passwordValidator = require('password-validator');
export const API_URL="https://btp-api-gi.herokuapp.com"
function Signup(){

    //etat pour contrôler l'affichage du message d'alerte pour le bon remplissage du formulaire
    const [displayAlert, setDisplayAlert] = useState(false)

    //etat contenant le message d'alerte à afficher pour le remplissage des formulaires
    const [alertMsg, setAlertMsg] = useState('')

    //variable utiles pour le routage
    let history = useHistory();   
    
    //function to check the validity of the form before the storage of data
    function formValidation(){
      var form;

      //retrieve data from the formular
      const firstname = document.getElementById("firstname").value
      const lastname = document.getElementById("lastname").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      //schema for password validation
      var schema = new passwordValidator();
      schema
      .is().min(5, "Le mote de passe doit contenir au moins 5 caractères")                                    // Minimum length                                  // Maximum length 100
      .has().uppercase(1,"Le mot de passe doit contenir une majuscule")                              // Must have uppercase letters
      .has().lowercase(1,"Le mot de passe doit contenir une minuscule")                              // Must have lowercase letters
      .has().digits(1, "Le mot de passe doit contenir au moins un chiffre")                                // Must have at least 2 digits

      if(lastname === ""){
          setDisplayAlert(true)
          setAlertMsg("Veuillez renseigner votre prenom!")
          return false
      }

      if(firstname === ""){
          setDisplayAlert(true) 
          setAlertMsg("Veuillez renseigner votre nom!")
          return false
      }

      if(email === "" || !validator.validate(email)){
          setDisplayAlert(true)
          setAlertMsg("Veuillez Entrer une adresse mail valide!")
          return false
      }

      if(password === ""){
          setDisplayAlert(true)
          setAlertMsg("Veuillez renseigner le champ mot de passe!")
          return false

      }else{
          var password_validation = schema.validate(password, { details: true })

          if(password_validation.length){
              setDisplayAlert(true)
              setAlertMsg("mot de passe pas reglementaire")
              return false
          }
      }
      form ={firstname,lastname,email,password}

      return form
  }

// fonctions de creation de compte
 function CreateUser(event){
  //construction de la requete
 var user = formValidation()
 if (user) {
  var requestUrl = API_URL +"/users"
  var request = new XMLHttpRequest();
  request.open('POST', requestUrl);
  request.setRequestHeader('Content-Type' , 'application/json');
  request.responseType = 'json';
  user = JSON.stringify(user);
  request.send(user);
  console.log(user)
  console.log('avance')
  request.onload = function(){
      
      const requestStatus = request.status
      
      if(requestStatus === 500){
          var server_error = true
          setDisplayAlert(true);
          setAlertMsg("Il existe déjà un compte pour cette adresse mail.");
 
      }
      else if (requestStatus===403) {
        setDisplayAlert(true);
        setAlertMsg("Il existe déjà un compte pour cette adresse mail.");
        
      }
      else if(requestStatus === 201){
        console.log('gooddd')
        history.push("");
          //requête réussie
         
      }
  }
   event.preventDefault()
 }
}

    return(
    <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  id="firstname"
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  id="lastname"
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  id="password"/>
              </div>
              <button type="submit" className="btn btn-primary btn-block"
              onClick={(event) => CreateUser(event)}>Sign Up</button>
              <p className="forgot-password text-right">
                Already registered <Link to="/"><a href="">sign in?</a></Link> 
              </p>
            </div>
          </div>
        </div>
    </div>
        
    
    );
}
export default Signup;