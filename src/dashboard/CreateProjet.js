import "./form.css"
import { API_URL } from "../authentification/Signup"
function CreateProjet({setSpaceName,spaceName}){
    
//fonction de creation d'un projet
 function createProjet(event){

    //construction de la requete
   var requestUrl = API_URL +"/Projets"

   //variable qui signale la présence d'une erreur dans le formulaire
   var error = false

   //variable indiquant si l'utilisa teur est connecté à internet
   var  connected = window.navigator.onLine
   
   //récupération des valeurs du formulaire
   const nom= document.querySelector('#nomprojet').value
   const description = document.querySelector('#descriptionprojet').value

   if (nom==='') {
       alert('entrer le nom du projet')
    }
    if (description==='') {
        alert('entrer la description du projet')
     }
   var token = localStorage.getItem("token")
   const user = localStorage.getItem("user")
   console.log(user)
   var projet = {nom,description,user}
   var request = new XMLHttpRequest();
   request.open('POST', requestUrl);
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
       
       if(requestStatus === 500){
           var server_error = true
           alert('réessayer')
         

       }
       else if(requestStatus === 201){
           //requête réussie
           console.log('gooddd')
           console.log(request.response)
           
           alert('projet crée avec success')
       }
    }
    event.preventDefault();
}
    return (
        <div className="container">
            <h2 style={{textAlign:"center",marginTop:"0.4%"}}>CREER UN PROJET</h2>
           <form>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="nomprojet">Nom</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="nomprojet" name="name" placeholder="nom du projet"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label for="descriptionprojet">description</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="descriptionprojet" className="form-control" name="description" placeholder="description du projet"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => createProjet(event)} >Save</button>
            </form>
      </div>
    )
}
export default CreateProjet;