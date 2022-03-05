import {useState} from 'react';
import ListProjet from './ListProjet'
import CreateProjet from './CreateProjet';
import UpdateProjet from './UpdateProjet';
import ListTache from './ListTache';
import CreateTache from './CreateTache';
import UpdateTache from './UpdateTache';
import ListStock from './ListStock';
import UpdateStock from './UpdateStock';
import CreateStock from './CreateStocks';
import ListCommande from './ListCommande';
import CreateCommande from './CreateCommande';
import UpdateCommande from './UpdateCommande';
import TacheProjet from './TacheProjet'; 

function Workspace({spaceName,setSpaceName}){

    

    //etat contenant la liste  des projets
    const [projetList, setProjetList] = useState([])

    //etat contenant la liste  des taches
    const [tacheList, setTacheList] = useState([])

    
    //etat contenant la liste  des stocks
    const [stockList, setStockList] = useState([])

    //etat contenant un item precis
    const [itemData, setItemData] = useState('')

    //etat contenant un item pour la modification
    const [itemToUpdate,setItemToUpdate]= useState()

    switch (spaceName) {

        case 'listProjet':
            return <ListProjet itemData={ itemData } setItemData={setItemData} projetList ={projetList} setProjetList={setProjetList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'createProjet':
            return <CreateProjet spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'updateProjet':
            return <UpdateProjet projetList ={projetList} setProjetList={setProjetList}  setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'detail':
            return <TacheProjet setTacheList={ setTacheList } tacheList={tacheList} itemData={ itemData } setItemData={setItemData} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;

 
        case 'listTache':
            return <ListTache itemData={ itemData } setItemData={setItemData} setTacheList={ setTacheList } tacheList={tacheList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'createTache':
            return <CreateTache projetList={projetList} setProjetList={setProjetList} spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'updateTache':
            return <UpdateTache  projetList ={projetList} setProjetList={setProjetList} setTacheList={ setTacheList } tacheList={tacheList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
                break;

        
        case 'listStock':
            return <ListStock itemData={ itemData } setItemData={setItemData} setStockList={ setStockList } stockList={stockList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;

        case 'createStock':
            return <CreateStock spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
            
        case 'updateStock':
            return <UpdateStock  setStockList={ setStockList } stockList={stockList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;


        case 'listCommande':
            return <ListCommande itemData={ itemData } setItemData={setItemData}  setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'createCommande':
            return <CreateCommande spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'updateCommande':
            return <UpdateCommande spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        default:
            break;
    }
}
export default Workspace;