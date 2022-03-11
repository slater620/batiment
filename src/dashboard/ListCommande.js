import { API_URL } from '../authentification/Signup'
import {useState} from 'react'
import "./list.css"

function ListCommande({setSpaceName,spaceName,itemToUpdate,setItemToUpdate ,setItemData,itemData, commandeList,setCommandeList}){


    //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])

    //etat contenant le projet de la tache
    var projet
     
    //etat contenant le message à afficher dans l'alerte de confirmation
    const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
 
    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [item, setItem] = useState('')

    var token = localStorage.getItem("token")

    //fonction permettant de construire l'id du checkboxList d'un élément de la liste//
   function getCheckboxId(item){
    return 'checkbox_' + item['id']
}

//fonction permettant de construire l'id du bouton de suppression d'un élément//
function getDeleteButtonId(item){
    return 'deleteButton_' + item['id']
}

//fonction permettant de construire l'id du bouton de mise à jour d'un élément//
function getUpdateButtonId(item){
    return 'updateButton_' + item['id']
}

//fonction permettant de sélectionner tous les éléments de la liste

function selectAll(){
    const checked = document.getElementById('selectAll').checked
    
    if(checked){

        const tmpList = []

        //on coche tous les checkboxs
        commandeList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = true
            tmpList.push(item['id'])
        })

    }else{
        //on vide la liste des éléments cochés
        setCheckedItems([])

        //on décoche tous les checkboxs
        commandeList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = false
        })
    }
}

//fonction permettant de retrouver l'id d'un élément à partir de l'id du checkbox correspondant//
function getItemIdFromCheckboxId(checkboxId){
    const tmp = checkboxId.split('_')
    return tmp[1]
}

//fonction appelée lorqu'on clique sur un checkbox de la liste
function handleCheckboxClick(event)
{
    var checked = event.target.checked;

    if(checked){
        //si le checkbox est coché on récupère l'id de l'élément correspondant et on le stocke dans la lste des éléments sélectionnés de la liste
        setCheckedItems([...checkedItems, getItemIdFromCheckboxId(event.target.id)])
        
    }else{
        //on retire l'id de l'élément dans la liste des éléments cochés
        const itemId = getItemIdFromCheckboxId(event.target.id)
        const index = checkedItems.indexOf(itemId)
        if(index > -1){
            checkedItems.splice(index, 1)
        }
    }
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
                    
                    setCommandeList(itemsList)
                    

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
            const deletedItemIndex = commandeList.findIndex(item => item['id'] === itemId);

            if(deletedItemIndex > -1){
                
                //on retire l'élément supprimé de la liste
                const itemsList = commandeList.filter(function(value, index, arr){
                    return index !== deletedItemIndex
                })
                
                setCommandeList(itemsList)
                console.log(commandeList)
            }

             //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
}


    //fonction permettant de récupérer la liste des taches
    function getCommandes(){
 
         //construction de la requete
        var requestUrl = API_URL +"/Commandes"
        //création de la requête
        var request = new XMLHttpRequest();
        request.open('GET', requestUrl);
        token = localStorage.getItem("token")
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send(); 
        request.onload = function(){
            setCommandeList(request.response);
        }  
                 
     } 

    function tableauCommandes(){
        
         return(
             <div>
               <table className="table">
                    <thead class="thead-dark">
                    <tr>
                        <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                            <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                        </th>
                        <th>Nom</th>
                        <th>Date de commande</th>
                        <th>Date d'arrivée</th>
                        <th className="hover-pointer">
                            <a id="delete" data-toggle="modal" data-target="#myModal"  style={{color:"black"}} onClick={() => {  setConfirmAlertMsg("Voulez-vous supprimer les taches selectionnées  ?")}}
                                    style={{marginRight:"10px"}}>
                                <span className="material-icons md-48" title="supprimer">delete</span>
                            </a>
                        </th>
                        <th>
                        <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                                //on rafraîchi la liste
                                getCommandes()
                                
                            }}></span>
                        </th>
                            
                        
                    </tr>
                    </thead>
                            <tbody>
                                {
                                    commandeList.map((commande) => ( 
                                        <tr className="list-item no-gutters" key={['id']} id={commande['id']} 
                                            onMouseOver={()=>{
                                                //on affiche le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(commande)).style.visibility = "visible"
                                                document.getElementById(getUpdateButtonId(commande)).style.visibility = "visible"
                                            }}
                                            onMouseOut={() =>{
                                                //on retire le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(commande)).style.visibility = "hidden"
                                                document.getElementById(getUpdateButtonId(commande)).style.visibility = "hidden"
                                            }}
                                         >
                    
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(commande)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-3 text">{commande['nom']}</td>
                                            <td className="col-3 text">{commande['description']}</td>
                                            <td className="col-2 text">{commande['dateDebut']}</td>
                                            <td className="col-2 text">{commande['dateFin']}</td>
                                            <td className="col-1 vertical-center">
                                                <a className="item-delete material-icons md-48 delete-icon" data-toggle="modal" data-target="#myModal"  id={getDeleteButtonId(commande)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(commande))
                            
                                                    setConfirmAlertMsg("Voulez-vous supprimer la commande " + commande['nom'] + " ?")
                                                
                                                    setSelectedItemId(commande['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(commande)}
                                                onClick={(event) =>{
                                                    setSpaceName('updateCommande')
                                                    
                                                    setItemToUpdate(commande)
                                                    event.preventDefault()
                                                }}>
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
   return (
    <div className="container"> 
            <div className="row">
                <div className="col"><h4 className="col-4" style={{marginTop:"1.5%",marginBottom:"1%"}}>Liste des Commandes</h4></div>
    
            </div>   
            {
                tableauCommandes()
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
                                           console.log(checkedItems)
                                           
                                               if(checkedItems.length > 0){
                                                   //on supprime les éléments sélectionnés
                                                   deleteItems(commandeList, 0)
                                               
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
);
}
export default ListCommande;