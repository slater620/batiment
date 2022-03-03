import { API_URL } from "../authentification/Signup"
import { useState } from "react"
import "./form.css"
function UpdateTache({setSpaceName,spaceTacheName,itemToUpdate,setItemToUpdate,dataList,setDataList}){
 
    const [projetList,setProjetList]= useState([])
    //fonction pour recuperer la liste des projets
    function getProjets(){
 
        //construction de la requete
       var requestUrl = API_URL +"/Projets"
       //création de la requête
       var request = new XMLHttpRequest();
       request.open('GET', requestUrl);
       var token = localStorage.getItem("token")
       request.setRequestHeader('Authorization' , 'Bearer ' + token);
       request.setRequestHeader('Content-Type' , 'application/json');
       request.responseType = 'json';
       request.send(); 
       request.onload = function(){
           setProjetList(request.response);
       }           
    }
    
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
        error = true
    }

    if(nom === ""){
        error = true
    }
       
    if(dateDebut === ""){
        error = true
    }
    if(dateFin === ""){
        error = true
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
       const index = dataList.findIndex(tache => tache['id'] === itemToUpdate['id'])
       setSpaceName('listTache')
    }
    event.preventDefault();
}
    return (
        <div className="container">
            <h2 style={{textAlign:"center",marginTop:"1%"}}>Modifier la Tache {itemToUpdate['nom']}</h2>
           <form>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="nameupdate" name="name" placeholder="name of project"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="description">description</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="descriptionupdate" className="form-control" name="description" placeholder="description of project"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label for="start-date">start date</label>
                    </div>
                    <div class="col-75">
                        <input type="date" className="form-control" id="startdateupdate" name="start-date"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label for="end-date">end date</label>
                    </div>
                    <div class="col-75">
                        <input type="date" className="form-control" id="enddateupdate" name="end-date"/>
                    </div>
                </div>
                {
                    getProjets()
                }
                <div className="row form-group"> 
                    <div className="col-25">
                        <label for="projet">projet</label>
                    </div>
                    <div class="col-75">
                        <select id="projetupdate" className="form-control select-input">
                                        {
                                            projetList.map((projet) => <option value={projet['id']} key={projet['id']}>{projet['nom']}</option>)
                                        }
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => updateTache(event)} >Save</button>
            </form>
      </div>
    )
}
export default UpdateTache;