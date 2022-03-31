import './Menu.css'
import { API_URL } from '../Components/Signup';

function Menu({spaceName,setSpaceName,projetList,setProjetList,tacheList,setTacheList,materiauList,setMateriauList,materielList,setMaterielList,commandeList,setCommandeList}){  
    
    //variable contenant le token
    var token = localStorage.getItem("token")

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

    //fonction permettant de récupérer la liste des commandes
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

    
    return(
        <div className="col-4 menu"   style={{height:"104vh",width:"13vw"}}>
            <div className="row d-flex justify-content-center bouton" style={{marginTop:"35%"}} >
                 <button  onClick={(event) => {getProjets();  setSpaceName('listProjet')} } className="col-12 menu-button" style={{width:"14vw"}}>Projet</button>
            </div>

            <div className="row d-flex justify-content-center bouton">
                 <button onClick={(event) => { getTaches(); setSpaceName('listTache') }}  className="col-12 menu-button">Taches</button>
            </div>

            <div className="row d-flex justify-content-center bouton">
                <button onClick={(event) => { getStocks();setSpaceName('listMateriau') } } className="col-12 menu-button">Materiaux</button>
            </div>
            <div className="row d-flex justify-content-center bouton">
                <button onClick={(event) =>{ getMateriel(); setSpaceName('listMateriel') } } className="col-12 menu-button">Materiels</button>
            </div>
            <div className="row d-flex justify-content-center bouton">
                <button onClick={(event) => {getCommandes();setSpaceName('listCommande');getStocks()} } className="col-12 menu-button">Commandes</button>
            </div>
        </div> 
  );
}
export default Menu;