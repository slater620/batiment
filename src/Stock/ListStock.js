import { API_URL } from '../authentification/Signup';
import {useState} from 'react'
import "../Projet/list.css"

function ListStock({setSpaceStockName,spaceStockName,update , setUpdate,itemToUpdate,setItemToUpdate , stockList,setStockList}){

    //etat contenant l'etat du modal
    const [isShowing, setIsShowing] = useState(false);

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
        stockList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = true
            tmpList.push(item['id'])
        })

    }else{
        //on vide la liste des éléments cochés
        setCheckedItems([])

        //on décoche tous les checkboxs
        stockList.forEach(function(item){
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

//fonction pour supprimer la liste des projets sélectionnées//
function deleteItems(itemsList, checkedItemIndex){
    if(checkedItemIndex < checkedItems.length){
        const itemId = checkedItems[checkedItemIndex]
        //création de la requête
        var requestURL = API_URL +"/Stocks/" + itemId + "/"
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
                    
                    setStockList(itemsList)
                    

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
    var requestURL = API_URL +"/Stocks/" + itemId + "/"
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
            const deletedItemIndex = stockList.findIndex(item => item['id'] === itemId);

            if(deletedItemIndex > -1){
                
                //on retire l'élément supprimé de la liste
                const itemsList = stockList.filter(function(value, index, arr){
                    return index !== deletedItemIndex
                })
                
                setStockList(itemsList)
            }

             //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
}


    //fonction permettant de récupérer la liste des projets
    function getStocks(){
 
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
            setStockList(request.response);
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
                            <a id="delete" style={{color:"black"}} onClick={() => {
                                document.getElementById('id01').style.display='block'}}
                                    style={{marginRight:"10px"}}>
                                <span className="material-icons md-48" title="supprimer">delete</span>
                            </a>
                        </th>
                        <th scope="col">
                        <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                                //on rafraîchi la liste
                                getStocks()
                                
                            }}></span>
                        </th>
                            
                        
                    </tr>
                    </thead>
                            <tbody>
                                {
                                    stockList.map((stock) => (
                                        <tr className="list-item no-gutters" key={stock['id']} id={stock['id']} 
                                            onMouseOver={()=>{
                                                //on affiche le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(stock)).style.visibility = "visible"
                                                document.getElementById(getUpdateButtonId(stock)).style.visibility = "visible"
                                            }}
                                            onMouseOut={() =>{
                                                //on retire le bouton de suppression de l'élément survolé
                                                document.getElementById(getDeleteButtonId(stock)).style.visibility = "hidden"
                                                document.getElementById(getUpdateButtonId(stock)).style.visibility = "hidden"
                                            }}
                                            onClick={(event)=>{
                                                const parentTagName = event.target.parentElement.tagName
    
                                                if(parentTagName === "TR" || parentTagName === "TD"){
                                                    setItem(stock)
                                                    
                                                }
                                               
                                            }} >
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(stock)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-3 text">{stock['nom']}</td>
                                            <td className="col-2 text">{stock['quantite']}</td>
                                            <td className="col-2 text">{stock['dateApprovisionnement']}</td>
                                            <td className="col-3 text">{stock['updatedAt']}</td>
                                            <td className="col-1 vertical-center">
                                                <a className="item-delete material-icons md-48 delete-icon" id={getDeleteButtonId(stock)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(stock))
                                                    document.getElementById('id01').style.display='block'
                                                    setConfirmAlertMsg("Voulez-vous supprimer le projet " + stock['nom'] + " ?")
                                                
                                                    setSelectedItemId(stock['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(stock)}
                                                onClick={(event) =>{
                                                    setSpaceStockName('updateStock')
                                                    
                                                    setItemToUpdate(stock)
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
                <div className="col"><h4 className="col-4" style={{marginTop:"1.5%",marginBottom:"1%"}}>Liste des Stocks</h4></div>
                <div className="col"> <button className="btn btn-primary btn-block"   style={{marginTop:"1.5%",marginBottom:"1%"}}  onClick={(event) => setSpaceStockName('createStock')}>Creer un Stock</button></div>
            </div>   
            
           
            {
                getStocks()
            }
            {
                tableauStocks()
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
                                    deleteItems(stockList, 0)
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
export default ListStock;