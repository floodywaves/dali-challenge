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
import { getCartItems, deleteCartItems ,getWallet} from './services/datastore';

function App() {
  const [wallet, setWallet]= useState(1000);
  const [totalCost, setTotalCost] = useState(0); // props for cart and categories 
   // probably should be held in the parent component

   useEffect(() => {
    getWallet(1,(theWallet) => {
        const initWallet= theWallet;
        setWallet(initWallet.money);
    });
   }, []);
  console.log("wallet ", wallet)

 


  return (
    <Router>
      <Nav wallet={wallet}/>
      <Routes>
      <Route path = "*" element = {<Navigate to = "/home"/>}/>	
			<Route path = '/home' element = {<Home/>}/>
      <Route path='/market' element={<Market />} />
      <Route path = '/shoppingcart' element = {<Cart  wallet={wallet} setWallet={setWallet} totalCost={totalCost} setTotalCost={setTotalCost}  />}/>
      <Route path = '/marketsection' element = {<Category wallet={wallet} setWallet={setWallet} totalCost={totalCost} setTotalCost={setTotalCost}  />}/>
      </Routes>
      
    
    </Router>
  );
}

export default App;
