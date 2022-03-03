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


function Workspace({spaceName,setSpaceName}){

    

    //etat contenant la liste  des données
    const [dataList, setDataList] = useState([])

    //etat contenant un item precis
    const [itemData, setItemData] = useState('')

    //etat contenant un item pour la modification
    const [itemToUpdate,setItemToUpdate]= useState()

    switch (spaceName) {

        case 'listProjet':
            return <ListProjet itemData={ itemData } setItemData={setItemData} setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'createProjet':
            return <CreateProjet spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'updateProjet':
            return <UpdateProjet  setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;


        case 'listTache':
            return <ListTache itemData={ itemData } setItemData={setItemData} setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'createTache':
            return <CreateTache spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
        case 'updateTache':
            return <UpdateTache  setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
                break;

        
        case 'listStock':
            return <ListStock itemData={ itemData } setItemData={setItemData} setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;

        case 'createStock':
            return <CreateStock spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
            
        case 'updateStock':
            return <UpdateStock  setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;


        case 'listCommande':
            return <ListCommande itemData={ itemData } setItemData={setItemData} setDataList={ setDataList } dataList={dataList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
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