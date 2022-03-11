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
        const quantite = document.querySelector('#quantitemateriel').value
        const prix = document.querySelector('#prixmateriel').value
        const dateApprovisionnement = document.querySelector('#dateApprovisionnementmateriel').value     
        if(!connected){
            error = true
            alert(error)
            
        }

        if(quantite === ""){
            error = true
            alert(error)
        }

        if(nom === ""){
            error = true
            alert('erreur formulaire')
        }
        
        if(dateApprovisionnement === ""){
            error = true
            alert(error)
        }
        var materiel = {nom , quantite,prix ,type, dateApprovisionnement,user}
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
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                setSpaceName('listMateriel')
            }
        }
        console.log('gooddd')
        setSpaceName('listMateriel')
        event.preventDefault()
}



       return (
        <div className="container">
            <form >
            <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UN MATERIEL</h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label >Nom</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="nommateriel" placeholder="nom du materiel"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >quantite</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="quantitemateriel" className="form-control"  placeholder="quantite du materiel"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >prix</label>
                    </div>
                    <div className="col-75">
                        <input type="number" className="form-control" id="prixmateriel" placeholder="prix du materiel"/>
                    </div>
                </div>

                <div className="row form-group"> 
                    <div className="col-25">
                        <label>date d'approvisionnement</label>
                    </div>
                    <div className="col-75">
                        <input type="date" className="form-control" id="dateApprovisionnementmateriel"/>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary"  onClick={(event) => createMateriel(event)}>Save</button>
            </form>
      </div>
       )
}

export default CreateMateriel; 