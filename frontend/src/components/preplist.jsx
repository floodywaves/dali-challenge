import React, {useState, useEffect} from "react";
import { getPrepList } from "../services/datastore";
import { removePrepItems, addToFridge } from "../services/datastore";
import "./preplist.css"
const Preplist = () =>{
    const [prepItems, setPrepItems] = useState([]);

    useEffect(()=>{
       getPrepList((prepItems)=>{
            if (prepItems){ // if not null
                const prepArray = Object.keys(prepItems).map((key)=>( // return the array of the cart items
                    { id: key,
                    ...prepItems[key]}
                ));
            setPrepItems(prepArray);
            }
        });
     },[])

    const handleRemove = (id, item) =>{
        addToFridge(id,item);
        removePrepItems(id);
    }

    return(
        <div className="preplist-container">
            {prepItems.map((item)=>(
                <div key={item.id}>
                    {item.name}
                    <button onClick={()=>handleRemove(item.id,item)}>remove</button>
                </div>
            ))}
        </div>
    )
}
export default Preplist;