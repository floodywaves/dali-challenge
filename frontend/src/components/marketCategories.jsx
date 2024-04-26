import React, {useState} from "react";
import './marketCategories.css'
import { addToCart,updateQuantity,getSpecificItem } from "../services/datastore";


const Category = (props) =>{
    const [category, setCategory] = useState( props.chosenCategory.items);
    const [cartItems, setCartItems] = useState(props.cartItems);
    console.log("cart:", props.cartItems);
    const handleBack = () =>{ // returns to main market page
       props.setDisplayCategory(false); 
    }

    const handleAddItem = (id, item) => {
      if (!cartItems) {
          addToCart(id, item, 1);
      } else {
          const cartItem = cartItems.find((cartItem) => cartItem.id === id);
          if (!cartItem) {
              addToCart(id, item, 1);
          } else {
              updateQuantity(id, cartItem, cartItem.quantity + 1);
          }
      }
      props.setTotalCost(props.totalCots + item.price);
  };


    return(
        <div>
            <button type='button' onClick={handleBack}>Back</button>
            <div className="food-container">
              {category.map((item)=>(
                <div key={item.id} className="individual-food-container">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <button className="buy-btn" onClick={()=>handleAddItem(item.id,item)}>
                        <img src="/assets/shoppingcart.png" id="shoppingcart"/>
                        <p>ADD</p>
                    </button>
                </div>

              ))}

                
            </div>


        </div>
    )

}
export default Category;