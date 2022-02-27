import { useState } from "react";
import CreateTache from "./CreateTache"
import ListTache from "./ListTache"
import UpdateTache from "./UpdateTache"

function Tache(){
    const[spaceTacheName,setSpaceTacheName]=useState('listTache')
    const [itemToUpdate,setItemToUpdate]= useState()
    //etat contenant la liste  des TACHES
    const [tacheList, setTacheList] = useState([])
    switch (spaceTacheName) {
        case 'createTache':
            return <CreateTache spaceTacheName= {spaceTacheName} setSpaceTacheName={setSpaceTacheName}/>
            break;
            case 'listTache':
                return <ListTache tacheList={ tacheList } setTacheList= { setTacheList } setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate }  spaceTacheName={ spaceTacheName } setSpaceTacheName={ setSpaceTacheName } />
                break;
                case 'updateTache':  
                return <UpdateTache tacheList={ tacheList } setTacheList= { setTacheList } itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} spaceTacheName={ spaceTacheName } setSpaceTacheName={ setSpaceTacheName }   />
        default:
            break;
    }

}

export default Tache;