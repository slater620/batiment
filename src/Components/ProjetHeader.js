import { Link} from 'react-router-dom';
function ProjetHeader(){
    return(
        <div className="container-fluid">
            <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
               
                    <div  className="navbar-nav mr-auto justify-content-between">
                        <li  className="nav-item">
                            <Link to="/dashboard" className="nav-link" href="">PROJET</Link>
                        </li>
                        <li  className="nav-item">
                            <Link to="/dashboard/projet" className="nav-link" href="">TACHES</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/projet/materiaux" className="nav-link" href="">MATERIAUX</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/projet/materiel" className="nav-link" href="">MATERIEL</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/projet/commande" className="nav-link" href="">COMMANDE</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/projet/alerte" className="nav-link" href="">ALERTE</Link>
                        </li>
                    </div>
            </nav>
        </div>
    )
}
export default ProjetHeader