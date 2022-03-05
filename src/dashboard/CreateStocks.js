import "./form.css"
import { API_URL } from "../authentification/Signup"
import { useState } from "react"

function CreateStock({setSpaceName, spaceName}){

    //variable qui signale la présence d'une erreur dans le formulaire
     var error = false

    //variable qui signale la présence d'une erreur au niveau du serveur
     var server_error = false
      
    //variable indiquant si l'utilisateur est connecté à internet
    var  connected = window.navigator.onLine

    const [typeList , setTypeList]= useState([])

    var token = localStorage.getItem("token")

    //fonctions de creation d'un stock
    const createStocks = (event) => {
        //récupération des valeurs du formulaire
        var user = localStorage("user")
        const nom = document.querySelector('#name').value
        const quantite = document.querySelector('#quantity').value
        const prix = document.querySelector('#price').value
        const dateApprovisionnement = document.querySelector('#date').value     
        const type =  document.querySelector('#type').value  
        if(!connected){
            error = true
            
        }

        if(quantite === ""){
            error = true
        }

        if(nom === ""){
            error = true
        }
        
        if(dateApprovisionnement === ""){
            error = true
        }
        var stock = {nom , prix , quantite ,type, dateApprovisionnement,user}
        stock = JSON.stringify(stock)
        //création de la requête
        var requestURL = API_URL + "/Stocks/";
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('Content-Type' , 'application/json');
        request.setRequestHeader('Authorization' , 'Bearer ' + token);
        request.responseType = 'json';
        request.send(stock);
        console.log(request.status)
        console.log(stock);
        request.onload = function(){
            
            const requestStatus = request.status
            
            if(requestStatus === 403){
                server_error = true
            

            }else if(requestStatus === 201){
                //requête réussie
                console.log('gooddd')
                setSpaceName('listStock')
                localStorage.setItem("stock",request.response['id'])
            }
        }
}

//fonctions permettant de recuperer la liste des types

function getType(){

    //création de la requête

    var requestURL = API_URL + "/Types/";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.setRequestHeader('Authorization' , 'Bearer ' + token);
    request.responseType = 'json';
    request.onload = function(){
            
        const requestStatus = request.status
        
        if(requestStatus === 403){
            server_error = true
        

        }else if(requestStatus === 200){
            //requête réussie
            console.log('gooddd')
            setTypeList(request.response)       
        }
    }


}


       return (
        <div className="container">
            {
                getType()
            }
            <form >
            <h2 style={{textAlign:"center",marginTop:"1%"}}>CREER UN STOCK</h2>
                <div className="row form-group">
                    <div className="col-25">
                        <label >Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="form-control" id="name" name="name" placeholder="name of stock"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >quantity</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="quantity" className="form-control" name="quantity" placeholder="quantity of stock"/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-25">
                        <label >price</label>
                    </div>
                    <div className="col-75">
                        <input type="number" className="form-control" id="price" name="price" placeholder="price of stock"/>
                    </div>
                </div>

                <div className="row form-group"> 
                    <div className="col-25">
                        <label>supply date</label>
                    </div>
                    <div className="col-75">
                        <input type="date" className="form-control" id="date" name="date"/>
                    </div>
                </div>

                <div className="row form-group"> 
                    <div className="col-25">
                        <label>type</label>
                    </div>
                    <div className="col-75">
                        <select id="type" className="form-control select-input">
                                        {
                                            typeList.map((type) => <option value={type['id']} key={type['id']}>{type['nom']}</option>)
                                        }
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary"  onClick={(event) => createStocks(event)}>Save</button>
            </form>
      </div>
       )
}

export default CreateStock;