import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
const Home = (props) =>{


    return(
        <div className='home-root'> 
            
            <div className='kitchen-container'>
                <img src='/assets/background.png' alt='kitchen' id='kitchen2'/>
                <a className='anchored-element2' id='cook-popup'><Link to="/cooking" id='cooking-container'></Link></a>
                <a className='anchored-element' id='fridge-popup'> <Link to="/refridgerator" id='fridge'></Link></a>
                <Tooltip content="open refridgerator!" anchorSelect='.anchored-element'  />
                <Tooltip content="Start cooking here!!" anchorSelect='.anchored-element2'  />
            </div>
          
        </div>
    )
    
}
export default Home;