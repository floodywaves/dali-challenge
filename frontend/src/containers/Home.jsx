import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import Preplist from '../components/preplist';
const Home = (props) =>{
    const [display, setDisplay] = useState(false);


    const handleDisplay = () =>{
        setDisplay(!display);
    }
    return (
        <div className='home-root'> 
            <div className='kitchen-container'>
                <div className='preplist'>
                    <button onClick={handleDisplay} id='preplist-btn'>Prep list</button>
                    {display ? (
                        <div className='preplist'>
                            <Preplist setting={false} />
                        </div>
                    ) : null}
                </div>
                <img src='/assets/background.png' alt='kitchen' id='kitchen2'/>
                <a className='anchored-element2' id='cook-popup'><Link to="/cooking" id='cooking-container'></Link></a>
                <a className='anchored-element' id='fridge-popup'> <Link to="/refridgerator" id='fridge'></Link></a>
                <Tooltip content="open refridgerator!" anchorSelect='.anchored-element'  />
                <Tooltip content="Start cooking here!!" anchorSelect='.anchored-element2'  />
            </div>
        </div>
    );
    
}
export default Home;