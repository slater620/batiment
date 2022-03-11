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
        const prix = document.querySelector('#prixmateriau').value
        const dateApprovisionnement = document.querySelector('#dateApprovisionnement').value     
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
            alert(error)
        }
        
        if(dateApprovisionnement === ""){
            error = true
            alert(error)
        }
        var stock = {nom , quantite,prix ,type, dateApprovisionnement,user}
        stock = JSON.stringify(stock)
        //création de la requête
        var requestURL = API_URL + "/Stocks/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(stock);
        console.log(request.status)
        console.log(stock);
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                server_error = true
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                setSpaceName('listMateriau')
            }
        }
        console.log('gooddd')
        setSpaceName('listMateriau')
        event.preventDefault()
}



       return (
        <div className="container">
            <form >
            <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UN MATERIAU</h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label >Nom</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="nommateriau" placeholder="nom du materiau"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >quantite</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="quantitemateriau" className="form-control"  placeholder="quantite de materiau"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >prix</label>
                    </div>
                    <div className="col-75">
                        <input type="number" className="form-control" id="prixmateriau"  placeholder="prix du materiau"/>
                    </div>
                </div>

                <div className="row form-group"> 
                    <div className="col-25">
                        <label>date d'approvisionnement</label>
                    </div>
                    <div className="col-75">
                        <input type="date" className="form-control" id="dateApprovisionnement"/>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary"  onClick={(event) => createMateriaux(event)}>Save</button>
            </form>
      </div>
       )
}

export default CreateMateriau; 