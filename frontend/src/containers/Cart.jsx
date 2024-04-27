import React, { useState, useEffect} from 'react';
import './Cart.css';
import { getCartItems, deleteCartItems, updateQuantity,decreaseQuantity } from '../services/datastore';
const Cart = (props) =>{
   const [items, setItems] = useState([]);
   const [totalcost, setTotalCost] = useState(props.totalCost);
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

   const handleDelete = (id,item) => {
        props.setTotalCost(totalcost - (item.price * item.quantity))
        deleteCartItems(id)
    };
    const handleIncrement = (id, item)=>{
        updateQuantity(id,item)
        props.setTotalCost(totalcost + (item.price))
    }
    const handleDecrement = (id, item)=>{
        if (item.quantity!=-0){ 
         decreaseQuantity(id,item)
         props.setTotalCost(totalcost - (item.price))
        }
        else{
            handleDelete(id,item);
        }
    }   

    return(
        <div className='cart-root'> 
            <div className='table-container'>
                <div className='table-headers'>
                    <h4>Item</h4>
                    <h4>Description</h4>
                    <h4 id='price'>price</h4>
                    <h4 id='quantity'>Quantity</h4>
                </div>
           
            <div className='table-body'>
                {items.map((item)=>(
                    <div key={item.id} className='items-container'>
                        <p> {item.name}</p>
                        <p> {item.description}</p>
                        <p> {item.price}</p>
                    
                        <div className='quantity-container'>
                            <button type='button' onClick={()=>handleIncrement(item.id,item)}>Increment</button>
                            <p>{item.quantity}</p>
                            <button type='button' onClick={()=>handleDecrement(item.id,item)}>Decrement</button>
                        </div>
                    </div>
                ))}
                </div>`
             </div>
            {totalcost}
        </div>
    )
    
}
export default Cart;