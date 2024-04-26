import React, {useState, useEffect} from 'react';
import './Market.css';
import categoriesData from '../foodData';
import { getCategories, getSpecificCategories } from '../services/datastore';
import Category from '../components/marketCategories';
const Market = (props) =>{
    const [displayCategory, setDisplayCategory] = useState(false);
    const [chosenCategory, setChooseCategory] = useState([]); // should do get prop from database
    const [categories, setCategories] = useState([]);
    console.log(categories);

    useEffect(() => {
        getCategories((getCategory) => {
            if (getCategory) { // if not null
                const categoryArray = Object.keys(getCategory).map((key) => ({ 
                    id: key, //name of categories
                    ...getCategory[key]
                }));
                setCategories(categoryArray); // Update the state with the fetched categories
            }
        });
    }, []);

    const handleClick = (id) =>{
        getSpecificCategories(id, (getCategory) =>{
            setChooseCategory(getCategory); // the call back func returns here
        })
        console.log("choosen:", chosenCategory);
        setDisplayCategory(true);
    }

    return(
        <div className='market-root'> 
            <h1>MARKET</h1>
            {displayCategory ? 
            <div>
                <Category 
                    chosenCategory = {chosenCategory}
                    setDisplayCategory = {setDisplayCategory}
                />
            </div>
            :
            <div className='category-container'>
                {categories.map((category)=>(
                    <div key={category.id} className='individual-container' > 
                    <img src= {category.image} alt='category-img' id='category-img'/>
                    <button type='button' id='market-btn' onClick={()=>handleClick(category.id)}>
                            <h3>{category.name}</h3>
                        </button>
                    </div>

                 ))}
            </div>
          
            }
          </div>
    )
    
}
export default Market;



