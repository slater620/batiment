import { useState } from "react";
import CreateStocks from "./CreateStocks.js"
import UpdateStock from "./UpdateStock.js"
import ListStock from "./ListStock"
function Stock(){
    const[spaceStockName,setSpaceStockName]=useState('listStock')
    const [itemToUpdate,setItemToUpdate]= useState()
    //etat contenant la liste  des stocks
    const [stockList, setStockList] = useState([])
    switch (spaceStockName) {
        case 'createStock':
            return <CreateStocks setStockList={ setStockList } stockList={stockList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceStockName= {spaceStockName} setSpaceStockName={setSpaceStockName}/>
            break;
            case 'listStock':
                return <ListStock setStockList={ setStockList } stockList={stockList} setItemToUpdate={ setItemToUpdate } itemToUpdate={ itemToUpdate } spaceStockName= {spaceStockName} setSpaceStockName={setSpaceStockName} />
                break;
                case 'updateStock':  
                return <UpdateStock setStockList={ setStockList } stockList={stockList} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} spaceStockName= {spaceStockName} setSpaceStockName={setSpaceStockName}/>
        default:
            break;
    }

}

export default Stock;