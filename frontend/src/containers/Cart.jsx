import React, { useState, useEffect} from 'react';
import './Home.css';
import { getCartItems, deleteCartItems, updateQuantity,decreaseQuantity } from '../services/datastore';
const Cart = (props) =>{
   const [items, setItems] = useState([]);

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
    },[])


   const handleDelete = (id) => {
    deleteCartItems(id)
    };
    const handleIncrement = (id, item)=>{
        updateQuantity(id,item)
    }
    const handleDecrement = (id, item)=>{
        if (item.quantity!=-0){ 
         decreaseQuantity(id,item)
        }
    }   

    return(
        <div className='cart-root'> 
          {items.map((item)=>(
            <div key={item.id}>
                {item.name}
                {item.description}
                {item.price}
                <p>{item.quantity}</p>
                <button type='button' onClick={()=>handleDelete(item.id)}>Remove</button>
                <button type='button' onClick={()=>handleIncrement(item.id,item)}>Increment</button>
                <button type='button' onClick={()=>handleDecrement(item.id,item)}>Decrement</button>
            </div>
          ))}
        </div>
    )
    
}
export default Cart;