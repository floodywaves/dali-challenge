import React from 'react';
import './Home.css';
const Home = (props) =>{


    return(
        <div className='home-root'> 
            
            <div className='kitchen-container'>
                <img src='/assets/kitchen2.png' alt='kitchen' id='kitchen2'/>
                {/* <img src='/assets/table.png' alt='table' id='table'/>
                <img src='/assets/cooking.png' alt='pot' id='pot'/> 
                <img src='/assets/fridge.png' alt='fridge' id='fridge'/> */}
            </div>
          
        </div>
    )
    
}
export default Home;