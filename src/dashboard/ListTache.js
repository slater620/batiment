import { API_URL } from '../Components/Signup'
import {useState} from 'react'
//import "./list.css"

function ListTache({materiauList,setMateriauList,materielList,setMaterielList,setSpaceName,spaceName,itemToUpdate,setItemToUpdate ,setItemData,itemData, tacheList,setTacheList}){


    //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])

    //etat contenant le stock
    const [stockList, setStockList]= useState([])
     
    //etat contenant le message à afficher dans l'alerte de confirmation
    const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
 
    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [item, setItem] = useState('')

    var token = localStorage.getItem("token")
    
    //fonctions d'allocation
    const Allouer = (event) => {
    //récupération des valeurs du formulaire
    const quantite = document.querySelector('#quantiteallouer').value
    const  stock = document.querySelector('#stockallouer').value
    const tache = itemData['id']
    if(quantite === ""){
        var error = true
        alert('erreur au niveau du formulaire')
    }

    if(stock === ""){
        var error = true
        alert('erreur au niveau du formulaire')
    }
    var allouer = {quantite,tache, stock}
    allouer = JSON.stringify((allouer))

    //création de la requête
    var requestURL = API_URL + "/Allocations/";
    var request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.setRequestHeader('Authorization' , 'Bearer ' + token);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.responseType = 'json';
    request.send(allouer);
    console.log(allouer)
    console.log(request.status)
    console.log('avance')
    request.onload = function(){
        const requestStatus = request.status
        
        if(requestStatus === 403){
            var server_error = true
          

        }else if(requestStatus === 201){
            console.log('good')
            alert('success')
        }
        else if(requestStatus === 200){
                alert('success')
        }
    }
    event.preventDefault()

}

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
    function getTaches(){
 
         //construction de la requete
        var requestUrl = API_URL +"/Taches"
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
                            <a id="delete" data-toggle="modal" data-target="#myModal"  onClick={() => {  setConfirmAlertMsg("Voulez-vous supprimer les taches selectionnées  ?")}}
                                    style={{marginRight:"10px"}}>
                                <span className="material-icons md-48" title="supprimer">delete</span>
                            </a>
                        </th>
                        <th>
                        <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                                //on rafraîchi la liste
                                getTaches()
                                
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
                                                document.getElementById('buttonallouer').style.visibility = "visible"
                                            }}
                                            onMouseOut={() =>{
                                                //on retire le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(tache)).style.visibility = "hidden"
                                                document.getElementById(getUpdateButtonId(tache)).style.visibility = "hidden"
                                                document.getElementById('buttonallouer').style.visibility = "hidden"
                                            }}>
                    
                                            
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
                                                <a className="item-delete material-icons md-48 delete-icon" data-toggle="modal" data-target="#myModal"  id={getDeleteButtonId(tache)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(tache))
                            
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
                                                <button  data-toggle="modal" data-target="#allouer" onClick={(event) =>{ setItemData(tache) ; event.preventDefault()}}>
                                                    Allouer un stock
                                                </button>
                                                
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
                <div className="col"><h4 className="col-4" style={{marginTop:"1.5%",marginBottom:"1%"}}>Liste des Taches</h4></div>
                <div className="col"> <button className="btn btn-primary btn-block"   style={{marginTop:"1.5%",marginBottom:"1%"}}  onClick={(event) => setSpaceName('createTache')}>Creer une Tache</button></div>
            </div>   
            {
                tableauTaches()
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
           {
               
               <div id="allouer" className="modal fade" role="dialog">
                 <div className="modal-dialog">
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h4 style={{ marginLeft:'40%' }} className="modal-title">Allocation </h4>
                     </div>
                       
                            <form >
                                <div className="modal-body">
                                    <div className="row form-group">
                                        <div className="col-25">
                                            <label >quantité</label>
                                        </div>
                                        <div className="col-75">
                                            <input type="number" id="quantiteallouer" className="form-control" placeholder="quantité a allouer"/>
                                        </div>
                                    </div>
                                    <div className="row form-group"> 
                                        <div className="col-25">
                                            <label for="stockallouer">stock</label>
                                        </div>
                                        <div class="col-75">
                                            <select id="stockallouer" className="form-control select-input">
                                                {
                                                    materiauList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                                                }
                                                 {
                                                    materielList.map((materiel) => <option value={materiel['id']} key={materiel['id']}>{materiel['nom']}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer row">
                                    <div className='col'>
                                        <button type="submit" data-dismiss="modal" className="deletebtn" onClick={(event) => {Allouer(event)}}>ALLOUER</button>
                                    </div>
                                    <div className='col'>
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </form>
                     
                   </div>
               
                 </div>
               </div>
            }
                     
    </div>
);
}
export default ListTache;