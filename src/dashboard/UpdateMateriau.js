import "./form.css"
import { API_URL } from "../Components/Signup"

function UpdateMateriau({setSpaceName, spaceName,itemToUpdate,setItemToUpdate,materiauList,setMateriauList}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    var token = localStorage.getItem("token")

    //fonctions de creation d'un stock
    const updateMateriau = (event) => {
        //récupération des valeurs du formulaire
        const nom = document.querySelector('#nommateriauupdate').value
        const quantite = document.querySelector('#quantitemateriauupdate').value
        const denomination =  document.querySelector('#unitemateriauupdate').value
        const prixUnitaire = document.querySelector('#prixmateriauupdate').value
        const dateApprovisionnement = document.querySelector('#datemateriauupdate').value
        const type =  'Materiau'     

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
        
        var user = localStorage.getItem("user")
        var materiau = {nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,user}
        materiau = JSON.stringify(materiau)
        //construction de la requete
        var requestUrl = API_URL +"/Stocks/" + itemToUpdate['id'] + "/";
        var request = new XMLHttpRequest();
        request.open('PATCH', requestUrl);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(materiau);
        console.log(request.status)
        console.log(materiau);
        request.onload = function(){
            
            const requestStatus = request.status
            console.log(requestStatus)
            
            if(requestStatus === 403){
                server_error = true
            

            }
            else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                const index = materiauList.findIndex(stock => stock['id'] === itemToUpdate['id'])
                alert('le materiau a été modifié')
            }
            
        }
        event.preventDefault();
}


       return (
        <div className="container">
            <form  className="row g-3" >
                <h2 style={{textAlign:"center",marginTop:"1%"}}>MODIFIER LE MATERIAU {itemToUpdate['nom']} </h2>
                <div className="col-md-4">
                        <label >Nom</label>
                        <input type="text" defaultValue={itemToUpdate['nom']} className="form-control" id="nommateriauupdate"  placeholder="nom du materiau"/>
                </div>
                <div className="col-md-4">
                    <label >quantite</label>
                    <input type="number" id="quantitemateriauupdate" className="form-control" placeholder="quantité du materiau"/>
                    
                </div>
                <div className="col-md-4">
                    <label >Unite</label>
                    <input type="text" id="unitemateriauupdate" className="form-control"  placeholder="prix unitaire"/>
                </div>
                <div className="col-md-4">
                    <label >prix</label>
                    <input  type="number" className="form-control" id="prixmateriauupdate" placeholder="prix du materiau"/>
                    
                </div>
                <div className="col-md-4"> 
                    <label>date d'approvisionnement</label>
                    <input  type="date" className="form-control" id="datemateriauupdate" placeholder="date d'approvisionnement"/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"  onClick={(event) => updateMateriau(event)}>Save</button>
                </div>   
            </form>
      </div>
       )
}

export default UpdateMateriau;