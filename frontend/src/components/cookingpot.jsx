import { useEffect, useState } from "react";
import Preplist from "./preplist";
import { Link } from "react-router-dom";
import { getPotIngredients, removeFromPot } from "../services/datastore";
import "./cookingpot.css";

const Cooking = () =>{
    const boolean = true;
    const [ingredients, setIngredients] = useState([]);
    const [displayPreplist, setDisplayPreplist] = useState(false);
    const url = "https://api.edamam.com/api/recipes/v2?type=public&q=";
    const app_id = "7253ed09";
    const app_key = "4c1d204fe079e9f56682669bbb7903bd";
    const [query, setQuery] = useState("");
    const [recomentations, setRecomentations] = useState([]);

    useEffect(()=>{
        getPotIngredients((prepIngredients)=>{
             if (prepIngredients){ // if not null
                 const ingredientsArray = Object.keys(prepIngredients).map((key)=>( // return the array of the cart items
                     { id: key,
                     ...prepIngredients[key]}
                 ));
             setIngredients(ingredientsArray);
             }
         });
      },[])

    useEffect(() => {
        if (query) {
            fetchRecomentation();
        }
        setQuery('');
    }, [query]);

    console.log(url + query + "&app_id=" + app_id + "&app_key=" + app_key+ "&field=label&field=image&field=totalNutrients&size=5");
    const fetchRecomentation = async() => {
        fetch(url + query + "&app_id=" + app_id + "&app_key=" + app_key + "&field=label&field=image&field=calories&size=5")
        .then((res)=>{
                return res.json();
        }).then((data)=>{
            console.log("data fetched:", data);
            setRecomentations(data.hits);
        });
    }
    console.log("recs:", recomentations)
    
    const handleDisplay = () =>{
        setDisplayPreplist(!displayPreplist);
    }
    const handleEnter = () => {
        const queryItems = ingredients.map((ingredient) => ingredient.name).join(", "); // return new string by concatenating all elements in array with ","
        setQuery(queryItems);
    }
    const handleCook = () =>{
        ingredients.map((ingredient) => {
            removeFromPot(ingredient.id);
        })
        setRecomentations([]);
    }
  
        
    return(
        <div>
            <Link to="/home"> back </Link>
             <button onClick={handleDisplay} id='preplist-btn'>Prep list</button>
                    {displayPreplist ? <div className='preplist'>
                     <Preplist setting={boolean} />
                    </div>: <div ></div>}
            <div>
                <h2>Items in the pot</h2>
                {ingredients.map((ingredient)=>(
                    <div key={ingredient.id}>
                        {ingredient.name}
                    </div>
                ))}
                <button onClick={handleEnter}>Enter</button>
            </div>

            <div className="recomentations-container"> 
                {recomentations.map((rec)=>(
                   <div className="individual-recomendations">
                    {rec.recipe.label}
                    <img src={rec.recipe.image}/>
                    <button onClick={handleCook}>Cook</button>
                   </div>
                ))
            }
            </div>
            
         </div>

    )
}
export default Cooking;