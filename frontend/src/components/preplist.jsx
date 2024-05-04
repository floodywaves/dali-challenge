import React, {useState, useEffect} from "react";
import { addToPot, getPrepList } from "../services/datastore";
import { removePrepItems, addToFridge } from "../services/datastore";
import "./preplist.css"
const Preplist = (props) =>{
    const [setting, setSetting] = useState(); //true = you are cooking, false = you are at home page
    const [prepItems, setPrepItems] = useState([]);
    const [display, setDisplay] = useState(false);
    const [dropdown, setDropdown] = useState('drop-down2');
    useEffect(() => {
        setSetting(props.setting);
      }, [props.setting]);
      
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
    const toggleDisplay = () => {
        setDisplay(!display);
        if (display === false){
            setDropdown("drop-down")
        }
        else{
            setDropdown("drop-down2")
        }
        console.log("Toggled Display to:", !display);
    };
    return(
        <div className="preplist-container">
            <button onClick= {toggleDisplay} id='prepList-btn' type='button'> <p>Prep List</p> <img src="/assets/dropdown.png" id={dropdown}/></button>
            {display ? <div className="preplist-background">
                {prepItems.map((item)=>(
                <div key={item.id} className="individual-prep-item">
                    {item.name}
                    {setting ?  <button id='preplist-add-remove-btn' onClick={()=>handleCook(item.id,item)}>Add</button> : 
                    <button  id='preplist-add-remove-btn' onClick={()=>handleRemove(item.id,item)}><img src="/assets/x.png"/></button>}
                </div>
            ))}
            </div>: null }
            


        </div>
    )
}
export default Preplist;