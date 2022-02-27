import "../Projet/form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function CreateTache({setSpaceTacheName, spaceTacheName}){
    //variable contenant les tokens
    var token = localStorage.getItem("token")

    const [projetList, setProjetList] = useState([])

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false

    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false

    //variable indiquant si l'utilisa teur est connecté à internet
    var  connected = window.navigator.onLine

    //fonction pour recuperer la liste des projets
    function getProjets(){
 
        //construction de la requete
       var requestUrl = API_URL +"/Projets"
       //création de la requête
       var request = new XMLHttpRequest();
       request.open('GET', requestUrl);
       token = localStorage.getItem("token")
       request.setRequestHeader('Authorization' , 'Bearer ' + token);
       request.setRequestHeader('Content-Type' , 'application/json');
       request.responseType = 'json';
       request.send(); 
       request.onload = function(){
           setProjetList(request.response);
       }           
    }


    //fonctions de creation d'une tache
    const createTaches = (event) => {
    //récupération des valeurs du formulaire
    const user = localStorage.getItem("user")
    const nom = document.querySelector('#name').value
    const dateDebut = document.querySelector('#start-date').value
    const dateFin = document.querySelector('#end-date').value
    const description = document.querySelector('#description').value 
    const  projet = document.querySelector('#projet').value 
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
    
    var tache = {nom , dateDebut , dateFin , description,user,projet}
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
        console.log(request.response)
        const requestStatus = request.status
        
        if(requestStatus === 500){
            server_error = true
          

        }else if(requestStatus === 201){
            //requête réussie
            console.log('gooddd')
            setSpaceTacheName('list')
        }
    }
    event.preventDefault()

}



       return (
        <div className="container">
            <form >
            <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UNE TACHE</h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="name" name="name" placeholder="name of task"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="description">description</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="description" className="form-control" name="description" placeholder="description of task"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label for="start-date">start date</label>
                    </div>
                    <div class="col-75">
                        <input type="date" className="form-control" id="start-date" name="start-date"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label for="end-date">end date</label>
                    </div>
                    <div class="col-75">
                        <input type="date" className="form-control" id="end-date" name="end-date"/>
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
                        <select id="projet" className="form-control select-input">
                                        {
                                            projetList.map((projet) => <option value={projet['id']} key={projet['id']}>{projet['nom']}</option>)
                                        }
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => createTaches(event)}>Save</button>
            </form>
      </div>
       )
}

export default CreateTache;