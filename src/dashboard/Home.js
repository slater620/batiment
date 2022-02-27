import Header from "./Header";
import Menu from "./Menu";
import Workspace from "./Workspace";

function Home(){

            return(
                <div  style={{height:"100vh",width:"100vw"}}>
                    <div style={{width:"100%",height:"42%"}}>
                        <Header/>
                        <div className="row flex-grow-1">
                            <Menu />
                            <div className="col container workspace-div">
                                <Workspace/>
                            </div>
                        </div>
        
                    </div>
        
                </div>
            )
    }
export default Home;