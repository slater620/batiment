import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./signup.css"

var validator = require("email-validator");
var passwordValidator = require('password-validator');
export const API_URL="https://btp-api-gi.herokuapp.com"

function Signup(){
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

      if (lastname==="") {
        alert('entrer votre prenom')
        return false
      }
      if (firstname==="") {
        alert('entrer votre nom')
        return false
      }

      if(!validator.validate(email)){
          //alert('adresse mail invalide')
          return false
      }
      else{
          var password_validation = schema.validate(password, { details: true })

          if(password_validation.length){
             alert('mot de passe non reglementaire')
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
  request.onload = function(){
      
      const requestStatus = request.status
      
      if(requestStatus === 500){
          alert("erreur au niveau du serveur.")
 
      }
      else if (requestStatus===403) {
        
        alert("Il existe déjà un compte pour cette adresse mail.")
        
      }
      else if(requestStatus === 201){
        console.log('gooddd')
        alert("connection réussie")
        history.push("");
          //requête réussie
         
      }
  }
   event.preventDefault()
 }
}

    return(
    <div className="App">
        <div className="auth-wrapper ">
          <form className="auth-inner">
            <div>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label >First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  id="firstname" required
                />
                <div className="valid-feedback">
                    Looks good!
                </div>
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  id="lastname" required
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email" required/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  id="password" required/>
              </div>
              <button type="submit" className="btn btn-primary btn-block"
              onClick={(event) => CreateUser(event)}>Sign Up</button>
              <p className="forgot-password text-right">
                Already registered <Link to="/"><a href="">sign in?</a></Link> 
              </p>
            </div>
          </form>
        </div>
    </div>
        
    
    );
}
export default Signup;