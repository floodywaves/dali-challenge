import React, {useEffect, useState} from 'react';
import{Link} from 'react-router-dom';
import './Nav.css';
import { getCartCount } from '../services/datastore';

const Nav = (props) =>{
   const [itemcount, setCount] = useState(0);
   
   useEffect(()=>{
        getCartCount((getcount)=>{
            if (getcount){
                setCount(getcount.count);
            }
        })
   },[]);

    return(
        <nav className='nav-root'>
            <div className='buttons-container'>
                <div className='your-info-container'>
                    <img id='profile' src='./assets/catchef.png' alt='profile'/>
                    <div className='your-info-wrapper'>
                        {/* <span id='username'> username</span> */}
                        <div id='balance'>${props.wallet}</div>
                    </div>
                </div>
                <div className='nav-buttons'>
                    <Link to="/home" className='nav-btn'>Home</Link>
                    <Link to="/market" className='nav-btn'>Market</Link>
                    <Link to="/shoppingcart" className='nav-btn' id='cartbtn'> <p>Cart</p><div id='count-num'>{itemcount}</div></Link>
                </div>
            </div>
		</nav>
    )
}
export default Nav;
