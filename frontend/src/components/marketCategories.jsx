import React, {useState} from "react";
import './marketCategories.css';
import axios from 'axios';


const Category = (props) =>{
    const [category, setCategory] = useState( props.chosenCategory.items);
    const [cartItems, setCartItems] = useState([]);

    const handleBack = () =>{ // returns to main market page
       props.setDisplayCategory(false); 
    }



    return(
        <div>
            <button type='button' onClick={handleBack}>Back</button>
            <div className="food-container">
              {category.map((item)=>(
                <div key={item.id} className="individual-food-container">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <button className="buy-btn">
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