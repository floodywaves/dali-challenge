import React, {useState, useEffect} from "react";
import { getFridge } from "../services/datastore";
import { Link } from "react-router-dom";
import { addPrepItem , removeFridgeItems} from "../services/datastore";

const Fridge = () =>{
    const [items, setItems] = useState([]);

    useEffect(()=>{
        getFridge((fridgeItems)=>{
            const fridgeArray = Object.keys(fridgeItems).map((key)=>( // return the array of the cart items
            { id: key,
            ...fridgeItems[key]}
        ));
         setItems(fridgeArray);
        })
    }, [])
    console.log(items);

    const handleAdd = (id,item) =>{
        addPrepItem(id,item);
        removeFridgeItems(id);
    }   

    return(
        <div>
            <Link to="/home"> return</Link>
            <div className="fridge-items-container">
            {items.map((item)=>(
                    <div key={item.id} className='items-container'>
                        <p> {item.name}</p>
                        <p> {item.quantity}</p>
                        <button onClick={()=>handleAdd(item.id,item)}>Add to Preplist</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Fridge;