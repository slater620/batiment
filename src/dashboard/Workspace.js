import { Route, Switch, BrowserRouter} from "react-router-dom";
import Projet from "../Projet/Projet";
import Tache from "../Tache/Tache";
import Stock from "../Stock/Stock"
function Workspace(){
    return (
        <BrowserRouter>  
            <Switch>
            <Route exact path ="/dashboard" component={Projet} />
            <Route exact path ="/dashboard/Tache" component={Tache} />
            <Route exact path ="/dashboard/Stock" component={Stock} />
            </Switch>
            
        </BrowserRouter>
    );
}
export default Workspace;