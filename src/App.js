import { Route, Switch, BrowserRouter} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup"
import Projet from "./Components/Projet";
import ListProjet from "./Components/ListProjet";
import Materiaux from "./Components/Materiaux";
import Materiel from "./Components/Materiel";
import { useState } from "react";
import Commandes from "./Components/Commandes";

function App() {

  //etat contenant la liste  des projets
   const [projetList, setProjetList] = useState([])

   //etat contenant la liste  des taches
   const [tacheList, setTacheList] = useState([])

   //etat contenant la liste  des taches
   const [commandeList, setCommandeList] = useState([])


    //etat contenant la liste  des materiaux
    const [materiauList, setMateriauList] = useState([])

    //etat contenant la liste  des materiaux
    const [materielList, setMaterielList] = useState([])
  
   //etat contenant les items
   const [itemData, setItemData] = useState([])

  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
            <Route exact path="/dashboard">
              <ListProjet itemData={itemData} setItemData={setItemData} projetList = {projetList} setProjetList = {setProjetList} />
            </Route>
            <Route exact path="/dashboard/projet">
              <Projet tacheList={tacheList} setTacheList={setTacheList} itemData={itemData} setItemData={setItemData}/>
            </Route>
            <Route exact path="/dashboard/projet/materiaux">
              <Materiaux materiauList={materiauList} setMateriauList={setMateriauList} itemData={itemData} setItemData={setItemData}/>
            </Route>
            <Route exact path="/dashboard/projet/materiel">
              <Materiel materielList={materielList} setMaterielList={setMaterielList} itemData={itemData} setItemData={setItemData}/>
            </Route>
          <Route exact path="/dashboard/projet/commande">
              <Commandes commandeList={commandeList} setCommandeList={setCommandeList} materiauList={materiauList} setMateriauList={setMateriauList} materielList={materielList} setMaterielList={setMaterielList} itemData={itemData} setItemData={setItemData}/>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

