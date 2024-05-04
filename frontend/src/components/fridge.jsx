import React, {useState, useEffect} from "react";
import { getFridge } from "../services/datastore";
import { Link } from "react-router-dom";
import { addPrepItem , removeFridgeItems} from "../services/datastore";
import './fridge.css';

const Fridge = () =>{
    const [items, setItems] = useState([]);

    useEffect(()=>{
        getFridge((fridgeItems)=>{
            if (fridgeItems){
            const fridgeArray = Object.keys(fridgeItems).map((key)=>( // return the array of the cart items
            { id: key,
            ...fridgeItems[key]}
        ));
         setItems(fridgeArray);
        }else{
            setItems([]); // in case there is nothing
        }
        })
    }, [])
    console.log(items);

    const handleAdd = (id,item) =>{
        addPrepItem(id,item);
        removeFridgeItems(id);
    }   

    return(
        <div className="fridge-root">
            <div className="fill-the-space"> {""}</div>
            <div id="back-btn">
             <Link to="/home"> <img src="/assets/back.png"/></Link>
             </div>
            <div className="fridge-items-container">
            {items.map((item)=>(
                    <div key={item.id}className='individual-items-container'>
                        <h4> {item.name}</h4>
                        <p> {item.quantity}</p>
                        <button onClick={()=>handleAdd(item.id,item)} id="add-to-preplist">Add to Preplist</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Fridge;