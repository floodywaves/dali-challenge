import React, {useState, useEffect} from "react";
import { addToPot, getPrepList } from "../services/datastore";
import { removePrepItems, addToFridge } from "../services/datastore";
import "./preplist.css"
const Preplist = (props) =>{
    const [setting, setSetting] = useState(props.setting); //true = you are cooking, false = you are at home page
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
    const handleCook = (id, item) =>{
        addToPot(id,item);
        removePrepItems(id);

    }

    return(
        <div className="preplist-container">
            
            {prepItems.map((item)=>(
                <div key={item.id}>
                    {item.name}
                    {setting ?  <button onClick={()=>handleCook(item.id,item)}>Add</button> : 
                    <button onClick={()=>handleRemove(item.id,item)}>remove</button>}
                </div>
            ))}
        </div>
    )
}
export default Preplist;