import { API_URL } from '../Components/Signup';
import {useState} from 'react'
import Header from './Header';
import ProjetHeader from './ProjetHeader';
import "./list.css"

function Commandes({setItemData, itemData , commandeList , setCommandeList,materiauList,setMateriauList,materielList, setMaterielList}){
    
    var token = localStorage.getItem("token")

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
    const [selectedItemId, setSelectedItemId] = useState('')
     //etat contenant le message à afficher dans l'alerte de confirmation
     const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
     //etat contenant la liste des éléments cochés de la liste
    const [checkedItems, setCheckedItems] = useState([])
    //etat contenant la liste des éléments cochés de la liste
    const [itemToUpdate, setItemToUpdate] = useState([])


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

    //fonction pour supprimer la liste des taches sélectionnées//

function deleteItems(itemsList, checkedItemIndex){
    if(checkedItemIndex < checkedItems.length){
        const itemId = checkedItems[checkedItemIndex]
        //création de la requête
        var requestURL = API_URL +"/Commandes/" + itemId + "/"
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
    var requestURL = API_URL +"/Commandes/" + itemId + "/"
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
            }

             //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
        getCommande()
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

   //fonctions de creation
   const updateCommande = (event) => {
    //récupération des valeurs du formulaire

    //récupération des valeurs du formulaire
    const description =  document.querySelector('#descriptioncommandeupdate').value 
    const stock =  document.querySelector('#stockupdate').value 
    const quantiteDemande = document.querySelector('#quantitedemandeupdate').value
    const quantiteRecue = document.querySelector('#quantiterecueupdate').value
    const prix = document.querySelector('#prixcommandeupdate').value
    const coutTransport = document.querySelector('#couttransportupdate').value
    const dateCommande = document.querySelector('#datecommandeupdate').value    
    const denomination = document.querySelector('#denominationcommandeupdate').value 
    const dateArrivee = document.querySelector('#datearriveeupdate').value    
    const duréeReapprovisionnement  = document.querySelector('#duréeReapprovisionnementupdate').value

    
    if(description === ""){
        alert('entrer la description')
    }
    if(denomination === ""){
        alert('entrer unité de la commande')
    }

    if(quantiteDemande === ""){
        alert('entrer la quantité demandée')
    }
    if(quantiteRecue === ""){
        alert('entrer la quantité recue')
    }
    if(stock === ""){
       
        alert('entrer le nom du stock')
    }
    if(coutTransport === ""){
        alert('entrer le cout de Transport')
    }
    if(dateCommande === ""){
        alert('entrer la date de commande')
    }
    if(duréeReapprovisionnement === ""){
        alert('entrer la durée de reapprovisionnement')
    }
    if(dateArrivee === ""){
        alert('entrer la date arrivée')
    }
    var commande = {description ,quantiteDemande,quantiteRecue , prix , coutTransport,  stock  , duréeReapprovisionnement , denomination,  dateCommande,dateArrivee}
    commande = JSON.stringify(commande)
    //création de la requête
    var requestURL = API_URL + "/Commandes/" + itemToUpdate['id'] + "/";
    var request = new XMLHttpRequest();
    request.open('PATCH', requestURL);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.setRequestHeader('Authorization' , 'Bearer ' + token);
    request.responseType = 'json';
    request.send(commande);
    console.log(request.status)
    console.log(commande);
    request.onload = function(){
        
        const requestStatus = request.status
        
        if(requestStatus === 403){
            
            alert('erreur au  niveau du serveur')
        

        }else if(requestStatus === 201){
            //requête réussie
            console.log('gooddd')
            alert('la commande a été modifiée')
           
        }
    }
    getCommande()
    event.preventDefault()
}

 //fonctions de creation
 function createCommande(event) {
    //récupération des valeurs du formulaire
    const description =  document.querySelector('#descriptioncommande').value 
    const stock =  document.querySelector('#stock').value 
    const quantiteDemande = document.querySelector('#quantitedemande').value
    const quantiteRecue = document.querySelector('#quantiterecue').value
    const prix = document.querySelector('#prixcommande').value
    const coutTransport = document.querySelector('#couttransport').value
    const dateCommande = document.querySelector('#datecommande').value    
    const denomination = document.querySelector('#denominationcommande').value 
    const dateArrivee = document.querySelector('#datearrivee').value    
    const duréeReapprovisionnement  = document.querySelector('#duréeReapprovisionnement').value

    
    if(description === ""){
        alert('entrer la description')
    }
    if(denomination === ""){
        alert('entrer unité de la commande')
    }

    if(quantiteDemande === ""){
        alert('entrer la quantité demandée')
    }
    if(quantiteRecue === ""){
        alert('entrer la quantité recue')
    }
    if(stock === ""){
       
        alert('entrer le nom du stock')
    }
    if(coutTransport === ""){
        alert('entrer le cout de Transport')
    }
    if(dateCommande === ""){
        alert('entrer la date de commande')
    }
    if(duréeReapprovisionnement === ""){
        alert('entrer la durée de reapprovisionnement')
    }
    if(dateArrivee === ""){
        alert('entrer la date arrivée')
    }
    var commande = {description ,quantiteDemande,quantiteRecue , prix , coutTransport,  stock  , duréeReapprovisionnement , denomination,  dateCommande,dateArrivee}
    commande = JSON.stringify(commande)
    //création de la requête
    var requestURL = API_URL + "/Commandes/";
    var request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.setRequestHeader('Authorization' , 'Bearer ' + token);
    request.responseType = 'json';
    request.send(commande);
    console.log(request.status)
    console.log(commande);
    request.onload = function(){
        
        const requestStatus = request.status
        
        if(requestStatus === 403){
            
            alert('erreur au  niveau du serveur')
        

        }else if(requestStatus === 201){
            //requête réussie
            console.log('gooddd')
            console.log(request.response)
            alert('la commande a été éffectuée')
           
        }
    }
    getCommande()
    event.preventDefault()
}


    //fonction permettant de récupérer la liste des commandes
    function getCommande(){
 
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
           console.log(request.response)
       }           
    }

// fonction qui affiche le nom dune commande

function getNomCommande(Id){
    const stockList = materiauList.concat(materielList)
    console.log(stockList)
    var stock = stockList.filter(item => item['id']===Id)
    stock = stock[0]
    console.log(stock['nom'])
    return stock['nom']
}

    function tableauCommandes(){
        
        return(
            <div>
              <h5 style={{textAlign:"center"}}>LISTE DES COMMANDES</h5>
              <table className="table table-hover">
                   <thead class="thead-dark">
                   <tr>
                       <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                           <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                       </th>
                       <th scope="col">Nom</th>
                       <th scope="col">prix</th>
                       <th scope="col">durée de réapprovisionnement</th>
                       <th scope="col">date de commande</th>
                       <th scope="col" >date d'arrivée</th>
                       <th className="hover-pointer" scope="col">
                           <a id="delete"  data-toggle="modal" data-target="#myModal" style={{marginRight:"10px"}}  onClick={(event) => setConfirmAlertMsg('voulez vous supprimer les projets selectionnés?')}
                                    >
                               <span className="material-icons md-48" title="supprimer">delete</span>
                           </a>
                       </th>
                       <th scope="col">
                       <span className="hover-pointer fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                               //on rafraîchi la liste
                               getCommande()
                           }}></span>
                       </th>
                           
                       
                   </tr>
                   </thead>
                           <tbody>
                               {
                                   commandeList.map((commande) => (
                                       <tr>
                                           <td>
                                               <span>
                                                   <input type="checkbox" onClick={(event) =>{handleCheckboxClick(event)}}></input>
                                               </span>
                                           </td>
                                           <td className="col-3 text">{getNomCommande(commande['stock'])}</td>
                                           <td className="col-2 text">{commande['prix']}</td>
                                           <td className="col-2 text">{commande['DureeReapprovisionnement']}</td>
                                           <td className="col-2 text">{commande['dateCommande']}</td>
                                           <td className="col-2 text">{commande['dateArrivee']}</td>
                                           <td className="col-1 vertical-center">
                                               <a  data-toggle="modal" data-target="#myModal"   title="supprimer" onClick={(event) =>{
                                                   setConfirmAlertMsg('voulez vous supprimer la commande ' + getNomCommande(commande['stock']) + '?' )
                                                   setCheckedItems([]) ; setSelectedItemId(commande['id'])}} style={{marginRight:"10px"}}>
                                                   <span className="material-icons md-48 delete-icon">delete</span>
                                               </a>
                                               <a data-toggle="modal" data-target="#updatecommande" onClick={(event) =>{ setItemToUpdate(commande); event.preventDefault()}}>
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
            <div>  <Header/> </div>   
            <div style={{marginTop:"1.5%"}} className="row"> 
                <div className="col" style={{marginRight:"25%" , marginLeft:"35%"}}>
                    <h3>{itemData['nom']}</h3>
                </div>
                <div className="col" >
                    <button data-toggle="modal" data-target="#creercommande" type="submit" className="btn btn-primary">NOUVELLE COMMANDE</button>
                </div>
            </div>
            <div> <ProjetHeader/> </div>
            <div className="container">
                {
                    tableauCommandes()
                }
            </div>
            {
               
               <div id="creercommande" className="modal fade" role="dialog">
                 <div class="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UNE COMMANDE</h2>
                     </div>
                     <div className="modal-body">
                        <form class="row g-3">
                            <h2 style={{textAlign:"center",marginTop:"1%"}}>COMMANDER</h2>
                            <div className="col-md-4">
                                <label>Stock</label>
                                <select id="stock" className="form-select select-input">
                                        {
                                            materielList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                                        }
                                        {
                                            materiauList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                                        }
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label for="descriptioncommande" className="form-label">description</label>
                                <input placeholder="entrer la description" type="text" class="form-control" id="descriptioncommande"  required />
                            </div>
                            <div className="col-md-6">
                                <label for="denominationcommande" class="form-label">denomination</label>
                                <input placeholder="entrer l'unite de la commande" type="text" className="form-control" id="denominationcommande" required />
                            </div>
                            <div className="col-md-6">
                                <label for="quantitedemande" className="form-label">Quantite demandée</label>
                                <input placeholder="entrer la quantite demandée" type="number" className="form-control" id="quantitedemande" required />
                            </div>
                            <div className="col-md-6">
                                <label for="quantiterecue" className="form-label">Quantite Recue</label>
                                <input placeholder="entrer la quantite recue" type="number" className="form-control" id="quantiterecue" required />
                            </div>
                            <div className="col-md-6">
                                <label for="couttransport" className="form-label">Cout de transport</label>
                                <input placeholder="entrer le cout du transport" type="number" className="form-control" id="couttransport" required />
                            </div>
                            <div className="col-md-6">
                                <label for="prixcommande" className="form-label">Prix</label>
                                <input placeholder="entrer le prix de la commande" type="number" className="form-control" id="prixcommande" required />
                            </div>
                            <div className="col-md-6">
                                <label for="duréeReapprovisionnement" className="form-label">durée de Reapprovisionnement</label>
                                <input placeholder="entrer la durée de réapprovisionnement" type="text" className="form-control" id="duréeReapprovisionnement" required />
                            </div>
                            <div className="col-md-6">
                                <label for="datecommande" className="form-label">date de la commande</label>
                                <input placeholder="entrer la date de commande" type="date" className="form-control" id="datecommande" required />
                            </div>
                            <div className="col-md-6">
                                <label for="datearrivee" className="form-label">date d'arrivée</label>
                                <input placeholder="entrer la date d'arrivée de la commande" type="date" className="form-control" id="datearrivee" required />
                            </div>
                        </form>  
                     </div>
                     <div className="modal-footer row">
                     <div className="col-12">
                        <button type="submit" className="btn btn-primary"   onClick={(event) => createCommande(event)}>Save</button>
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
               
               <div id="updatecommande" className="modal fade" role="dialog">
                 <div className="modal-dialog">
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h2 style={{textAlign:"center",marginTop:"1%"}}>Modifier la Commande {itemToUpdate['nom']}</h2>
                      
                     </div>
                     <div className="modal-body">
                     <form class="row g-3">
                        <h2 style={{textAlign:"center",marginTop:"1%"}}>COMMANDER</h2>
                        <div className="col-md-4">
                            <label>Stock</label>
                            <select id="stockupdate" className="form-select select-input">
                                    {
                                        materielList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                                    }
                                    {
                                        materiauList.map((stock) => <option value={stock['id']} key={stock['id']}>{stock['nom']}</option>)
                                    }
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label for="descriptioncommandeupdate" className="form-label">description</label>
                            <input placeholder="entrer la description" type="text" className="form-control" id="descriptioncommandeupdate"  required />
                        </div>
                        <div className="col-md-6">
                            <label for="denominationcommandeupdate" className="form-label">denomination</label>
                            <input placeholder="entrer l'unite de la commande" type="text" className="form-control" id="denominationcommandeupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="quantitedemandeupdate" className="form-label">Quantite demandée</label>
                            <input placeholder="entrer la quantite demandée" type="number" className="form-control" id="quantitedemandeupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="quantiterecueupdate" className="form-label">Quantite Recue</label>
                            <input placeholder="entrer la quantite recue" type="number" className="form-control" id="quantiterecueupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="couttransportupdate" className="form-label">Cout de transport</label>
                            <input placeholder="entrer le cout du transport" type="number" className="form-control" id="couttransportupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="prixcommandeupdate" className="form-label">Prix</label>
                            <input placeholder="entrer le prix de la commande" type="number" className="form-control" id="prixcommandeupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="duréeReapprovisionnementupdate" className="form-label">durée de Reapprovisionnement</label>
                            <input placeholder="entrer la durée de réapprovisionnement" type="text" className="form-control" id="duréeReapprovisionnementupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="datecommandeupdate" className="form-label">date de la commande</label>
                            <input placeholder="entrer la date de commande" type="date" className="form-control" id="datecommandeupdate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="datearriveeupdate" className="form-label">date d'arrivée</label>
                            <input placeholder="entrer la date d'arrivée de la commande" type="date" className="form-control" id="datearriveeupdate" required />
                        </div>
                    </form>
                      
                     </div>
                     <div className="modal-footer row">
                     <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={(event) => updateCommande(event)}>Save</button>
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
    )
}
export default Commandes;