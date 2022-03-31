import "./form.css"
import { API_URL } from "../Components/Signup"
import { useState } from "react"

function CreateCommande({materielList,setMaterielList,materiauList,setMateriauList}){
   

    var token = localStorage.getItem("token")

    //variable contenant la liste des stocks
    const [stockList , setStockList]= useState([])

    const itemList = materielList.concat(materiauList)
     
    //fonctions de creation
    function createCommande(event) {
        //récupération des valeurs du formulaire
        const description =  document.querySelector('#descriptioncommande').value 
        const stock =  document.querySelector('#stock').value 
        const quantiteDemande = document.querySelector('#quantitedemande').value
        const quantiteRecue = document.querySelector('#quantiterecue').value
        const prix = document.querySelector('#prixcommande').value
        const coutTransport = document.querySelector('#couttransport').value
        const dateCommande = document.querySelector('#datecommande').value    
        const denomination = document.querySelector('#denominationcommande').value 
        const dateArrivee = document.querySelector('#datearrivee').value    
        const duréeReapprovisionnement  = document.querySelector('#duréeReapprovisionnement').value

        
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
        var requestURL = API_URL + "/Commandes/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
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
                console.log(request.response)
                alert('la commande a été éffectuée')
               
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
                    <select id="stock" className="form-select select-input">
                            {
                                materielList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                            }
                            {
                                materiauList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                            }
                    </select>
                </div>
                <div className="col-md-4">
                    <label for="descriptioncommande" className="form-label">description</label>
                    <input placeholder="entrer la description" type="text" class="form-control" id="descriptioncommande"  required />
                </div>
                <div className="col-md-6">
                    <label for="denominationcommande" class="form-label">denomination</label>
                    <input placeholder="entrer l'unite de la commande" type="text" className="form-control" id="denominationcommande" required />
                </div>
                <div className="col-md-6">
                    <label for="quantitedemande" className="form-label">Quantite demandée</label>
                    <input placeholder="entrer la quantite demandée" type="number" className="form-control" id="quantitedemande" required />
                </div>
                <div className="col-md-6">
                    <label for="quantiterecue" className="form-label">Quantite Recue</label>
                    <input placeholder="entrer la quantite recue" type="number" className="form-control" id="quantiterecue" required />
                </div>
                <div className="col-md-6">
                    <label for="couttransport" className="form-label">Cout de transport</label>
                    <input placeholder="entrer le cout du transport" type="number" className="form-control" id="couttransport" required />
                </div>
                <div className="col-md-6">
                    <label for="prixcommande" className="form-label">Prix</label>
                    <input placeholder="entrer le prix de la commande" type="number" className="form-control" id="prixcommande" required />
                </div>
                <div className="col-md-6">
                    <label for="duréeReapprovisionnement" className="form-label">durée de Reapprovisionnement</label>
                    <input placeholder="entrer la durée de réapprovisionnement" type="text" className="form-control" id="duréeReapprovisionnement" required />
                </div>
                <div className="col-md-6">
                    <label for="datecommande" className="form-label">date de la commande</label>
                    <input placeholder="entrer la date de commande" type="date" className="form-control" id="datecommande" required />
                </div>
                <div className="col-md-6">
                    <label for="datearrivee" className="form-label">date d'arrivée</label>
                    <input placeholder="entrer la date d'arrivée de la commande" type="date" className="form-control" id="datearrivee" required />
                </div>
                <div class="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => createCommande(event)}>Save</button>
                </div>
            </form>       
      </div>
       )
}

export default CreateCommande;