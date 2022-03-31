import { API_URL } from '../Components/Signup';
import {useState} from 'react'
import Header from './Header';
import ProjetHeader from './ProjetHeader';
import "./list.css"

function Materiaux({setItemData,itemData, materiauList,setMateriauList}){

     //variable qui signale la présence d'une erreur dans le formulaire
     var error = false
    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])

      //etat contenant la liste des éléments cochés de la liste
      const [itemToUpdate, setItemToUpdate] = useState([])
    
    //etat contenant le message à afficher dans l'alerte de confirmation
    const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
 
    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [item, setItem] = useState('')

    var token = localStorage.getItem("token")
    var user = localStorage.getItem("user")

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
        materiauList.forEach(function(item){
            document.getElementById(getCheckboxId(item)).checked = true
            tmpList.push(item['id'])
        })

    }else{
        //on vide la liste des éléments cochés
        setCheckedItems([])

        //on décoche tous les checkboxs
        materiauList.forEach(function(item){
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
                    
                    setMateriauList(itemsList)                    
                    deleteItems(itemsList, checkedItemIndex + 1)
                }
            }
            


    }else{
        
        //on vide la liste des éléments sélectionnés
        setCheckedItems([])
    }
    getStocks()

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
        getStocks()
        console.log("supprimer un")
        createMotif()
     
             //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
        getStocks()
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
    
    //fonctions de creation d'un stock
    const updateMateriau = (event) => {
        //récupération des valeurs du formulaire
        const nom = document.querySelector('#nommateriauupdate').value
        const quantite = document.querySelector('#quantitemateriauupdate').value
        const denomination =  document.querySelector('#unitemateriauupdate').value
        const prixUnitaire = document.querySelector('#prixmateriauupdate').value
        const dateApprovisionnement = document.querySelector('#datemateriauupdate').value
        const type =  'Materiau'     

        if(quantite === ""){
            error = true
            alert('entrer la quantite du materiau')
        }

        if(nom === ""){
            error = true
            alert('entrer le nom du materiau')
        }
        
        if(dateApprovisionnement === ""){
            error = true
            alert('entrer la date approvisionnement')
        }
        
        if(prixUnitaire === ""){
            error = true
            alert('entrer le prix unitaire')
        }

        if(denomination === ""){
            error = true
            alert('entrer unite du materiau')
        }
        
        var user = localStorage.getItem("user")
        var materiau = {nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,user}
        materiau = JSON.stringify(materiau)
        //construction de la requete
        var requestUrl = API_URL +"/Stocks/" + itemToUpdate['id'] + "/";
        var request = new XMLHttpRequest();
        request.open('PATCH', requestUrl);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(materiau);
        console.log(request.status)
        console.log(materiau);
        request.onload = function(){
            
            const requestStatus = request.status
            console.log(requestStatus)
            
            if(requestStatus === 403){
                server_error = true
            

            }
            else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                const index = materiauList.findIndex(stock => stock['id'] === itemToUpdate['id'])
                alert('le materiau a été modifié')
            }
            
        }
        getStocks()
        event.preventDefault();
}

    //fonction permettant de récupérer la liste des stocks
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
        console.log('ree')
        request.send(); 
        request.onload = function(){
            if (request.status===500) {
                alert('erreur au niveau du serveur')
                
            }
            if (request.status===200) {
            var itemList= request.response
            itemList =  itemList.filter(item => item['type']==="Materiau")
            console.log(itemList)
            setMateriauList(itemList)
             
            }
           
 
        }           
     }


        //fonctions de creation d'un stock
        const createMateriaux = (event) => {
            console.log('ok')
            console.log(token)
            console.log(user)
            const type =  "Materiau"
            //récupération des valeurs du formulaire
            
            const nom = document.querySelector('#nommateriau').value
            const quantite = document.querySelector('#quantitemateriau').value
            const denomination =  document.querySelector('#unitemateriau').value
            const prixUnitaire = document.querySelector('#prixmateriau').value
            const dateApprovisionnement = document.querySelector('#dateApprovisionnement').value     
            const projet = itemData['id']
            if(quantite === ""){
                error = true
                alert('entrer la quantite du materiau')
            }
    
            if(nom === ""){
                error = true
                alert('entrer le nom du materiau')
            }
            
            if(dateApprovisionnement === ""){
                error = true
                alert('entrer la date approvisionnement')
            }
            
            if(prixUnitaire === ""){
                error = true
                alert('entrer le prix unitaire')
            }
    
            if(denomination === ""){
                error = true
                alert('entrer unite du materiau')
            }
            
            var materiau = {nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,projet,user}
            materiau = JSON.stringify(materiau)
            //création de la requête
            var requestURL = API_URL + "/Stocks/";
            var request = new XMLHttpRequest();
            request.open('POST', requestURL);
            request.setRequestHeader('Content-Type' , 'application/json');
            request.setRequestHeader('Authorization' , 'Bearer ' + token);
            request.responseType = 'json';
            request.send(materiau);
            console.log(request.status)
            console.log(materiau);
            request.onload = function(){
                
                const requestStatus = request.status
                
                if(requestStatus === 403){
                    server_error = true
                    alert('erreur au niveau du serveur... veuillez réessayer')
                
    
                }else if(requestStatus === 201){
                    //requête réussie
                    console.log('gooddd')
                    alert('le materiau a bien été crée')
                }
            }
            console.log('gooddd')
            getStocks()
            event.preventDefault()
    }

    function tableauMateriau(){
        
         return(
             <div>
                 <h5 style={{textAlign:"center"}}>LISTE DES MATERIAUX</h5>
               <table className="table table-hover">
                    <thead class="thead-dark">
                    <tr>
                        <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                            <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                        </th>
                        <th scope="col">Nom</th>
                        <th scope="col">quantite</th>
                        <th scope="col">Unite</th>
                        <th scope="col" >date d'approvisionnement</th>
                        <th scope="col">date de modification</th>
                        <th className="hover-pointer" scope="col">
                            <a id="delete" data-toggle="modal" data-target="#myModal"  onClick={(event) => setConfirmAlertMsg('voulez vous supprimer les materiaux selectionnés?')}
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
                                    materiauList.map((materiau) => (
                                        <tr>
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(materiau)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-3 text">{materiau['nom']}</td>
                                            <td className="col-2 text">{materiau['quantite']}</td>
                                            <td className="col-2 text">{materiau['denomination']}</td>
                                            <td className="col-2 text">{materiau['dateApprovisionnement']}</td>
                                            <td className="col-3 text">{materiau['updatedAt']}</td>
                                            <td className="col-1 vertical-center">
                                                <a   data-toggle="modal" data-target="#myModal" id={getDeleteButtonId(materiau)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])
                                                    setConfirmAlertMsg("Voulez-vous supprimer le materiau " + materiau['nom'] + " ?")
                                                
                                                    setSelectedItemId(materiau['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" data-toggle="modal" data-target="#updatemateriau" id={getUpdateButtonId(materiau)} onClick={(event) =>{setItemToUpdate(materiau); event.preventDefault()}}>
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
    <div className="container-fluid"> 
             <div>  <Header/> </div>   
            <div style={{marginTop:"1.5%"}} className="row"> 
                <div className="col" style={{marginRight:"25%" , marginLeft:"35%"}}>
                    <h3>{itemData['nom']}</h3>
                </div>
                <div className="col" >
                    <button data-toggle="modal" data-target="#creermateriau" type="submit" className="btn btn-primary">NOUVEAU MATERIAU</button>
                </div>
            </div>
            <div> <ProjetHeader/> </div>
            <div className="container">
                {
                    tableauMateriau()
                }
            </div>
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
                                        <input type="text" id="motifmateriau" className="form-control" placeholder="pourquoi souhaiter vous supprimer ce materiau?"/>
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
                                                   deleteItems(materiauList, 0)
                                               
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
               
               <div id="creermateriau" className="modal fade" role="dialog">
                 <div class="modal-dialog">
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h4 style={{ textAlign:'center' }} className="modal-title">CREER UN MATERIAU </h4>
                     </div>
                     <div className="modal-body">
                        <form className="row g-3">
                            <div className="col-md-4">
                                <label >Nom</label>
                                <input type="text" className="form-control" id="nommateriau" placeholder="nom du materiau"/>
                            </div>
                            <div className="col-md-4">
                                    <label >quantite</label>
                                    <input type="number" id="quantitemateriau" className="form-control"  placeholder="quantite de materiau"/>
                            </div>
                            <div className="col-md-4">
                                    <label >Unite</label>
                                    <input type="text" id="unitemateriau" className="form-control"  placeholder="prix unitaire"/>
                            </div>
                            <div className="col-md-4">
                                    <label >prix</label>
                                    <input type="number" className="form-control" id="prixmateriau"  placeholder="prix du materiau"/>
                            </div>

                            <div className="col-md-4"> 
                                    <label>date d'approvisionnement</label>
                                    <input type="date" className="form-control" id="dateApprovisionnement"/>
                            </div>
                           
                
                        </form>
                      
                     </div>
                     <div className="modal-footer row">
                     <div className="col-12">
                                <button type="submit" className="btn btn-primary"  data-dismiss="modal" onClick={(event) => createMateriaux(event)}>Save</button>
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
               <div id="updatemateriau" className="modal fade" role="dialog">
                 <div className="modal-dialog">
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h2 style={{textAlign:"center",marginTop:"1%"}}>MODIFIER LE MATERIAU {itemToUpdate['nom']} </h2> 
                     </div>
                     <div className="modal-body">
                        <form  className="row g-3" >
                            <div className="col-md-4">
                                    <label >Nom</label>
                                    <input type="text" defaultValue={itemToUpdate['nom']} className="form-control" id="nommateriauupdate"  placeholder="nom du materiau"/>
                            </div>
                            <div className="col-md-4">
                                <label >quantite</label>
                                <input type="number" id="quantitemateriauupdate" className="form-control" placeholder="quantité du materiau"/>
                                
                            </div>
                            <div className="col-md-4">
                                <label >Unite</label>
                                <input type="text" id="unitemateriauupdate" className="form-control"  placeholder="prix unitaire"/>
                            </div>
                            <div className="col-md-4">
                                <label >prix</label>
                                <input  type="number" className="form-control" id="prixmateriauupdate" placeholder="prix du materiau"/>
                                
                            </div>
                            <div className="col-md-4"> 
                                <label>date d'approvisionnement</label>
                                <input  type="date" className="form-control" id="datemateriauupdate" placeholder="date d'approvisionnement"/>
                            </div>
                              
                        </form>
                      
                     </div>
                     <div className="modal-footer row">
                        <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={(event) => updateMateriau(event)}>Save</button>
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
export default Materiaux;