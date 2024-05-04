/* Joyce Zou 
* Spring 2024 DALI Application
* Here you can added items from the preplist and generate recipes
* The recipes are pulled from the Edamam recipe-search database
*/
import { useEffect, useState } from "react";
import Preplist from "./preplist";
import { Link } from "react-router-dom";
import { addPrepItem, getPotIngredients, removeFromPot } from "../services/datastore";
import "./cookingpot.css";

const Cooking = () =>{
    const boolean = true;
    const [ingredients, setIngredients] = useState([]);
    const url = "https://api.edamam.com/api/recipes/v2?type=public&q=";
    const app_id = "7253ed09"; // tried placing these in env, but couldn't access it properly
    const app_key = "4c1d204fe079e9f56682669bbb7903bd";
    const [query, setQuery] = useState("");
    const [recomentations, setRecomentations] = useState([]);
    const [showRec, setShowRec] = useState(false); // need this for css purposes

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
    // referenced a website for this
    const fetchRecomentation = async () => {
        try {
            const response = await fetch(url + query + "&app_id=" + app_id + "&app_key=" + app_key + "&field=label&field=image&field=calories&size=5");
            if (!response.ok) { // if fetch is successful
                throw new Error('Error fetching the data');
            }
            const data = await response.json();
            console.log("data fetched:", data);
            setRecomentations(data.hits);
            if (data.hits.length === 0){
                setShowRec(false);
                alert("no such recipe found");
            }
            else{
                setShowRec(true);
            }
            
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };
    
    console.log("recs:", recomentations)
    
    const handleEnter = () => {
        const queryItems = ingredients.map((ingredient) => ingredient.name).join(", "); // return new string by concatenating all elements in array with ","
        setQuery(queryItems);
    }
    const handleCook = () =>{
        ingredients.map((ingredient) => {
            removeFromPot(ingredient.id);
        })
        setIngredients([]);
        setRecomentations([]);
        setShowRec(false);
    }
    const handleRemoveIngredients = (id,item) =>{
        removeFromPot(id);
        addPrepItem(id,item);
    }

    return(
        <div className="cooking-root">
            <Link to="/home" id="return-btn"> <img src="/assets/back.png"/></Link>
            <div className="prep-and-cook-wrapper">
                <div className='preplist-cooking'><Preplist setting={boolean}/></div>
                <div className="pot-items-container">
                    {ingredients.map((ingredient)=>(
                        <div key={ingredient.id} className="pot-item" >
                            <p> {ingredient.name} </p>
                            <button onClick={()=>handleRemoveIngredients(ingredient.id, ingredient)} id="remove-ingredient-btn"><img src="/assets/x.png" id="x-img"/></button>
                        </div>
                    ))}
                 <button onClick={handleEnter} id="enter-btn">Enter</button>
                </div>
            </div>
            <img src="/assets/preptable3.png" id='cooking-background'/>
            {showRec ? <div className="recomentations-container"> 
                {recomentations.map((rec)=>(
                <div>
                   <div className="individual-recomendations">
                    <img src={rec.recipe.image} id="recipe-img"/>
                    <p>{rec.recipe.label}</p> 
                   </div>
                   <button onClick={handleCook} id='cook-btn'>Cook</button>
                 </div>
                ))}
            </div>:null}
            
         </div>
    )
}
export default Cooking;