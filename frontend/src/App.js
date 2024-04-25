import './App.css';
import React,{useState} from 'react';
import{
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './containers/Home';
import Market from './containers/Market';
import Cart from './containers/Cart';
import Category from './components/marketCategories';

function App() {
  const [cart, setCart] = useState(true);
  return (
    <Router>
      <Nav />
      <Routes>
      <Route path = "*" element = {<Navigate to = "/home"/>}/>	
			<Route path = '/home' element = {<Home/>}/>
      <Route path = '/market' element = {<Market/>}/>
      <Route path = '/shoppingcart' element = {<Cart/>}/>
      <Route path = '/marketsection' element = {<Category/>}/>
      </Routes>
      
    
    </Router>
  );
}

export default App;
