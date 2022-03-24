import Header from "./Header";
import Menu from "./Menu";
import Workspace from "./Workspace";
import { useState } from "react";

function Home(){

    //etat de la zone de travail
    const[spaceName,setSpaceName]=useState('listProjet')
     //etat contenant la liste  des projets
     const [projetList, setProjetList] = useState([])

     //etat contenant la liste  des taches
     const [tacheList, setTacheList] = useState([])
 
     
     //etat contenant la liste  des stocks
     const [materielList,setMaterielList]= useState([])
     const [materiauList, setMateriauList] = useState([])
 
     //etat contenant la liste  des scommandes
     const [commandeList,setCommandeList]= useState([])
 
     //etat contenant un item precis
     const [itemData, setItemData] = useState('')
 
     //etat contenant un item pour la modification
     const [itemToUpdate,setItemToUpdate]= useState()

            return(
                <div  style={{height:"100vh",width:"100vw"}}>
                    <div style={{width:"100%",height:"42%"}}>
                        <Header/>
                        <div className="row flex-grow-1">
                            <Menu setTacheList={ setTacheList } commandeList={commandeList} setCommandeList={ setCommandeList } projetList ={projetList} setProjetList={setProjetList} setMateriauList={ setMateriauList } materiauList={ materiauList}  setMaterielList={ setMaterielList } materielList={ materielList}  spaceName= {spaceName} setSpaceName={setSpaceName} />
                            <div className="col container workspace-div">
                                <Workspace  setTacheList={ setTacheList } tacheList={tacheList}  commandeList={commandeList} setCommandeList={ setCommandeList } setMateriauList={ setMateriauList } materiauList={ materiauList} setMaterielList={ setMaterielList } materielList={ materielList} itemData={ itemData } setItemData={setItemData} projetList ={projetList} setProjetList={setProjetList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceName= {spaceName}  setSpaceName={setSpaceName} />
                            </div>
                        </div>
        
                    </div>
        
                </div>
            )
    }
export default Home;