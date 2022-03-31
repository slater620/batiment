import "./form.css"
import { API_URL } from "../Components/Signup"

function UpdateMateriel({setSpaceName, spaceName,itemToUpdate,setItemToUpdate,materielList,setMaterielList}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    //fonctions de creation d'un stock
    const updateMateriel = (event) => {
        //récupération des valeurs du formulaire
        const nom = document.querySelector('#nommaterielupdate').value
        const denomination =  document.querySelector('#unitematerielupdate').value
        const quantite = document.querySelector('#quantitematerielupdate').value
        const prixUnitaire = document.querySelector('#prixmaterielupdate').value
        const dateApprovisionnement = document.querySelector('#datematerielupdate').value
        const type =  'materiel'     

        if(!connected){
            error = true
            
        }

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
        var user = localStorage.getItem('user')
        var stock ={nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,user}
        //construction de la requete
        var requestUrl = API_URL +"/Stocks/" + itemToUpdate['id'] + "/";
        var request = new XMLHttpRequest();
        var token = localStorage.getItem("token")
        request.open('PATCH', requestUrl);
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
            

            }
            else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                const index = materielList.findIndex(stock => stock['id'] === itemToUpdate['id'])
                alert('le materiau a bien été modifié')
            }
            
        }
        event.preventDefault();
}


       return (
        <div className="container">
            <form className="row g-3" >
                <h2 style={{textAlign:"center",marginTop:"1%"}}>MODIFIER LE MATERIEL {itemToUpdate['nom']} </h2>
                <div className="col-md-4">
                        <label >Nom</label>
                        <input defaultValue={itemToUpdate['nom']} type="text" className="form-control" id="nommaterielupdate" name="name" placeholder="nom du materiel"/>
                </div>
                <div className="col-md-4">
                    <label >quantité</label>
                    <input type="number" defaultValue={itemToUpdate['quantite']}  id="quantitematerielupdate" className="form-control" name="quantity" placeholder="quantité de materiel"/>
                </div>
                <div className="col-md-4">
                    <label >Unite</label>
                    <input type="text" id="unitematerielupdate" className="form-control"  placeholder="prix unitaire"/>
                </div>
                <div className="col-md-4">
                    <label >prix</label>
                    <input  type="number" defaultValue={itemToUpdate['prix']} className="form-control" id="prixmaterielupdate" name="price" placeholder="price du matériel"/>
                </div>
                <div className="col-md-4"> 
                    <label> date d'approvisionnement</label>
                    <input  type="date" defaultValue={itemToUpdate['dateApprovisionnement']} className="form-control" id="datematerielupdate" name="date"/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => updateMateriel(event)}>Save</button>
                </div>    
            </form>
      </div>
       )
}

export default UpdateMateriel;