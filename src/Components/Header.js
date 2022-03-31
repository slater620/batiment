import { Link} from 'react-router-dom';
function Header(){
    return(
        <div className="container-fluid">
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Gestion</span>
                <div className="nav-item" style={{position:"right" , fontWeight:"bold"}}><Link style={{color:"white", border:"None"}}  to="/">Deconnexion</Link></div>
            </nav>
        </div>
    )
}
export default Header