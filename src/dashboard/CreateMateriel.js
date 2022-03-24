import "./form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function CreateMateriel({setSpaceName, spaceName}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false

    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
      
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    //fonctions de creation d'un stock
    function createMateriel(event){
        const type =  "Materiel"
        //récupération des valeurs du formulaire
        
        const nom = document.querySelector('#nommateriel').value
        const denomination =  document.querySelector('#unitemateriel').value
        const quantite = document.querySelector('#quantitemateriel').value
        const prixUnitaire = document.querySelector('#prixmateriel').value
        const dateApprovisionnement = document.querySelector('#dateApprovisionnementmateriel').value     
       

        if(quantite === ""){
            error = true
            alert('entrer la quantite du materiel')
        }

        if(nom === ""){
            error = true
            alert('entrer le nom du materiel')
        }
        
        if(dateApprovisionnement === ""){
            error = true
            alert('entrer la date approvisionnement')
        }
        
        if(prixUnitaire === ""){
            error = true
            alert('entrer le prix unitaire')
        }

        if(denomination === ""){
            error = true
            alert('entrer unite du materiel')
        }
        

        var materiel = {nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,user}
        materiel = JSON.stringify(materiel)
        //création de la requête
        var requestURL = API_URL + "/Stocks/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(materiel);
        console.log(request.status)
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                server_error = true
                alert('erreur au niveau du serveur... veuillez réessayer')
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                alert('le materiel a bien été crée')
            }
        }
        console.log('gooddd')
        event.preventDefault()
}

       return (
        <div className="container">
            <form className="row g-3">
                <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UN MATERIEL</h2>
                <div className="col-md-4">
                        <label >Nom</label>
                        <input type="text" className="form-control" id="nommateriel" placeholder="nom du materiel"/>
                </div>
                <div className="col-md-4">
                        <label >quantite</label>
                        <input type="number" id="quantitemateriel" className="form-control"  placeholder="quantite du materiel"/>
                </div>
                <div className="col-md-4">
                        <label >Unite</label>
                        <input type="text" id="unitemateriel" className="form-control"  placeholder="prix unitaire"/>
                </div>
                <div className="col-md-4">
                        <label >prix</label>
                        <input type="number" className="form-control" id="prixmateriel" placeholder="prix du materiel"/>
                </div>

                <div className="col-md-4"> 
                        <label>date d'approvisionnement</label>
                        <input type="date" className="form-control" id="dateApprovisionnementmateriel"/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => createMateriel(event)}>Save</button>
                </div>
            </form>
      </div>
       )
}

export default CreateMateriel; 