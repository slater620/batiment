import "./form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function UpdateCommande({setSpaceCommandeName, spaceCommandeName,itemToUpdate,setItemToUpdate,commandeList,setCommandeList}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    const [stockList , setStockList]= useState([])

    var token = localStorage("token")

    //fonctions de creation
    const updateCommande = (event) => {
        //récupération des valeurs du formulaire
        var user = localStorage("user")
        const nom = document.querySelector('#name').value
        const quantite = document.querySelector('#quantity').value
        const prix = document.querySelector('#price').value
        const dateCommande = document.querySelector('#datecommande').value     
        const dateArrivee = document.querySelector('#datearrivee').value     
        const stock =  document.querySelector('#stock').value  
        if(!connected){
            error = true
            
        }

        if(quantite === ""){
            error = true
        }

        if(nom === ""){
            error = true
        }
        
        if(dateCommande === ""){
            error = true
        }
        if(dateArrivee === ""){
            error = true
        }
        var commande = {nom , prix , quantite ,dateArrivee, dateCommande,user}
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
                server_error = true
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                setSpaceCommandeName('listCommande')
            }
        }
        event.preventDefault()
}

 //fonction permettant de récupérer la liste des stocks
 function getStocks(){
 
    //construction de la requete
   var requestUrl = API_URL +"/Stocks"
   //création de la requête
   var request = new XMLHttpRequest();
   request.open('GET', requestUrl);
   token = localStorage.getItem("token")
   request.setRequestHeader('Authorization' , 'Bearer ' + token);
   request.setRequestHeader('Content-Type' , 'application/json');
   request.responseType = 'json';
   request.send(); 
   request.onload = function(){
       setStockList(request.response);
   }           
}


       return (
        <div className="container">
            {
                getStocks()
            }
            <form >
            <h2 style={{textAlign:"center",marginTop:"1%"}}>Modifier la commande {itemToUpdate['nom']} </h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label >Nom</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="name" name="name" placeholder="nom de la commande"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >quantité</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="quantity" className="form-control" name="quantity" placeholder="quantité a commander"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >prix</label>
                    </div>
                    <div className="col-75">
                        <input type="number" className="form-control" id="price" name="price" placeholder="prix de la commande"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label>date de commande</label>
                    </div>
                    <div className="col-75">
                        <input type="date" className="form-control" id="datecommande" name="date"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label>date d'arrivée</label>
                    </div>
                    <div className="col-75">
                        <input type="date" className="form-control" id="datearrivee" name="date"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label>stock</label>
                    </div>
                    <div className="col-75">
                        <select id="stock" className="form-control select-input">
                                        {
                                            stockList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                                        }
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"  onClick={(event) => updateCommande(event)}>Save</button>
            </form>
      </div>
       )
}

export default UpdateCommande; 