import Header from "./Header";
import Menu from "./Menu";
import Workspace from "./Workspace";
import { useState } from "react";

function Home(){

    //etat de la zone de travail
    const[spaceName,setSpaceName]=useState('listProjet')
            return(
                <div  style={{height:"100vh",width:"100vw"}}>
                    <div style={{width:"100%",height:"42%"}}>
                        <Header/>
                        <div className="row flex-grow-1">
                            <Menu spaceName= {spaceName} setSpaceName={setSpaceName} />
                            <div className="col container workspace-div">
                                <Workspace spaceName= {spaceName} setSpaceName={setSpaceName} />
                            </div>
                        </div>
        
                    </div>
        
                </div>
            )
    }
export default Home;