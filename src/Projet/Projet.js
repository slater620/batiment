import { useState } from "react";
import CreateProjet from "./CreateProjet"
import ListProjet from "./ListProjet";
import UpdateProjet from "./UpdateProjet";
function Projet(){
    const[spaceName,setSpaceName]=useState('listProjet')
    const [itemToUpdate,setItemToUpdate]= useState()
    //etat contenant la liste  des projets
    const [projetList, setProjetList] = useState([])
    switch (spaceName) {
        case 'createProjet':
            return <CreateProjet spaceName= {spaceName} setSpaceName={setSpaceName}/>
            break;
        case 'listProjet':
            return <ListProjet setProjetList={ setProjetList } projetList={projetList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
            case 'updateProjet':  
            return <UpdateProjet setProjetList={ setProjetList } projetList={projetList} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} spaceName= {spaceName} setSpaceName={setSpaceName}/>
        default:
            break;
    }

}

export default Projet;