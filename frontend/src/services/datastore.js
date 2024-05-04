/* Joyce Zou 
* Spring 2024 DALI Application
* Firebase functions 
*/
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getDatabase, ref, set, update, remove, onValue, push
  } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKe8ZCZU4SWhNylUbaL5NAg4rPrnUP1Zo",
  authDomain: "dali-challenge-6f837.firebaseapp.com",
  projectId: "dali-challenge-6f837",
  storageBucket: "dali-challenge-6f837.appspot.com",
  messagingSenderId: "700824924",
  appId: "1:700824924:web:ada0a07be4156f81955599",
  measurementId: "G-92GLJZ79NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

/* Categories function*/
export function getCategories(callback = ()=> {}){
    const reference = ref(db,"Categories");
    onValue(reference,(snapshot) => {
        const category = snapshot.val();
        callback(category); // sends back the array of cateogires 
    })
}

export function getSpecificCategories(id,callback = ()=> {}){
    const reference = ref(db,"Categories/" + id); //id would refer to name
    onValue(reference,(snapshot) => {
        const category = snapshot.val();
        callback(category); // sends back the array of cateogires 
    })
}

/* CART functions*/
export function getCartCount(callback = ()=> {}){
    const reference = ref(db,"CartCount/count");
    onValue(reference,(snapshot) => {
        const count = snapshot.val();
        callback(count); // sends back the array of cateogires 
    })
}

export function updateCartCount(number){
    const reference = ref(db,'CartCount');
    update(reference,{
        count: number,
    })
}

export function getCartItems(callback = ()=> {}){
    const reference = ref(db,"Cart/");
    onValue(reference,(snapshot) => {
        const cartItems = snapshot.val();
        callback(cartItems); // sends back the array of cateogires 
    })
}
export function getSpecificItem(id, callback = ()=>{}){
    const reference = ref(db,'Cart/' + id);
    onValue(reference,(snapshot) => {
        const item = snapshot.val();
        callback(item); // sends back the array of cateogires 
    })
}

export function addToCart(id,item, quantity){
    const reference = ref(db,'Cart/' + id);
    set(reference,{
        name: item.name,
        price: item.price,
        id: item.id,
        description: item.description,
        quantity: quantity,
    })
}

export function updateQuantity(id,item){
    const reference = ref(db,'Cart/'+ id);
    update(reference,{
        ...item,
        quantity: item.quantity + 1
    })
}

export function deleteCartItems(id){
    const reference = ref(db,"Cart/" + id);
    remove(reference);
}
export function decreaseQuantity(id,item){
    const reference = ref(db,"Cart/" + id);
    update(reference,{
        ...item,
        quantity: item.quantity - 1
    })
}

/* userWallet functions*/
export function getWallet(id,callback = ()=>{}){
    const reference = ref(db,"Wallet/" + id);
    onValue(reference,(snapshot) => {
        const wallet = snapshot.val();
        callback(wallet); // sends back the array of cateogires 
    })
}
export function updateWallet(id, curr_money){ //if default user for now
    const reference = ref(db,"Wallet/" + id);
    update(reference,{
        money: curr_money
    });
}

/*  userCartCost functions*/
export function getTotalCost(id,callback = ()=>{}){
    const reference = ref(db,"TotalCost/"+id);
    onValue(reference,(snapshot) => {
        const cost = snapshot.val();
        callback(cost); 
    })
}
export function updateTotalCost(id,priceUpdate){ //if default user for now
    const reference = ref(db,"TotalCost/"+id);
    update(reference,{
        total: priceUpdate
    });
}

/* Fridge functions, similar to cart*/

export function getFridge(callback = () => {}){
    const reference = ref(db, 'Fridge/');
    onValue(reference,(snapshot) => {
        const fridgeItems = snapshot.val();
        callback(fridgeItems); // sends back the array of items in the current fridge 
    })
}
export function addToFridge(id,item){
    const reference = ref(db,'Fridge/' + id);
    set(reference,{
        name: item.name,
        id: item.id,
        description: item.description,
        quantity: item.quantity,
    })
}
export function updateFridgeQuantity(id,item){
    const reference = ref(db,'Fridge/'+ id);
    update(reference,{
        ...item,
        quantity: item.quantity - 1
    })
}
export function removeFridgeItems(id){
    const reference = ref(db,"Fridge/" + id);
    remove(reference);
}
/* Prep List Functions */

export function getPrepList(callback = () => {}){
    const reference = ref(db, 'Preplist/');
    onValue(reference,(snapshot) => {
        const prepItems = snapshot.val();
        callback(prepItems); // sends back the array of items in the current fridge 
    })
}

export function addPrepItem(id,item){
    const reference = ref(db,'Preplist/' + id);
    set(reference,{
        name: item.name,
        id: item.id,
        quantity: item.quantity,
        description: item.description,
    })
}
export function removePrepItems(id){
    const reference = ref(db,"Preplist/" + id);
    remove(reference);
}

/* Ingredients on pot */
export function getPotIngredients(callback = () => {}){
    const reference = ref(db, 'CookingPot/');
    onValue(reference,(snapshot) => {
        const prepItems = snapshot.val();
        callback(prepItems); // sends back the array of items in the current fridge 
    })
}

export function addToPot(id,item){
    const reference = ref(db,'CookingPot/' + id);
    set(reference,{
        name: item.name,
        id: item.id,
        quantity: item.quantity,
        description: item.description,
    })
}
export function removeFromPot(id){
    const reference = ref(db,"CookingPot/" + id);
    remove(reference);
}