import './Menu.css'

function Menu({spaceName,setSpaceName}){    
    
    return(
        <div className="col-2 menu"   style={{height:"120vh",width:"12vw"}}>
            <div className="row d-flex justify-content-center bouton" style={{marginTop:"45%"}} >
                 <button  onClick={(event) => setSpaceName('listProjet') } className="col-12 menu-button" style={{width:"14vw"}}>Projet</button>
            </div>

            <div className="row d-flex justify-content-center bouton">
                 <button onClick={(event) => setSpaceName('listTache') }  className="col-12 menu-button">Taches</button>
            </div>

            <div className="row d-flex justify-content-center bouton">
                <button onClick={(event) => setSpaceName('listMateriau') } className="col-12 menu-button">Materiaux</button>
            </div>
            <div className="row d-flex justify-content-center bouton">
                <button onClick={(event) => setSpaceName('listMateriel') } className="col-12 menu-button">Materiels</button>
            </div>
            <div className="row d-flex justify-content-center bouton">
                <button onClick={(event) => setSpaceName('Notifications') } className="col-12 menu-button">Notifications</button>
            </div>
            <div className="row d-flex justify-content-center bouton">
                 <button  className="col-12 menu-button">Logout</button>
            </div>
        </div> 
  );
}
export default Menu;