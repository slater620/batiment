import "./form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function CreateTache({setSpaceName, spaceName,projetList,setProjetList}){
    //variable contenant les tokens
    var token = localStorage.getItem("token")

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false

    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false

    //variable indiquant si l'utilisa teur est connecté à internet
    var  connected = window.navigator.onLine

   

    //fonctions de creation d'une tache
    const createTaches = (event) => {
    //récupération des valeurs du formulaire
    const nom = document.querySelector('#name').value
    const dateDebut = document.querySelector('#start-date').value
    const dateFin = document.querySelector('#end-date').value
    const description = document.querySelector('#description').value 
    const  projet = document.querySelector('#projet').value 
    if(!connected){
        error = true
    }

    if(description === ""){
        alert('entrer la description')
    }

    if(nom === ""){
        alert('entrer le nom')
    }
       
    if(dateDebut === ""){
        alert('entrer la date de debut')
    }
    if(dateFin === ""){
        error = true
        alert('entrer la date de fin')
    }
    
    var tache = {nom ,projet, dateDebut , dateFin , description}
    tache = JSON.stringify((tache))

    //création de la requête
    var requestURL = API_URL + "/Taches/";
    var request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.setRequestHeader('Authorization' , 'Bearer ' + token);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.responseType = 'json';
    request.send(tache);
    console.log(tache)
    console.log(request.status)
    console.log('avance')
    request.onload = function(){
        const requestStatus = request.status
        
        if(requestStatus === 403){
            server_error = true
          

        }else if(requestStatus === 201){
            alert("la tache a été crée avec success ")
        }
    }
    event.preventDefault()

}



       return (
        <div className="container">
            <form className="row g-3">
                <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UNE TACHE</h2>
                <div className="col-md-4">
                    <label for="name">Nom</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="nom de la tache" required/>                    
                </div>
                <div className="col-md-4">
                    <label for="description">description</label>
                    <input type="text" id="description" className="form-control" name="description" placeholder="description de la tache" required/>          
                </div>
                <div className="col-md-6">
                    <label for="start-date">start date</label>
                    <input type="date" className="form-control" id="start-date" name="start-date" required/>
                </div>
                <div className="col-md-6">
                    <label for="end-date">end date</label>
                    <input type="date" className="form-control" id="end-date" name="end-date" required/>
                </div>
                <div className="col-md-6">
                        <label for="projet">projet</label>
                        <select id="projet" className="form-control select-input">
                                    {
                                        projetList.map((projet) => <option value={projet['id']} key={projet['id']}>{projet['nom']}</option>)
                                    }
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => createTaches(event)}>Save</button>
                </div>
            </form>   
      </div>
       )
}

export default CreateTache;