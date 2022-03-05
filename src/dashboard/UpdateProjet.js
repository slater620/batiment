import "./form.css"
import { API_URL } from "../authentification/Signup"
function UpdateProjet({setSpaceName,spaceName,itemToUpdate,setItemToUpdate,projetList,setProjetList}){
    
//fonction de modification d'un projet
 function updateProjet(event){

    //construction de la requete
   var requestUrl = API_URL +"/Projets/" + itemToUpdate['id'] + "/";

   //variable qui signale la présence d'une erreur dans le formulaire
   var error = false

   //variable indiquant si l'utilisa teur est connecté à internet
   var  connected = window.navigator.onLine
    console.log('bonjour')
    //récupération des valeurs du formulaire
   const nom= document.querySelector('#nomupdate').value
   const description = document.querySelector('#descriptionupdate').value
   var token = localStorage.getItem("token")
   const user = localStorage.getItem("user")
   console.log(user)
   var projet = {nom,description,user}
   var request = new XMLHttpRequest();
   request.open('PATCH', requestUrl);
   request.setRequestHeader('Authorization' , 'Bearer ' + token);
   request.setRequestHeader('Content-Type' , 'application/json');
   request.responseType = 'json';
   projet = JSON.stringify(projet);
   request.send(projet);
   console.log(projet)
   console.log(token)
   console.log('avance')
   request.onload = function(){ 
       
       const requestStatus = request.status

       console.log(request.response)
       //requête réussie
       console.log('gooddd')
       console.log(request.response)
       //on remplace l'élément dans la liste des projets
       const index = projetList.findIndex(projet => projet['id'] === itemToUpdate['id'])
       setSpaceName('listProjet')
    }
    event.preventDefault();
}
    return (
        <div className="container">
            <h2 style={{textAlign:"center",marginTop:"1%"}}>Modifier LE PROJET {itemToUpdate['nom']}</h2>
           <form>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input  type="text" className="form-control" id="nomupdate" name="name" placeholder="name of project"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="description">description</label>
                    </div>
                    <div class="col-75">
                        <input  type="text" id="descriptionupdate" className="form-control" name="description" placeholder="description of project"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => updateProjet(event)} >Save</button>
            </form>
      </div>
    )
}
export default UpdateProjet;