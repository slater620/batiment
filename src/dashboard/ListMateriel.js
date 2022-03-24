import { API_URL } from '../authentification/Signup';
import {useState} from 'react'
import "./list.css"

function ListMateriel({setSpaceName,spaceName,itemToUpdate,setItemToUpdate ,setItemData,itemData, materielList,setMaterielList}){

     //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

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

//fonction permettant de construire l'id du bouton de commande d'un élément//
function getCommandeButtonId(item){
    return 'commandeButton_' + item['id']
}



//fonction permettant de sélectionner tous les éléments de la liste
function selectAll(){
    const checked = document.getElementById('selectAll').checked
    
    if(checked){
        const tmpList = []

        //on coche tous les checkboxs
        materielList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = true
            tmpList.push(item['id'])
        })

    }else{
        //on vide la liste des éléments cochés
        setCheckedItems([])

        //on décoche tous les checkboxs
        materielList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = false
        })
    }
    console.log(checkedItems)
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

//fonction pour supprimer la liste des materiaux sélectionnées//
function deleteItems(itemsList, checkedItemIndex){
    if(checkedItemIndex < checkedItems.length){
        const itemId = checkedItems[checkedItemIndex]
        const  quantite = document.querySelector('#quantitesupprimer').value 
        //création de la requête
        var requestURL = API_URL +"/Stocks/" + itemId + "/"+ quantite + "/"
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
        
                    
                    setMaterielList(itemsList)
                   
                    

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
    const  quantite = document.querySelector('#quantitesupprimer').value 
    //création de la requête
    var requestURL = API_URL +"/Stocks/" + itemId + "/"+ quantite + "/"
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
        createMotif(itemId)
             //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
    getMateriel()
}

//fonction permettant de creer un motif  ayant son id//
function createMotif(itemId){
    const  motif = document.querySelector('#motifmateriel').value 
    //création de la requête
    const motif_suppression = {motif , itemId}
    motif_suppression = JSON.stringify(motif_suppression)
    var requestURL = API_URL +"/Motifs/"
    var request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.setRequestHeader('Authorization' , 'Bearer ' + token);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.responseType = 'json';
    request.send(motif_suppression);
    request.onload = function(){
        const requestStatus = request.status
        
        if(requestStatus === 403){
            server_error = true
          

        }else if(requestStatus === 201){
            console.log('good')
        }
    }
}

    //fonction permettant de récupérer la liste des stocks
    function getMateriel(){
 
         //construction de la requete
        var requestUrl = API_URL +"/Stocks"
        //création de la requête
        var request = new XMLHttpRequest();
        request.open('GET', requestUrl);
        token = localStorage.getItem("token")
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send(); 
        request.onload = function(){
            if (request.status===500) {
                alert('erreur au niveau du serveur')
                
            }
            if (request.status===200) {
            var itemList= request.response
            itemList =  itemList.filter(item => item['type']==="Materiel")
            console.log(itemList)
            setMaterielList(itemList)
             
            }
        }           
     }

    function tableauStocks(){
        
         return(
             <div>
               <table className="table">
                    <thead class="thead-dark">
                    <tr>
                        <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                            <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                        </th>
                        <th scope="col">Nom</th>
                        <th scope="col">quantite</th>
                        <th scope="col" >date d'approvisionnement</th>
                        <th scope="col">date de modification</th>
                        <th className="hover-pointer" scope="col">
                            <a id="delete" style={{marginRight:"10px"}} data-toggle="modal" data-target="#myModal"   onClick={(event) => setConfirmAlertMsg('voulez vous supprimer les materiaux selectionnés?')}
                                    >
                                <span className="material-icons md-48" title="supprimer">delete</span>
                            </a>
                        </th>
                        <th scope="col">
                        <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                                //on rafraîchi la liste
                                getMateriel()
                                
                            }}></span>
                        </th>
                            
                        
                    </tr>
                    </thead>
                            <tbody>
                                {
                                    materielList.map((materiel) => (
                                        <tr className="list-item no-gutters" key={materiel['id']} id={materiel['id']} 
                                            onMouseOver={()=>{
                                                //on affiche le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(materiel)).style.visibility = "visible"
                                                document.getElementById(getUpdateButtonId(materiel)).style.visibility = "visible"
                                            
                                            }}
                                            onMouseOut={() =>{
                                                //on retire le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(materiel)).style.visibility = "hidden"
                                                document.getElementById(getUpdateButtonId(materiel)).style.visibility = "hidden"
                                               
                                            }}
                                             >
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(materiel)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-3 text">{materiel['nom']}</td>
                                            <td className="col-2 text">{materiel['quantite']}</td>
                                            <td className="col-2 text">{materiel['dateApprovisionnement']}</td>
                                            <td className="col-3 text">{materiel['updatedAt']}</td>
                                            <td className="col-1 vertical-center">
                                                <a className="item-delete material-icons md-48 delete-icon"  data-toggle="modal" data-target="#myModal" id={getDeleteButtonId(materiel)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(materiel))
                                                   
                                                    setConfirmAlertMsg("Voulez-vous supprimer le materiel " + materiel['nom'] + " ?")
                                                
                                                    setSelectedItemId(materiel['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(materiel)}
                                                onClick={(event) =>{
                                                    setSpaceName('updateMateriel')
                                                    
                                                    setItemToUpdate(materiel)
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
                <div className="col"><h4 className="col-4" style={{marginTop:"1.5%",marginBottom:"1%"}}>Liste des Materiels</h4></div>
                <div className="col"> <button className="btn btn-primary btn-block"   style={{marginTop:"1.5%",marginBottom:"1%"}}  onClick={(event) => setSpaceName('createMateriel')}>Creer un Materiel</button></div>
            </div>   
            {
                tableauStocks()
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
                       <form >
                            <div className="row form-group">
                                    <div className="col-25">
                                        <label >quantité</label>
                                    </div>
                                    <div className="col-75">
                                        <input type="number" id="quantitesupprimer" className="form-control" placeholder="quantité a suprimmer"/>
                                    </div>
                            </div>
                            <div className="row form-group">
                                    <div className="col-25">
                                        <label >motif</label>
                                    </div>
                                    <div className="col-75">
                                        <input type="text" id="motifmateriel" className="form-control" placeholder="pourquoi souhaiter vous supprimer ce materiel?"/>
                                    </div>
                            </div>
                       </form>
                     </div>
                     <div className="modal-footer row">
                       <div className='col'>
                           <button type="button" data-dismiss="modal" className="deletebtn" onClick={() => {
                                           console.log(checkedItems)
                                           
                                               if(checkedItems.length > 0){
                                                   //on supprime les éléments sélectionnés
                                                   deleteItems(materielList, 0)
                                               
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
export default ListMateriel;