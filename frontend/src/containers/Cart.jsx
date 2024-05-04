import React, { useState, useEffect} from 'react';
import './Cart.css';
import { getCartItems, deleteCartItems, updateQuantity,decreaseQuantity,getTotalCost ,
    updateTotalCost ,updateWallet,getWallet, addToFridge} from '../services/datastore';
const Cart = (props) =>{
   const [items, setItems] = useState([]);
   const [totalcost, setTotalCost] = useState(0);
   console.log("items:", items);
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
    
    useEffect(()=>{
        getTotalCost(1,(theCost) => {
            const Cost = theCost;
            if (Cost.total <0){ // no negative allow
                setTotalCost(0);
            }else{
                setTotalCost((Math.round(Cost.total * 100)/100)); // round up to two decimal places
            }
          });
    }, [totalcost])
    

   const handleDelete = (id,item) => {
         updateTotalCost(1, totalcost - (item.price * item.quantity));
        if (items.length === 1){ // needed this condition since deletion of last item did not trigger a rerender
            deleteCartItems(id); 
            setItems([]);
        }
        else{
            deleteCartItems(id);
        }
    };
    const handleIncrement = (id, item)=>{
        updateQuantity(id,item)
        updateTotalCost(1, totalcost + item.price);
    }
    const handleDecrement = (id, item)=>{
        if (item.quantity!=0){ 
         decreaseQuantity(id,item)
         setTotalCost(totalcost - (item.price))
         updateTotalCost(1, totalcost - item.price);
        }
        else{
            handleDelete(id,item);
        }
    } 
    
    const handleBuy = async() =>{ // wait to get $ in wallet
    
        let curr_wallet = props.wallet - totalcost;
        updateWallet(1,curr_wallet);
        items.map((item)=>{
            addToFridge(item.id,item);
            handleDelete(item.id, item); //deletes
        })
        updateTotalCost(1,0);
        setItems([]); // rerenders the removal of last item
    }

    return(
        <div className='cart-root'> 
           <div class="placeholder"></div>
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
                            <button type='button' onClick={()=>handleIncrement(item.id,item)} className='btn'><img src='/assets/plus.png' id='quantityBtn'/></button>
                            <p>{item.quantity}</p>
                            <button type='button' onClick={()=>handleDecrement(item.id,item)} className='btn'><img src='/assets/minus.png' id='quantityBtn'/></button>
                        </div>
                    </div>
                ))}
                </div>`
             </div>
             <div className='purchase-info'>
                <h3>Total Cost:{totalcost}</h3>
                <button type='button' id='buy-btn' onClick={handleBuy}>BUY</button>
             </div>
            <div class="placeholder"></div>
        </div>
    )
    
}
export default Cart;