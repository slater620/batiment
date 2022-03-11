import "./form.css"
import { API_URL } from "../authentification/Signup"

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
        const nom = document.querySelector('#name').value
        const quantite = document.querySelector('#quantity').value
        const prix = document.querySelector('#price').value
        const dateApprovisionnement = document.querySelector('#date').value
        const type =  'materiel'     

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
        var user = localStorage("user")
        var stock = {nom , prix , quantite , dateApprovisionnement,user,type}
        //construction de la requete
        var requestUrl = API_URL +"/Stocks/" + itemToUpdate['id'] + "/";
        var request = new XMLHttpRequest();
        var token = localStorage("token")
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
                setSpaceName('listMateriel')
            }
            
        }
        event.preventDefault();
}


       return (
        <div className="container">
            <form >
                <h2 style={{textAlign:"center",marginTop:"1%"}}>MODIFIER LE STOCK {itemToUpdate['nom']} </h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label >Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="name" name="name" placeholder="name of stock"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >quantity</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="quantity" className="form-control" name="quantity" placeholder="quantity of stock"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >price</label>
                    </div>
                    <div className="col-75">
                        <input  type="number" className="form-control" id="price" name="price" placeholder="price of stock"/>
                    </div>
                </div>
                <div className="row form-group"> 
                    <div className="col-25">
                        <label>supply date</label>
                    </div>
                    <div className="col-75">
                        <input  type="date" className="form-control" id="date" name="date"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"  onClick={(event) => updateMateriel(event)}>Save</button>
            </form>
      </div>
       )
}

export default UpdateMateriel;