import { API_URL } from '../authentification/Signup'
import {useState} from 'react'
import "./list.css"

function TacheProjet({setSpaceName,spaceName,itemToUpdate,setItemToUpdate ,setItemData,itemData, tacheList,setTacheList}){


    //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])

     
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
        tacheList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = true
            tmpList.push(item['id'])
        })

    }else{
        //on vide la liste des éléments cochés
        setCheckedItems([])

        //on décoche tous les checkboxs
        tacheList.forEach(function(item){
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
}


    //fonction permettant de récupérer la liste des taches
    function getTaches(itemId){
 
         //construction de la requete
        var requestUrl = API_URL +"/Taches/projet/" + itemId + "/"
        //création de la requête
        var request = new XMLHttpRequest();
        request.open('GET', requestUrl);
        token = localStorage.getItem("token")
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send(); 
        request.onload = function(){
            setTacheList(request.response);
        }  
                 
     } 

    function tableauTaches(){
        
         return(
             <div>
               <table className="table">
                    <thead class="thead-dark">
                    <tr>
                        <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                            <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                        </th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Debut</th>
                        <th>Fin</th>
                        <th className="hover-pointer">
                            <a id="delete" style={{color:"black"}} onClick={() => {
                                document.getElementById('id01').style.display='block'}}
                                    style={{marginRight:"10px"}}>
                                <span className="material-icons md-48" title="supprimer">delete</span>
                            </a>
                        </th>
                        <th>
                        <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                                //on rafraîchi la liste
                                getTaches(itemData['id'])
                                
                            }}></span>
                        </th>
                            
                        
                    </tr>
                    </thead>
                            <tbody>
                                {
                                    tacheList.map((tache) => ( 
                                        <tr className="list-item no-gutters" key={tache['id']} id={tache['id']} 
                                            onMouseOver={()=>{
                                                //on affiche le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(tache)).style.visibility = "visible"
                                                document.getElementById(getUpdateButtonId(tache)).style.visibility = "visible"
                                            }}
                                            onMouseOut={() =>{
                                                //on retire le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(tache)).style.visibility = "hidden"
                                                document.getElementById(getUpdateButtonId(tache)).style.visibility = "hidden"
                                            }}
                                            onClick={(event)=>{
                                                const parentTagName = event.target.parentElement.tagName
    
                                                if(parentTagName === "TR" || parentTagName === "TD"){
                                                    setItem(tache)
                                                    
                                                }
                                               
                                            }} >
                    
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(tache)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-3 text">{tache['nom']}</td>
                                            <td className="col-3 text">{tache['description']}</td>
                                            <td className="col-2 text">{tache['dateDebut']}</td>
                                            <td className="col-2 text">{tache['dateFin']}</td>
                                            <td className="col-1 vertical-center">
                                                <a className="item-delete material-icons md-48 delete-icon" id={getDeleteButtonId(tache)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(tache))
                                                    document.getElementById('id01').style.display='block'
                                                    setConfirmAlertMsg("Voulez-vous supprimer la tache " + tache['nom'] + " ?")
                                                
                                                    setSelectedItemId(tache['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(tache)}
                                                onClick={(event) =>{
                                                    setSpaceName('updateTache')
                                                    
                                                    setItemToUpdate(tache)
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
                <h2> Liste des Taches de {itemData['nom']}</h2>
               
            </div>   
        
            {
                tableauTaches()
            }
            {
            <div id="id01" className="modal">
                <span onClick={() => {document.getElementById('id01').style.display='none'}} className="close" title="Close Modal">&times;</span>
                <form className="modal-content" >
                  <div className="container">
                    <h1>Delete </h1>
                    <p>Are you sure you want to delete?</p>
              
                    <div className="clearfix">
                      <button type="button" onClick={() => {document.getElementById('id01').style.display='none'}} className="cancelbtn">Cancel</button>
                      <button type="button" className="deletebtn" onClick={() => {

                                if(checkedItems.length > 0){
                                    //on supprime les éléments sélectionnés
                                    deleteItems(tacheList, 0)
                                    document.getElementById('id01').style.display='none'
                                }
                                else{
                                    //on supprime l'élément sélectionné
                                    deleteItem(selectedItemId)
                                    document.getElementById('id01').style.display='none'
                                }
                                
                            }}>Delete</button>
                    </div>
                  </div>
                </form>
            </div>
            }
                     
    </div>
);
}
export default TacheProjet;