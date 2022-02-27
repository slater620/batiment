import { Route, Switch, BrowserRouter} from "react-router-dom";
import Login from "./authentification/Login";
import Signup from "./authentification/Signup"
import Home from "./dashboard/Home";
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Home} />
          <Route path="/dashboard/Tache" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/dashboard/Stock" component={Home} />
          <Route  path="" component={Login} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;

