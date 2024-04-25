import React from 'react';
import './Home.css';
const Home = (props) =>{


    return(
        <div className='home-root'> 
            <h1>HOME</h1>
            <div className='kitchen-container'>
                <img src='/assets/kitchen.png' alt='kitchen' id='kitchen'/>
                <img src='/assets/table.png' alt='table' id='table'/>
                <img src='/assets/cooking.png' alt='pot' id='pot'/> 
                <img src='/assets/fridge.png' alt='fridge' id='fridge'/>
            </div>
            <img src='/assets/floor.png' alt='floor' id='floor'/>
        </div>
    )
    
}
export default Home;