import { API_URL } from '../authentification/Signup';
import {useState} from 'react'
import "./list.css"

function ListProjet({setSpaceName,spaceName,itemToUpdate,setItemToUpdate ,setItemData,itemData, projetList,setProjetList}){
    

    //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])
    
    //etat contenant le message à afficher dans l'alerte de confirmation
    const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
 
    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [item, setItem] = useState('')

    //variable contenant le token
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
        console.log('supromer')
        //on coche tous les checkboxs
        projetList.forEach(function(item){
            console.log(item)
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
    console.log('supprimer')
    if(checkedItemIndex < checkedItems.length){
        const itemId = checkedItems[checkedItemIndex]
        //création de la requête
        var requestURL = API_URL +"/Projets/" + itemId + "/"
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
                    setProjetList(itemsList)
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
    var requestURL = API_URL +"/Projets/" + itemId + "/"
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

    //fonction permettant de récupérer la liste des projets
    function getProjets(){
 
         //construction de la requete
        var requestUrl = API_URL +"/Projets"
        //création de la requête
        var request = new XMLHttpRequest();
        request.open('GET', requestUrl);
        token = localStorage.getItem("token")
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.responseType = 'json';
        request.send(); 
        request.onload = function(){
            
            setProjetList(request.response);
        }           
     }

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
                            <a id="delete"  data-toggle="modal" data-target="#myModal" style={{color:"black"}}  onClick={(event) => setConfirmAlertMsg('voulez vous supprimer les projets selectionnés?')}
                                    style={{marginRight:"10px"}} >
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
                                                    setSpaceName('detail')
                                                    
                                                }
                                               
                                            }} >
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(projet)} onClick={(event)=>handleCheckboxClick(event)}></input>
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
                                                    setSelectedItemId(projet['id'])
                                                    console.log(selectedItemId)
                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(projet))
                                                    //document.getElementById('id01').style.display='block'
                                                    setConfirmAlertMsg('voulez vous supprimer le projet :' + projet['nom'] + '?')
                                                
                                                    
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(projet)}
                                                onClick={(event) =>{
                                                    setSpaceName('updateProjet')
                                                    
                                                    setItemToUpdate(projet)
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
                <div className="col"><h4 className="col-4" style={{marginTop:"1.5%",marginBottom:"1%"}}>Liste des projets</h4></div>
                <div className="col"> <button className="btn btn-primary btn-block"   style={{marginTop:"1.5%",marginBottom:"1%"}}  onClick={(event) => setSpaceName('createProjet')}>Creer un projet</button></div>
            </div>   
            
            {
                tableauProjets()
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
);
}
export default ListProjet;