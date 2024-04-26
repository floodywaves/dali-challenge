import React, { useState, useEffect} from 'react';
import './Home.css';
import { getCartItems, deleteCartItems } from '../services/datastore';
const Cart = (props) =>{
   const [items, setItems] = useState([]);

   const handleDelete = (id) => {
         deleteCartItems(id)
    };

    useEffect(()=>{
        getCartItems((getItem)=>{
            if (getItem){ // if not null
                const itemsArray = Object.keys(getItem).map((key)=>( // return the array of the cart items
                    { id: key,
                    ...getItem[key]}
                ));
            setItems(itemsArray);
            }
        });
    },[items])

    return(
        <div className='cart-root'> 
          {items.map((item)=>(
            <div key={item.id}>
                {item.name}
                {item.description}
                {item.price}
                <button type='button' onClick={()=>handleDelete(item.id)}>Remove</button>
            </div>
          ))}
        </div>
    )
    
}
export default Cart;