import { API_URL } from "../authentification/Signup"
import { useState } from "react"
import "./form.css"
function UpdateTache({setSpaceName,spaceTacheName,itemToUpdate,setItemToUpdate,tacheList,setTacheList,projetList,setProjetList}){
 
    
//fonction de modification d'une tache
 function updateTache(event){

    //construction de la requete
   var requestUrl = API_URL +"/Taches/" + itemToUpdate['id'] + "/";

   //variable qui signale la présence d'une erreur dans le formulaire
   var error = false

   //variable indiquant si l'utilisa teur est connecté à internet
   var  connected = window.navigator.onLine
    console.log('bonjour')
    //récupération des valeurs du formulaire
    const nom = document.querySelector('#nameupdate').value
    const dateDebut = document.querySelector('#startdateupdate').value
    const dateFin = document.querySelector('#enddateupdate').value
    const description = document.querySelector('#descriptionupdate').value 
    const  projet = document.querySelector('#projetupdate').value 
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
    var token = localStorage("token")
   var request = new XMLHttpRequest();
   request.open('PATCH', requestUrl);
   request.setRequestHeader('Authorization' , 'Bearer ' + token);
   request.setRequestHeader('Content-Type' , 'application/json');
   request.responseType = 'json';
   request.send(tache);
   console.log(tache)
   console.log('avance')
   request.onload = function(){ 
       
       const requestStatus = request.status

       console.log(request.response)
       //requête réussie
       console.log('gooddd')
       console.log(request.response)
       //on remplace l'élément dans la liste des taches
       const index = tacheList.findIndex(tache => tache['id'] === itemToUpdate['id'])
       alert('la tache a bien été modifiée')
    }
    event.preventDefault();
}
    return (
        <div className="container">
           
           
            <form className="row g-3">
                <h2 style={{textAlign:"center",marginTop:"1%"}}>Modifier la Tache {itemToUpdate['nom']}</h2>
                <div className="col-md-4">
                    <label for="nameupdate">Nom</label>
                    <input type="text" defaultValue={itemToUpdate['nom']} className="form-control" id="nameupdate" name="name" placeholder="nom de la tache" required/>                    
                </div>
                <div className="col-md-4">
                    <label for="descriptionupdate">description</label>
                    <input type="text" id="descriptionupdate" defaultValue={itemToUpdate['description']} className="form-control" name="description" placeholder="description de la tache" required/>          
                </div>
                <div className="col-md-6">
                    <label for="startdateupdate"> date de debut</label>
                    <input type="date" className="form-control" defaultValue={ itemToUpdate['dateDebut'] } id="startdateupdate" name="start-date" required/>
                </div>
                <div className="col-md-6">
                    <label for="enddateupdate">date de fin</label>
                    <input type="date" className="form-control" id="enddateupdate" defaultValue={ itemToUpdate['dateFin'] } name="end-date" required/>
                </div>
                <div className="col-md-6">
                        <label for="projetupdate">projet</label>
                        <select  id="projetupdate" className="form-control select-input">
                                    {
                                        projetList.map((projet) => <option value={projet['id']} key={projet['id']}>{projet['nom']}</option>)
                                    }
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => updateTache(event)}>Save</button>
                </div>
            </form> 
      </div>
    )
}
export default UpdateTache;