import Header from "./Header"
import { API_URL } from "./Signup";
import { useState } from "react";
import { Link} from 'react-router-dom';
import "./list.css"
import ProjetHeader from "./ProjetHeader"
function Projet({tacheList, setTacheList,itemData , setItemData}){

    var token = localStorage.getItem("token")

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')
     //etat contenant le message à afficher dans l'alerte de confirmation
     const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
     //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])
    //etat contenant la liste des éléments cochés de la liste
    const [itemToUpdate, setItemToUpdate] = useState([])
    //fonction permettant de retrouver l'id d'un élément à partir de l'id du checkbox correspondant//
    function getItemIdFromCheckboxId(checkboxId){
        const tmp = checkboxId.split('_')
        return tmp[1]
    }

    //fonction pour supprimer la liste des taches sélectionnées//

function deleteItems(itemsList, checkedItemIndex){
    if(checkedItemIndex < checkedItems.length){
        const itemId = checkedItems[checkedItemIndex]
        //création de la requête
        var requestURL = API_URL +"/Taches/" + itemId + "/"
        var request = new XMLHttpRequest();
        request.open('DELETE', requestURL);
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send();
        request.onload = function(){
            const requestStatus = request.status
            console.log('supprimer plusieurs')
            
                const deletedItemIndex = itemsList.findIndex(item => item['id'] === itemId);
                

                if(deletedItemIndex > -1){
                    
                    //on retire l'élément supprimé de la liste
                    itemsList = itemsList.filter(function(value, index, arr){
                        return index !== deletedItemIndex
                    })
                    
                    setTacheList(itemsList)
                    

                    deleteItems(itemsList, checkedItemIndex + 1)
                }
            }


    }else{
        
        //on vide la liste des éléments sélectionnés
        setCheckedItems([])
    }

}


//fonction permettant de supprimer un élément ayant son id//
function deleteItem(itemId){
    //création de la requête
    var requestURL = API_URL +"/Taches/" + itemId + "/"
    var request = new XMLHttpRequest();    
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
            const deletedItemIndex = tacheList.findIndex(item => item['id'] === itemId);

            if(deletedItemIndex > -1){
                
                //on retire l'élément supprimé de la liste
                const itemsList = tacheList.filter(function(value, index, arr){
                    return index !== deletedItemIndex
                })
                
                setTacheList(itemsList)
                console.log(tacheList)
            }

             //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
        getTaches()
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

    //fonction de modification d'une tache
 function updateTache(event){

    //construction de la requete
   var requestUrl = API_URL +"/Taches/" + itemToUpdate['id'] + "/";

   //variable qui signale la présence d'une erreur dans le formulaire
   var error = false

   //variable indiquant si l'utilisa teur est connecté à internet
   var  connected = window.navigator.onLine
    console.log('bonjour')
    //récupération des valeurs du formulaire
    const nom = document.querySelector('#nameupdate').value
    const dateDebut = document.querySelector('#startdateupdate').value
    const dateFin = document.querySelector('#enddateupdate').value
    const description = document.querySelector('#descriptionupdate').value 
    const  projet = itemData['id']
    if(!connected){
        error = true
    }

    
    if(description === ""){
        alert('entrer la description')
    }

    if(nom === ""){
        alert('entrer le nom')
    }
       
    if(dateDebut === ""){
        alert('entrer la date de debut')
    }
    if(dateFin === ""){
        error = true
        alert('entrer la date de fin')
    }
    
    var tache = {nom ,projet, dateDebut , dateFin , description}
    tache = JSON.stringify((tache))
    var token = localStorage("token")
   var request = new XMLHttpRequest();
   request.open('PATCH', requestUrl);
   request.setRequestHeader('Authorization' , 'Bearer ' + token);
   request.setRequestHeader('Content-Type' , 'application/json');
   request.responseType = 'json';
   request.send(tache);
   console.log(tache)
   console.log('avance')
   request.onload = function(){ 
       
       const requestStatus = request.status

       console.log(request.response)
       //requête réussie
       console.log('gooddd')
       console.log(request.response)
       //on remplace l'élément dans la liste des taches
       const index = tacheList.findIndex(tache => tache['id'] === itemToUpdate['id'])
       alert('la tache a bien été modifiée')
    }
    getTaches()
    event.preventDefault();
}

    //fonction permettant de récupérer la liste des taches
    function getTaches(){
 
        //construction de la requete
       var requestUrl = API_URL +"/Taches"
       //création de la requête
       var request = new XMLHttpRequest();
       request.open('GET', requestUrl);
       var token = localStorage.getItem("token")
       request.setRequestHeader('Authorization' , 'Bearer ' + token);
       request.setRequestHeader('Content-Type' , 'application/json');
       request.responseType = 'json';
       request.send(); 
       request.onload = function(){
           setTacheList(request.response);
       }  
                
    } 
    
    //fonctions de creation d'une tache
    const createTaches = (event) => {
        //récupération des valeurs du formulaire
        const nom = document.querySelector('#name').value
        const dateDebut = document.querySelector('#start-date').value
        const dateFin = document.querySelector('#end-date').value
        const description = document.querySelector('#description').value 
        const  projet = itemData['id']
    
        if(description === ""){
            alert('entrer la description')
        }
    
        if(nom === ""){
            alert('entrer le nom')
        }
           
        if(dateDebut === ""){
            alert('entrer la date de debut')
        }
        if(dateFin === ""){
           
            alert('entrer la date de fin')
        }
        
        var tache = {nom ,projet, dateDebut , dateFin , description}
        tache = JSON.stringify((tache))
    
        //création de la requête
        var requestURL = API_URL + "/Taches/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send(tache);
        console.log(tache)
        console.log(request.status)
        console.log('avance')
        request.onload = function(){
            const requestStatus = request.status
            
            if(requestStatus === 403){
            
              
    
            }else if(requestStatus === 201){
                alert("la tache a été crée avec success ")
            }
        }
        getTaches()
        event.preventDefault()
    }


    //fonction permettant d'afficher la liste des projets
    function tableauTache(){
        return(
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                            <input type="checkbox" id="selectAll" title="tout sélectionner" value="1"></input>
                        </th>
                        <th scope="col">Nom</th>
                        <th scope="col">Date de debut</th>
                        <th scope="col">Date de Fin</th>
                        <th  scope="col">
                            <span   id="delete"  data-toggle="modal" data-target="#myModal"  className=" material-icons md-48" title="supprimer">delete</span>
                        </th>
                        <th scope="col">
                            <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{getTaches()}}></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tacheList.map((tache) =>(
                        <tr>
                            <td>
                                <span>
                                    <input type="checkbox" onClick={(event) =>{handleCheckboxClick(event)}}></input>
                                </span>
                            </td>
                            <td className="col-3 text">{tache['nom']}</td>
                            <td className="col-2 text">{tache['createdAt']}</td>
                            <td className="col-2 text">{tache['updatedAt']}</td>
                            <td className="col-1 vertical-center">
                                <a  data-toggle="modal" data-target="#myModal" style={{marginRight:"10px"}} onClick={(event) =>{//on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([]) ; setConfirmAlertMsg('voulez vous supprimer la tache ' +  tache['nom']+'?')
                                                     ;setSelectedItemId(tache['id']) 
                                                     ;event.preventDefault()}} >
                                    <span  title="supprimer" className="material-icons md-48 delete-icon">delete</span>
                                </a>
                                <a  data-toggle="modal" data-target="#updatetache" className="update-icon item-update" title='modifier'onClick={(event) =>{ setItemToUpdate(tache);event.preventDefault()
                                }}><span className="material-icons md-48 delete-icon">edit</span></a>
                            </td>
                            <td>
                                <a className="material-icons-outlined " title='consulter le stock de la tache'>
                                   <span className="material-icons" onClick={(event) =>{setItemData(tache);event.preventDefault()}}> <Link to ="/dashboard/projet/tache">add</Link></span>     
                                </a> 
                            </td>
                        </tr>)
                        )
                    }
                    
                </tbody>
            </table>
        )
    }
    return(
        <div className="container-fluid">
            <div>  <Header/> </div>   
            <div style={{marginTop:"1.5%"}} className="row"> 
                <div className="col" style={{marginRight:"25%" , marginLeft:"35%"}}>
                    <h3>{itemData['nom']}</h3>
                </div>
                <div className="col" >
                    <button data-toggle="modal" data-target="#creertache" type="submit" className="btn btn-primary">NOUVELLE TACHE</button>
                </div>
            </div>
            <div> <ProjetHeader/> </div>
            <div className="container">
                {
                    tableauTache()
                }
            </div>
            {
               
               <div id="creertache" className="modal fade" role="dialog">
                 <div class="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UNE TACHE</h2>
                     </div>
                     <div className="modal-body">
                        <form className="row g-3">
                            
                            <div className="col-md-4">
                                <label for="name">Nom</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="nom de la tache" required/>                    
                            </div>
                            <div className="col-md-4">
                                <label for="description">description</label>
                                <input type="text" id="description" className="form-control" name="description" placeholder="description de la tache" required/>          
                            </div>
                            <div className="col-md-6">
                                <label for="start-date">date de debut</label>
                                <input type="date" className="form-control" id="start-date" name="start-date" required/>
                            </div>
                            <div className="col-md-6">
                                <label for="end-date">date de fin</label>
                                <input type="date" className="form-control" id="end-date" name="end-date" required/>
                            </div>
                        </form>   
                      
                     </div>
                     <div className="modal-footer row">
                     <div className="col-12">
                        <button type="submit" className="btn btn-primary"   onClick={(event) => createTaches(event)}>Save</button>
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
               
               <div id="updatetache" className="modal fade" role="dialog">
                 <div className="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h2 style={{textAlign:"center",marginTop:"1%"}}>Modifier la Tache {itemToUpdate['nom']}</h2>
                      
                     </div>
                     <div className="modal-body">
                                
                        <form className="row g-3">
                          
                            <div className="col-md-4">
                                <label for="nameupdate">Nom</label>
                                <input type="text" defaultValue={itemToUpdate['nom']} className="form-control" id="nameupdate" name="name" placeholder="nom de la tache" required/>                    
                            </div>
                            <div className="col-md-4">
                                <label for="descriptionupdate">description</label>
                                <input type="text" id="descriptionupdate" defaultValue={itemToUpdate['description']} className="form-control" name="description" placeholder="description de la tache" required/>          
                            </div>
                            <div className="col-md-6">
                                <label for="startdateupdate"> date de debut</label>
                                <input type="date" className="form-control" defaultValue={ itemToUpdate['dateDebut'] } id="startdateupdate" name="start-date" required/>
                            </div>
                            <div className="col-md-6">
                                <label for="enddateupdate">date de fin</label>
                                <input type="date" className="form-control" id="enddateupdate" defaultValue={ itemToUpdate['dateFin'] } name="end-date" required/>
                            </div>
                        </form> 
                      
                     </div>
                     <div className="modal-footer row">
                     <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={(event) => updateTache(event)}>Save</button>
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
                    <div className="modal-dialog">
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
                                                          deleteItems(tacheList, 0)
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
export default Projet