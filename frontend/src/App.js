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
import { getCartItems, deleteCartItems } from './services/datastore';

function App() {
  const [cart, setCart] = useState(true);
  const [wallet, setWallet]= useState(1000);
  const [totalCost, setTotalCost] = useState(0); // props for cart and categories 
  const [cartItems, setCartItems] = useState([]);
   // probably should be held in the parent component


    useEffect(()=>{
        getCartItems((getItem)=>{
            if (getItem){ // if not null
                const itemsArray = Object.keys(getItem).map((key)=>( // return the array of the cart items
                    { id: key,
                    ...getItem[key]}
                ));
            setCartItems(itemsArray);
            }
        });
    },[])
    console.log("app.js:",cartItems);

    const handleDelete = (id) => {
      deleteCartItems(id);
    }

  return (
    <Router>
      <Nav wallet={wallet}/>
      <Routes>
      <Route path = "*" element = {<Navigate to = "/home"/>}/>	
			<Route path = '/home' element = {<Home/>}/>
      <Route path='/market' element={<Market cartItems={cartItems} />} />
      <Route path = '/shoppingcart' element = {<Cart  wallet={wallet} setWallet={setWallet} totalCost={totalCost} setTotalCost={setTotalCost} cartItems = {cartItems} handleDelete={handleDelete} />}/>
      <Route path = '/marketsection' element = {<Category wallet={wallet} setWallet={setWallet} totalCost={totalCost} setTotalCost={setTotalCost} cartItems = {cartItems} />}/>
      </Routes>
      
    
    </Router>
  );
}

export default App;
