import { Route, Switch, BrowserRouter} from "react-router-dom";
import Login from "./authentification/Login";
import Signup from "./authentification/Signup"
import Home from "./dashboard/Home";
function App() {
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
           <Home/>
         </Route>
          <Route path="/dashboard/Stock" component={Home} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;

