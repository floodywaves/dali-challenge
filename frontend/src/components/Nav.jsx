import React from 'react';
import{Link} from 'react-router-dom';
import './Nav.css';

const Nav = () =>{
    return(
        <nav className='nav-root'>
            <div className='buttons-container'>
                <div className='your-info-container'>
                    <img id='profile' src='./assets/profile.png' alt='profile'/>
                    <div className='your-info-wrapper'>
                        {/* <span id='username'> username</span> */}
                        <div id='balance'>$1000</div>
                    </div>
                </div>
                <div className='nav-buttons'>
                    <Link to="/home" id='btn'>Home</Link>
                    <Link to="/market" id='btn'>Market</Link>
                    <Link to="/shoppingcart" id='btn'>Cart</Link>
                </div>
            </div>
		</nav>
    )
}
export default Nav;