import './App.css';
import React,{useState, useEffect} from 'react';
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
import { getCartItems, deleteCartItems ,getWallet, getTotalCost} from './services/datastore';
import Fridge from './components/fridge';
import Cooking from './components/cookingpot';

function App() {
  const [wallet, setWallet]= useState(1000);
 // props for cart and categories 
   // probably should be held in the parent component

   useEffect(() => {
    getWallet(1,(theWallet) => {
        const initWallet= theWallet;
        setWallet((initWallet.money).toFixed(2));
    });

   }, [wallet]);
 

  console.log("wallet ", wallet)

 


  return (
    <Router>
      <Nav wallet={wallet}/>
      <Routes>
      <Route path = "*" element = {<Navigate to = "/home"/>}/>	
			<Route path = '/home' element = {<Home/>}/>
      <Route path='/market' element={<Market />} />
      <Route path = '/shoppingcart' element = {<Cart  wallet={wallet} setWallet={setWallet}  />}/>
      <Route path = '/marketsection' element = {<Category wallet={wallet} setWallet={setWallet}  />}/>
      <Route path='/refridgerator' element={<Fridge/>} />
      <Route path='/cooking' element={<Cooking />} />
      </Routes>
      
    
    </Router>
  );
}

export default App;
