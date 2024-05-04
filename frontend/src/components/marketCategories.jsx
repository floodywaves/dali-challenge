import React, {useState, useEffect} from "react";
import './marketCategories.css'
import { addToCart,updateQuantity,getTotalCost, updateTotalCost,getCartItems} from "../services/datastore";


const Category = (props) =>{
    const [category, setCategory] = useState( props.chosenCategory.items);
    const [cartItems, setCartItems] = useState([]);
    const [totalcost, setTotalCost] = useState(0);
    const handleBack = () =>{ // returns to main market page
       props.setDisplayCategory(false); 
    }

    useEffect(()=>{
      getCartItems((getItem)=>{
          if (getItem){ // if not null
              const itemsArray = Object.keys(getItem).map((key)=>( // return the array of the cart items
                  { id: key,
                  ...getItem[key]}
              ));
          setCartItems(itemsArray);
          }
      });
   },[])

   useEffect(()=>{
    getTotalCost(1,(theCost) => {
        const Cost = theCost;
        if (Cost.total< 0){
            setTotalCost(0);
        }else{
            setTotalCost(Cost.total);
        }
      });
  }, [totalcost])

    const handleAddItem = (id, item) => {
      if (!cartItems) {
          addToCart(id, item, 1);

      } else {
          const cartItem = cartItems.find((cartItem) => cartItem.id === id);
          if (!cartItem) {
              addToCart(id, item, 1);
          } else {
              updateQuantity(id,cartItem);
          }
          updateTotalCost(1, totalcost + item.price);
      }
      // props.setTotalCost(props.totalCots + item.price);
  };


    return(
        <div>
            <button type='button' onClick={handleBack} id="return-to-market"><img src="/assets/back.png"/></button>
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