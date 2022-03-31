import { API_URL } from '../Components/Signup';
import {useState} from 'react'
import Header from './Header';
import ProjetHeader from './ProjetHeader';
import "./list.css"

function Materiel({materielList, setMaterielList,itemData,setItemData}){

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
    const updateMateriel = (event) => {
        //récupération des valeurs du formulaire
        const nom = document.querySelector('#nommaterielupdate').value
        const denomination =  document.querySelector('#unitematerielupdate').value
        const quantite = document.querySelector('#quantitematerielupdate').value
        const prixUnitaire = document.querySelector('#prixmaterielupdate').value
        const dateApprovisionnement = document.querySelector('#datematerielupdate').value
        const type =  'materiel'     
        const projet = itemData['id']

        if(!connected){
            error = true
            
        }

        if(quantite === ""){
            error = true
            alert('entrer la quantite du materiel')
        }

        if(nom === ""){
            error = true
            alert('entrer le nom du materiel')
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
            alert('entrer unite du materiel')
        }
        var user = localStorage.getItem('user')
        var stock ={nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,projet,user}
        //construction de la requete
        var requestUrl = API_URL +"/Stocks/" + itemToUpdate['id'] + "/";
        var request = new XMLHttpRequest();
        var token = localStorage.getItem("token")
        request.open('PATCH', requestUrl);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(stock);
        console.log(request.status)
        console.log(stock);
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                server_error = true
            

            }
            else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                const index = materielList.findIndex(stock => stock['id'] === itemToUpdate['id'])
                alert('le materiau a bien été modifié')
            }
            
        }
        event.preventDefault();
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
        console.log('ree')
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


    //fonctions de creation d'un stock
    function createMateriel(event){
        const type =  "Materiel"
        //récupération des valeurs du formulaire
        
        const nom = document.querySelector('#nommateriel').value
        const denomination =  document.querySelector('#unitemateriel').value
        const quantite = document.querySelector('#quantitemateriel').value
        const prixUnitaire = document.querySelector('#prixmateriel').value
        const dateApprovisionnement = document.querySelector('#dateApprovisionnementmateriel').value     
        const projet = itemData['id']

        if(quantite === ""){
            error = true
            alert('entrer la quantite du materiel')
        }

        if(nom === ""){
            error = true
            alert('entrer le nom du materiel')
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
            alert('entrer unite du materiel')
        }
        

        var materiel = {nom ,denomination,quantite,prixUnitaire ,type, dateApprovisionnement,projet,user}
        materiel = JSON.stringify(materiel)
        //création de la requête
        var requestURL = API_URL + "/Stocks/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(materiel);
        console.log(request.status)
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                server_error = true
                alert('erreur au niveau du serveur... veuillez réessayer')
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                alert('le materiel a bien été crée')
            }
        }
        console.log('gooddd')
        event.preventDefault()
}


    function tableauMateriel(){
        
         return(
             <div>
                 <h5 style={{textAlign:"center"}}>LISTE DES MATERIELS</h5>
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
                                getMateriel()
                                
                            }}></span>
                        </th>
                            
                        
                    </tr>
                    </thead>
                            <tbody>
                                {
                                    materielList.map((materiel) => (
                                        <tr>
                                            
                                            <td>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(materiel)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-3 text">{materiel['nom']}</td>
                                            <td className="col-2 text">{materiel['quantite']}</td>
                                            <td className="col-2 text">{materiel['denomination']}</td>
                                            <td className="col-2 text">{materiel['dateApprovisionnement']}</td>
                                            <td className="col-3 text">{materiel['updatedAt']}</td>
                                            <td className="col-1 vertical-center">
                                                <a  data-toggle="modal" data-target="#myModal" id={getDeleteButtonId(materiel)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])
                                                    setConfirmAlertMsg("Voulez-vous supprimer le materiel " + materiel['nom'] + " ?")
                                                
                                                    setSelectedItemId(materiel['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" data-toggle="modal" data-target="#updatemateriel" id={getUpdateButtonId(materiel)} onClick={(event) =>{setItemToUpdate(materiel); event.preventDefault()}}>
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
    <div className="containe-fluid"> 
             <div>  <Header/> </div>   
            <div style={{marginTop:"1.5%"}} className="row"> 
                <div className="col" style={{marginRight:"25%" , marginLeft:"35%"}}>
                    <h3>{itemData['nom']}</h3>
                </div>
                <div className="col" >
                    <button data-toggle="modal" data-target="#creermateriel" type="submit" className="btn btn-primary">NOUVEAU MATERIEL</button>
                </div>
            </div>
            <div> <ProjetHeader/> </div>
            <div className="container">
                {
                    tableauMateriel()
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
           
           {
               
               <div id="creermateriel" className="modal fade" role="dialog">
                 <div class="modal-dialog">
               
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h4 style={{ textAlign:'center' }} className="modal-title">CREER UN MATERIEL </h4>
                     </div>
                     <div className="modal-body">
                     <form className="row g-3">
                        <div className="col-md-4">
                                <label >Nom</label>
                                <input type="text" className="form-control" id="nommateriel" placeholder="nom du materiel"/>
                        </div>
                        <div className="col-md-4">
                                <label >quantite</label>
                                <input type="number" id="quantitemateriel" className="form-control"  placeholder="quantite du materiel"/>
                        </div>
                        <div className="col-md-4">
                                <label >Unite</label>
                                <input type="text" id="unitemateriel" className="form-control"  placeholder="prix unitaire"/>
                        </div>
                        <div className="col-md-4">
                                <label >prix</label>
                                <input type="number" className="form-control" id="prixmateriel" placeholder="prix du materiel"/>
                        </div>

                        <div className="col-md-4"> 
                                <label>date d'approvisionnement</label>
                                <input type="date" className="form-control" id="dateApprovisionnementmateriel"/>
                        </div>
                    </form>
                      
                     </div>
                     <div className="modal-footer row">
                     <div className="col-12">
                                <button type="submit" className="btn btn-primary"  data-dismiss="modal" onClick={(event) => createMateriel(event)}>Save</button>
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
               
               <div id="updatemateriel" className="modal fade" role="dialog">
                 <div className="modal-dialog">
                   
                   <div className="modal-content">
                     <div className="modal-header">
                       <span style={{display:"none"}}>&times;</span>
                       <h2 style={{textAlign:"center",marginTop:"1%"}}>MODIFIER LE MATERIEL {itemToUpdate['nom']} </h2>
                     </div>
                     <div className="modal-body">
                        <form className="row g-3" >
                            <div className="col-md-4">
                                    <label >Nom</label>
                                    <input defaultValue={itemToUpdate['nom']} type="text" className="form-control" id="nommaterielupdate" name="name" placeholder="nom du materiel"/>
                            </div>
                            <div className="col-md-4">
                                <label >quantité</label>
                                <input type="number" defaultValue={itemToUpdate['quantite']}  id="quantitematerielupdate" className="form-control" name="quantity" placeholder="quantité de materiel"/>
                            </div>
                            <div className="col-md-4">
                                <label >Unite</label>
                                <input type="text" id="unitematerielupdate" className="form-control"  placeholder="prix unitaire"/>
                            </div>
                            <div className="col-md-4">
                                <label >prix</label>
                                <input  type="number" defaultValue={itemToUpdate['prix']} className="form-control" id="prixmaterielupdate" name="price" placeholder="price du matériel"/>
                            </div>
                            <div className="col-md-4"> 
                                <label> date d'approvisionnement</label>
                                <input  type="date" defaultValue={itemToUpdate['dateApprovisionnement']} className="form-control" id="datematerielupdate" name="date"/>
                            </div>    
                        </form>
                      
                     </div>
                     <div className="modal-footer row">
                        <div className="col-12">
                                <button type="submit"  className="btn btn-primary" data-dismiss="modal"  onClick={(event) => updateMateriel(event)}>Save</button>
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
export default Materiel;