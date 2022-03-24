import "./form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function CreateMateriau({setSpaceName, spaceName}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false

    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
      
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    var token = localStorage.getItem("token")
    var user = localStorage.getItem("user")
    
    //fonctions de creation d'un stock
    const createMateriaux = (event) => {
        console.log('ok')
        console.log(token)
        console.log(user)
        const type =  "Materiau"
        //récupération des valeurs du formulaire
        
        const nom = document.querySelector('#nommateriau').value
        const quantite = document.querySelector('#quantitemateriau').value
        const denomination =  document.querySelector('#unitemateriau').value
        const prixUnitaire = document.querySelector('#prixmateriau').value
        const dateApprovisionnement = document.querySelector('#dateApprovisionnement').value     

        if(quantite === ""){
            error = true
            alert('entrer la quantite du materiau')
        }

        if(nom === ""){
            error = true
            alert('entrer le nom du materiau')
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
            alert('entrer unite du materiau')
        }
        
        var materiau = {nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,user}
        materiau = JSON.stringify(materiau)
        //création de la requête
        var requestURL = API_URL + "/Stocks/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(materiau);
        console.log(request.status)
        console.log(materiau);
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                server_error = true
                alert('erreur au niveau du serveur... veuillez réessayer')
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                alert('le materiau a bien été crée')
            }
        }
        console.log('gooddd')
        event.preventDefault()
}



       return (
        <div className="container">
            <form className="row g-3">
                <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UN MATERIAU</h2>
                <div className="col-md-4">
                    <label >Nom</label>
                    <input type="text" className="form-control" id="nommateriau" placeholder="nom du materiau"/>
                </div>
                <div className="col-md-4">
                        <label >quantite</label>
                        <input type="number" id="quantitemateriau" className="form-control"  placeholder="quantite de materiau"/>
                </div>
                <div className="col-md-4">
                        <label >Unite</label>
                        <input type="text" id="unitemateriau" className="form-control"  placeholder="prix unitaire"/>
                </div>
                <div className="col-md-4">
                        <label >prix</label>
                        <input type="number" className="form-control" id="prixmateriau"  placeholder="prix du materiau"/>
                </div>

                <div className="col-md-4"> 
                        <label>date d'approvisionnement</label>
                        <input type="date" className="form-control" id="dateApprovisionnement"/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => createMateriaux(event)}>Save</button>
                </div>
               
            </form>
        </div>)
};
export default CreateMateriau; 