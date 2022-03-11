import "./form.css"
import { API_URL } from "../authentification/Signup"

function UpdateMateriau({setSpaceName, spaceName,itemToUpdate,setItemToUpdate,materiauList,setMateriauList}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    //fonctions de creation d'un stock
    const updateMateriau = (event) => {
        //récupération des valeurs du formulaire
        const nom = document.querySelector('#nommateriauupdate').value
        const quantite = document.querySelector('#quantitemateriauupdate').value
        const prix = document.querySelector('#prixmateriauupdate').value
        const dateApprovisionnement = document.querySelector('#datemateriauupdate').value
        const type =  'Materiau'     

        if(!connected){
            error = true
            
        }

        if(quantite === ""){
            error = true
        }

        if(nom === ""){
            error = true
        }
        
        if(dateApprovisionnement === ""){
            error = true
        }
        var user = localStorage.getItem("user")
        var stock = {nom , quantite,prix ,type, dateApprovisionnement,user}
        stock= JSON.stringify(stock)
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
            console.log(requestStatus)
            
            if(requestStatus === 403){
                server_error = true
            

            }
            else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                const index = materiauList.findIndex(stock => stock['id'] === itemToUpdate['id'])
                setSpaceName('listMateriau')
            }
            
        }
        event.preventDefault();
}


       return (
        <div className="container">
            <form >
            <h2 style={{textAlign:"center",marginTop:"1%"}}>MODIFIER LE MATERIAU {itemToUpdate['nom']} </h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label >Nom</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="nommateriauupdate"  placeholder="nom du materiau"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >quantite</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="quantitemateriauupdate" className="form-control" placeholder="quantité du materiau"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >prix</label>
                    </div>
                    <div className="col-75">
                        <input  type="number" className="form-control" id="prixmateriauupdate" placeholder="prix du materiau"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label>date d'approvisionnement</label>
                    </div>
                    <div className="col-75">
                        <input  type="date" className="form-control" id="datemateriauupdate" placeholder="date d'approvisionnement"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"  onClick={(event) => updateMateriau(event)}>Save</button>
            </form>
      </div>
       )
}

export default UpdateMateriau;