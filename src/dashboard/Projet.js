import { useState } from "react";
import { API_URL } from "../Components/Signup";

function Projet(){

    //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])
    
    //etat contenant le message à afficher dans l'alerte de confirmation
    const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
 
    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [item, setItem] = useState('')
     //etat contenant la liste  des projets
     const [projetList, setProjetList] = useState([])

     //etat contenant la liste  des taches
     const [tacheList, setTacheList] = useState([])

    //fonction permettant de construire l'id du checkboxList d'un élément de la liste//
    function getCheckboxId(item){
    return 'checkbox_' + item['id']
    }   

    //fonction permettant de construire l'id du bouton de suppression d'un élément//
    function getDeleteButtonId(item){
        return 'deleteButton_' + item['id']
    }

    //fonction permettant de sélectionner tous les éléments de la liste
    function selectAll(){
        const checked = document.getElementById('selectAll').checked
    
        if(checked){
        
        const tmpList = []
            //on coche tous les checkboxs
            projetList.forEach(function(item){

                document.getElementById(getCheckboxId(item)).checked = true
                tmpList.push(item['id'])
            
            }
            )

        }else{
            //on vide la liste des éléments cochés
            setCheckedItems([])

            //on décoche tous les checkboxs
            projetList.forEach(function(item){
                document.getElementById(getCheckboxId(item)).checked = false
            })
        }
        
    }
    //fonction permettant de construire l'id du bouton de mise à jour d'un élément//
    function getUpdateButtonId(item){
        return 'updateButton_' + item['id']
    }

    //fonction permettant de retrouver l'id d'un élément à partir de l'id du checkbox correspondant//
    function getItemIdFromCheckboxId(checkboxId){
        const tmp = checkboxId.split('_')
        return tmp[1]
    }

    //fonction appelée lorqu'on clique sur un checkbox de la liste
    function handleCheckboxClick(event)
    {
        console.log(event);
        var checked = event.target.checked;

        if(checked){
            //si le checkbox est coché on récupère l'id de l'élément correspondant et on le stocke dans la lste des éléments sélectionnés de la liste
            setCheckedItems([...checkedItems, getItemIdFromCheckboxId(event.target.id)])
            console.log(checkedItems)
            
            
        }else{
            //on retire l'id de l'élément dans la liste des éléments cochés
            const itemId = getItemIdFromCheckboxId(event.target.id)
            const index = checkedItems.indexOf(itemId)
            if(index > -1){
                checkedItems.splice(index, 1)
            }
        }
    }
 
     
     //etat contenant la liste  des stocks
     const [materielList,setMaterielList]= useState([])
     const [materiauList, setMateriauList] = useState([])
 
     //etat contenant la liste  des scommandes
     const [commandeList,setCommandeList]= useState([])
 
     //etat contenant un item precis
     const [itemData, setItemData] = useState('')
 
     //etat contenant un item pour la modification
     const [itemToUpdate,setItemToUpdate]= useState()

     
//fonction pour supprimer la liste des projets sélectionnées//
 function deleteItems(itemsList, checkedItemIndex){
    if(checkedItemIndex < checkedItems.length){
        const itemId = checkedItems[checkedItemIndex]

        //création de la requête
        var requestURL = API_URL +"/Projets/" + itemId + "/"
        var request = new XMLHttpRequest();
        var token = localStorage.getItem('token')
        request.open('DELETE', requestURL);
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send();
        
        request.onload = function(){
            const requestStatus = request.status

            if(requestStatus === 204){
                //succès de la suppression
                //on supprime l'élément de la liste des data*/
                const deletedItemIndex = itemsList.findIndex(item => item['id'] === itemId);
                

                if(deletedItemIndex > -1){
                    
                    //on retire l'élément supprimé de la liste
                    itemsList = itemsList.filter(function(value, index, arr){
                        return index !== deletedItemIndex
                    })
                    
                    setProjetList(itemsList)
                    

                    deleteItems(itemsList, checkedItemIndex + 1)
                }
            }
        }

    }else{
        
        //on vide la liste des éléments sélectionnés
        setCheckedItems([])
    }
}  

    //fonction de modification d'un projet
    function updateProjet(event){

        //construction de la requete
    var requestUrl = API_URL +"/Projets/" + itemToUpdate['id'] + "/";

    //variable qui signale la présence d'une erreur dans le formulaire
    var error = false

    //variable indiquant si l'utilisa teur est connecté à internet
    var  connected = window.navigator.onLine
    
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
        alert('le projet '+ itemToUpdate['nom'] + ' a bien été modifié')
        }
        getProjets()
        event.preventDefault();
    }


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


    //fonction permettant de supprimer un élément ayant son id//
    function deleteItem(itemId){
        //création de la requête
        var requestURL = API_URL +"/Projets/" + itemId + "/"
        var request = new XMLHttpRequest();
        var token = localStorage.getItem("token")
        request.open('DELETE', requestURL);
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send();
        request.onload = function(){
            const requestStatus = request.status
            console.log(request.response)
            console.log("supprimer un")
                //succès de la suppression
                //on supprime l'élément de la liste des data*/
                const deletedItemIndex = projetList.findIndex(item => item['id'] === itemId);

                if(deletedItemIndex > -1){
                    
                    //on retire l'élément supprimé de la liste
                    const itemsList = projetList.filter(function(value, index, arr){
                        return index !== deletedItemIndex
                    })
                    
                    setProjetList(itemsList)
                }

                //on vide la liste des éléments sélectionnés
                setCheckedItems([])
            }
    }

    // fonction pour afficher la liste des projets
    function getProjets(){
 
       //construction de la requete
       var requestUrl = API_URL +"/Projets"
       //création de la requête
       var request = new XMLHttpRequest();
       request.open('GET', requestUrl);
       var token = localStorage.getItem("token")
       request.setRequestHeader('Authorization' , 'Bearer ' + token);
       request.setRequestHeader('Content-Type' , 'application/json');
       request.responseType = 'json';
       request.send(); 
       request.onload = function(){
           
           setProjetList(request.response);
       }
}
    
    //fonction affichant la liste des projets
    function tableauProjets(){
        
        return(
            <div>
              <table className="table">
                   <thead class="thead-dark">
                   <tr>
                        <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                            <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                        </th>
                       <th scope="col">Nom</th>
                       <th scope="col">description</th>
                       <th scope="col" >date de creation</th>
                       <th scope="col">date de modification</th>
                       <th className="hover-pointer" scope="col">
                           <a id="delete"  data-toggle="modal" data-target="#myModal" style={{marginRight:"10px"}}  onClick={(event) => setConfirmAlertMsg('voulez vous supprimer les projets selectionnés?')}>
                               <span className="material-icons md-48" title="supprimer">delete</span>
                           </a>
                       </th>
                       <th scope="col">
                       <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                               //on rafraîchi la liste
                               getProjets()
                               
                           }}></span>
                       </th>           
    
                   </tr>
                   </thead>
                           <tbody>
                               {
                                   projetList.map((projet) => (
                                       <tr className="list-item no-gutters" key={projet['id']} id={projet['id']} 
                                           onMouseOver={()=>{
                                               //on affiche le bouton de suppression de l'élément survolé
                                               document.getElementById(getDeleteButtonId(projet)).style.visibility = "visible"
                                               document.getElementById(getUpdateButtonId(projet)).style.visibility = "visible"
                                           }}
                                           onMouseOut={() =>{
                                               //on retire le bouton de suppression de l'élément survolé
                                               document.getElementById(getDeleteButtonId(projet)).style.visibility = "hidden"
                                               document.getElementById(getUpdateButtonId(projet)).style.visibility = "hidden"
                                           }}
                                           onClick={(event)=>{
                                               const parentTagName = event.target.parentElement.tagName
   
                                               if(parentTagName === "TR" || parentTagName === "TD"){
                                                   setItemData(projet)
                                               
                                               }
                                              
                                           }} >
                                           
                                           <td>
                                               <span>
                                                   <input type="checkbox" id={getCheckboxId(projet)}onClick={(event) =>{handleCheckboxClick(event)}}></input>
                                               </span>
                                           </td>
                                           <td className="col-3 text">{projet['nom']}</td>
                                           <td className="col-2 text">{projet['description']}</td>
                                           <td className="col-2 text">{projet['createdAt']}</td>
                                           <td className="col-3 text">{projet['updatedAt']}</td>
                                           <td className="col-1 vertical-center">
                                               <a className="item-delete material-icons md-48 delete-icon" data-toggle="modal" data-target="#myModal" id={getDeleteButtonId(projet)}   title="supprimer" onClick={(event) =>{
                                                   //on vide la liste des checkbox sélectionnés
                                                   setCheckedItems([])
                                                   //affichage du popup de confirmation
                                                   document.getElementById(getDeleteButtonId(projet)) 
                                                   setConfirmAlertMsg('voulez vous supprimer le projet ' +  projet['nom']+'?')
                                                   setSelectedItemId(projet['id'])                         
                                               }}>
                                                   <span className="material-icons md-48 delete-icon">delete</span>
                                               </a>
                                               <a className="update-icon item-update"data-toggle="modal" data-target="#myUpdate" id={getUpdateButtonId(projet)} onClick={(event) =>{setItemToUpdate(projet);event.preventDefault()}}>
                                                   <span className="material-icons md-48 delete-icon">edit</span>
                                               </a>
                                               
                                           </td>
                                       </tr>
                                       ))
                               }
                               
                           </tbody>
                       </table> 
            </div>
        );
           
  }
  return(
      <div className="container-fluid">
          <button>Choisir un projet</button>
        <div className="row"> <h4 style={{textAlign:'center'}}>Liste des projets</h4></div>   
        {
            tableauProjets()
        }
        <div>
            <button data-toggle="modal" data-target="#myProjet" >NOUVEAU PROJET</button>
        </div>
        {
               
               <div id="myUpdate" className="modal fade" role="dialog">
                 <div className="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h4 style={{ textAlign:'center' }} className="modal-title">Modifier UN PROJET </h4>
                      
                     </div>
                     <div className="modal-body">
                     <form>
                        <div className="row form-group">
                            <div className="col-25">
                                <label for="name">Nom</label>
                            </div>
                            <div className="col-75">
                                <input  type="text"  className="form-control" id="nomupdate" name="name" placeholder="nom du projet"/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-25">
                                <label for="description">description</label>
                            </div>
                            <div class="col-75">
                                <input  type="text" id="descriptionupdate" className="form-control" name="description" placeholder="description du projet"/>
                            </div>
                        </div>
                     </form>
                      
                     </div>
                     <div className="modal-footer row">
                       <div className='col'>
                           <button type="button" data-dismiss="modal" className="deletebtn" onClick={(event) => updateProjet(event)}>MODIFIER</button>
                       </div>
                       <div className='col'>
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                       </div>
                     </div>
                   </div>
               
                 </div>
               </div>
           }
           {
               
               <div id="myProjet" className="modal fade" role="dialog">
                 <div class="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h4 style={{ textAlign:'center' }} className="modal-title">CREER UN PROJET </h4>
                     </div>
                     <div className="modal-body">
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
                       
                    </form>
                      
                     </div>
                     <div className="modal-footer row">
                       <div className='col'>
                       <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={(event) => createProjet(event)} >Save</button>
                       </div>
                       <div className='col'>
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                       </div>
                     </div>
                   </div>
               
                 </div>
               </div>
           }
        {
               
               <div id="myModal" className="modal fade" role="dialog">
                 <div class="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h4 style={{ marginLeft:'40%' }} className="modal-title">Delete</h4>
                     </div>
                     <div className="modal-body">
                       <p> {confirmAlertMsg} </p>
                     </div>
                     <div className="modal-footer row">
                       <div className='col'>
                           <button type="button" data-dismiss="modal" className="deletebtn" onClick={() => { 
                                           
                                           
                                               if(checkedItems.length > 0){
                                                   //on supprime les éléments sélectionnés
                                                       deleteItems(projetList, 0)
                                               }
                                               else{
                                                   console.log(selectedItemId);
                                                   //on supprime l'élément sélectionné
                                                   deleteItem(selectedItemId)
                   
                                               }
                                               
                                           }}>Delete</button>
                       </div>
                       <div className='col'>
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                       </div>
                     </div>
                   </div>
               
                 </div>
               </div>
           }

      </div>
  )
}
export default Projet;