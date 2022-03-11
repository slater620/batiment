import {useState} from 'react';
import ListProjet from './ListProjet'
import CreateProjet from './CreateProjet';
import UpdateProjet from './UpdateProjet';
import ListTache from './ListTache';
import CreateTache from './CreateTache';
import UpdateTache from './UpdateTache';
import ListMateriau from './ListMateriau';
import UpdateMateriau from './UpdateMateriau';
import CreateMateriau from './CreateMateriau';
import ListCommande from './ListCommande';
import ListMateriel from './ListMateriel'
import CreateMateriel from './CreateMateriel'
import UpdateMateriel from './UpdateMateriel';
import UpdateCommande from './UpdateCommande';
import TacheProjet from './TacheProjet'; 

function Workspace({spaceName,setSpaceName}){

    //etat contenant la liste  des projets
    const [projetList, setProjetList] = useState([])

    //etat contenant la liste  des taches
    const [tacheList, setTacheList] = useState([])

    
    //etat contenant la liste  des stocks
    const [materielList,setMaterielList]= useState([])
    const [materiauList, setMateriauList] = useState([])

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

        
        case 'listMateriau':
            return <ListMateriau  setMaterielList={ setMaterielList } materielList={ materielList} itemData={ itemData } setItemData={setItemData} setMateriauList={ setMateriauList } materiauList={ materiauList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;

        case 'createMateriau':
            return <CreateMateriau spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
            
        case 'updateMateriau':
            return <UpdateMateriau setMateriauList={ setMateriauList } materiauList={ materiauList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        
        case 'listMateriel':
            return <ListMateriel itemData={ itemData } setItemData={setItemData} setMaterielList={ setMaterielList } materielList={ materielList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
    
        case 'createMateriel':
            return <CreateMateriel spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
                
        case 'updateMateriel':
            return <UpdateMateriel setMaterielList={ setMaterielList } materielList={ materielList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;


        case 'listCommande':
            return <ListCommande itemData={ itemData } setItemData={setItemData}  setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;

        case 'updateCommande':
            return <UpdateCommande spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        
        default:
    }
}
export default Workspace;