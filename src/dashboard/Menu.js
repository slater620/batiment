import './Menu.css'
import { Link } from 'react-router-dom';
function Menu(){    
    
    return(
        <div className="col-2 menu"   style={{height:"120vh",width:"12vw"}}>
            <div className="row d-flex justify-content-center bouton" style={{marginTop:"45%"}} >
                 <Link to="/dashboard" className="col-12 menu-button" style={{width:"14vw"}}>Projet</Link>
            </div>

            <div className="row d-flex justify-content-center bouton">
                 <Link to="/dashboard/Tache/"  className="col-12 menu-button">Taches</Link>
            </div>

            <div className="row d-flex justify-content-center bouton">
                <Link to="/dashboard/Stock" className="col-12 menu-button">Stocks</Link>
            </div>
            <div className="row d-flex justify-content-center bouton">
                 <Link to="/Stocks"className="col-12 menu-button">Logout</Link>
            </div>
        </div> 
  );
}
export default Menu;