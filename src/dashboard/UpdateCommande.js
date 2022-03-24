import "./form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function UpdateCommande({setMaterielList,materielList,materiauList,setMateriauList,itemToUpdate,setItemToUpdate,commandeList,setCommandeList}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine


    var token = localStorage.getItem('token')

    //fonctions de creation
    const updateCommande = (event) => {
        //récupération des valeurs du formulaire
    
        //récupération des valeurs du formulaire
        const description =  document.querySelector('#descriptioncommandeupdate').value 
        const stock =  document.querySelector('#stockupdate').value 
        const quantiteDemande = document.querySelector('#quantitedemandeupdate').value
        const quantiteRecue = document.querySelector('#quantiterecueupdate').value
        const prix = document.querySelector('#prixcommandeupdate').value
        const coutTransport = document.querySelector('#couttransportupdate').value
        const dateCommande = document.querySelector('#datecommandeupdate').value    
        const denomination = document.querySelector('#denominationcommandeupdate').value 
        const dateArrivee = document.querySelector('#datearriveeupdate').value    
        const duréeReapprovisionnement  = document.querySelector('#duréeReapprovisionnementupdate').value

        
        if(description === ""){
            alert('entrer la description')
        }
        if(denomination === ""){
            alert('entrer unité de la commande')
        }
    
        if(quantiteDemande === ""){
            alert('entrer la quantité demandée')
        }
        if(quantiteRecue === ""){
            alert('entrer la quantité recue')
        }
        if(stock === ""){
           
            alert('entrer le nom du stock')
        }
        if(coutTransport === ""){
            alert('entrer le cout de Transport')
        }
        if(dateCommande === ""){
            alert('entrer la date de commande')
        }
        if(duréeReapprovisionnement === ""){
            alert('entrer la durée de reapprovisionnement')
        }
        if(dateArrivee === ""){
            alert('entrer la date arrivée')
        }
        var commande = {description ,quantiteDemande,quantiteRecue , prix , coutTransport,  stock  , duréeReapprovisionnement , denomination,  dateCommande,dateArrivee}
        commande = JSON.stringify(commande)
        //création de la requête
        var requestURL = API_URL + "/Commandes/" + itemToUpdate['id'] + "/";
        var request = new XMLHttpRequest();
        request.open('PATCH', requestURL);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(commande);
        console.log(request.status)
        console.log(commande);
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                
                alert('erreur au  niveau du serveur')
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                alert('la commande a été modifiée')
               
            }
        }
        event.preventDefault()
}

       return (
        <div className="container">
            <form class="row g-3">
                <h2 style={{textAlign:"center",marginTop:"1%"}}>COMMANDER</h2>
                <div className="col-md-4">
                    <label>Stock</label>
                    <select id="stockupdate" className="form-select select-input">
                            {
                                materielList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                            }
                            {
                                materiauList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                            }
                    </select>
                </div>
                <div className="col-md-4">
                    <label for="descriptioncommandeupdate" className="form-label">description</label>
                    <input placeholder="entrer la description" type="text" className="form-control" id="descriptioncommandeupdate"  required />
                </div>
                <div className="col-md-6">
                    <label for="denominationcommandeupdate" className="form-label">denomination</label>
                    <input placeholder="entrer l'unite de la commande" type="text" className="form-control" id="denominationcommandeupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="quantitedemandeupdate" className="form-label">Quantite demandée</label>
                    <input placeholder="entrer la quantite demandée" type="number" className="form-control" id="quantitedemandeupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="quantiterecueupdate" className="form-label">Quantite Recue</label>
                    <input placeholder="entrer la quantite recue" type="number" className="form-control" id="quantiterecueupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="couttransportupdate" className="form-label">Cout de transport</label>
                    <input placeholder="entrer le cout du transport" type="number" className="form-control" id="couttransportupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="prixcommandeupdate" className="form-label">Prix</label>
                    <input placeholder="entrer le prix de la commande" type="number" className="form-control" id="prixcommandeupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="duréeReapprovisionnementupdate" className="form-label">durée de Reapprovisionnement</label>
                    <input placeholder="entrer la durée de réapprovisionnement" type="text" className="form-control" id="duréeReapprovisionnementupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="datecommandeupdate" className="form-label">date de la commande</label>
                    <input placeholder="entrer la date de commande" type="date" className="form-control" id="datecommandeupdate" required />
                </div>
                <div className="col-md-6">
                    <label for="datearriveeupdate" className="form-label">date d'arrivée</label>
                    <input placeholder="entrer la date d'arrivée de la commande" type="date" className="form-control" id="datearriveeupdate" required />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => updateCommande(event)}>Save</button>
                </div>
            </form>       
      </div>
       )
}

export default UpdateCommande; 