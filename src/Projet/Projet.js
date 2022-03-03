import { useState } from "react";
import CreateProjet from "./CreateProjet"
import ListProjet from "./ListProjet";
import UpdateProjet from "./UpdateProjet";
import TacheProjet from "./TacheProjet"
function Projet(){
    const[spaceName,setSpaceName]=useState('listProjet')
    const [itemToUpdate,setItemToUpdate]= useState()
    //etat contenant la liste  des projets
    const [projetList, setProjetList] = useState([])

    //etat contenant la liste  des taches
    const [tacheList, setTacheList] = useState([])

    //etat contenant l'ID de l'élément de la liste sélectionné pour une action
     const [itemProjet, setItemProjet] = useState('')
    switch (spaceName) {
        case 'createProjet':
            return <CreateProjet spaceName= {spaceName} setSpaceName={setSpaceName}/>
            break;
        case 'listProjet':
            return <ListProjet itemProjet={ itemProjet } setItemProjet={setItemProjet} setProjetList={ setProjetList } projetList={projetList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName} setSpaceName={setSpaceName} />
            break;
            case 'updateProjet':  
            return <UpdateProjet setProjetList={ setProjetList } projetList={projetList} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} spaceName= {spaceName} setSpaceName={setSpaceName}/>
        case 'tacheProjet':
            return <TacheProjet tacheList={ tacheList } setTacheList={setTacheList} itemProjet={ itemProjet } setItemProjet={setItemProjet}/>
            break;

        default:
            break;
    }

}

export default Projet;