import { Link,useHistory } from 'react-router-dom';
import "./login.css"
import { useState } from "react";
import {API_URL} from "./Signup"


var validator = require("email-validator");
var passwordValidator = require('password-validator');
function Login(){

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

    const email = document.getElementById("emaillogin").value
    const password = document.getElementById("passwordlogin").value

    //schema for password validation
    var schema = new passwordValidator();
    schema
    .is().min(5, "Le mote de passe doit contenir au moins 5 caractères")                                    // Minimum length                                  // Maximum length 100
    .has().uppercase(1,"Le mot de passe doit contenir une majuscule")                              // Must have uppercase letters
    .has().lowercase(1,"Le mot de passe doit contenir une minuscule")                              // Must have lowercase letters
    .has().digits(1, "Le mot de passe doit contenir au moins un chiffre")                                // Must have at least 2 digits


    if(email === "" || !validator.validate(email)){
        setDisplayAlert(true)
        setAlertMsg("Veuillez Entrer une adresse mail valide!")
        alert(alertMsg)
        return false
    }

    if(password === ""){
        setDisplayAlert(true)
        setAlertMsg("Veuillez renseigner le champ mot de passe!")
        alert(alertMsg)
        return false

    }else{
        var password_validation = schema.validate(password, { details: true })

        if(password_validation.length){
            setDisplayAlert(true)
            setAlertMsg("mot de passe pas reglementaire")
            alert(alertMsg)
            return false
        }
    }
    form ={email,password}

    return form
}

//function to login

  function LoginUser(event){


   //recuperation des parametres valides
   var user = formValidation()
   
   if (user) {
     //construction de la requete
   var requestUrl = API_URL +"/auth"
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
        
        if(requestStatus === 403){
            var server_error = true
            alert("une erreur est survenu , veuillez reessayer");
          
        }
        else if(requestStatus === 201){
            //requête réussie
            console.log('gooddd')
            localStorage.setItem("token",request.response['accessToken'])
            localStorage.setItem("user",request.response['id'])
            console.log(localStorage.getItem("token"))
            history.push("/dashboard");
            alert('connection réussie')
           
         }
        
        
    }
    
   }
  event.preventDefault()
  
}

    return (
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">

              <form >
                <h3>Sign In</h3>
                <div  className="form-group">
                  
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emaillogin"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="on"
                    id="passwordlogin"
                    placeholder="Enter password"/>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={(event) => LoginUser(event)}>
                  Submit
                </button>
                
                <p className="forgot-password text-right">
                  Don't have account <Link to ="/signup"><a href="#">sign Up?</a></Link> 
                </p>
              </form>
            </div>
          </div>
          
        </div>
        
      );
}
export default Login;