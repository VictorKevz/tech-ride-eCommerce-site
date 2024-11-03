import React, { createContext, useReducer, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import DetailsPage from "./pages/Details/DetailsPage";
import Favorites from "./pages/Favorites/Favorites";
import Cart from "./Components/Cart";

export const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      return {
        ...state,
        [action.payload.category]: action.payload.data,
      };
    default:
      return state;
  }
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      const isInFavorites = state.some(
        (product) => product.id === action.product.id
      );
      if (isInFavorites) {
        return state.filter((product) => product.id !== action.product.id);
      }
      return [...state, action.product];
  }
};

const cartReducer = (state, action) => {
  
 // Find index of item to be updated using its id
  const getMatchedProductIndex = (id) => {
      return state.cartItems.findIndex((item)=> item.id === id)
  }

  switch (action.type) {
    
    case "ADD_TO_CART":
      const { productObj, quantity } = action.payload;

     

      const itemIndex = getMatchedProductIndex(productObj.id) 
      
      let updatedItems;
      if (itemIndex >= 0) {
        updatedItems = state.cartItems.map((item, index) =>
          itemIndex === index
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.cartItems, { ...productObj, quantity }];
      }
      return {
        ...state,
        cartItems: updatedItems,
        isCartOpen: true,
      };
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };

    case "INCREMENT_QUANTITY":
      
      const incrementIndex = getMatchedProductIndex(action.payload.id)
      if (incrementIndex >= 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((item, index) =>
            incrementIndex === index
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return state;
      }
    case "DECREMENT_QUANTITY":
      
      const decrementIndex = getMatchedProductIndex(action.payload.id)
      if (decrementIndex >= 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((item, index) =>
            decrementIndex === index
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        };
      } else {
        return state;
      }
    case "DELETE_ITEM":  
    const {id} = action.payload 
    return {
      ...state,
      cartItems: state.cartItems.filter((item)=> item.id !== id)
    }

    default:
      return state;
  }
};
function App() {
  //..............DATA DECLARATION..............
  const savedData = localStorage.getItem("data");
  const dataInitial =
    savedData !== null
      ? JSON.parse(savedData)
      : { laptops: [], vehicle: [], tablets: [], motorcycle: [] };
  const [stateData, dispatchData] = useReducer(dataReducer, dataInitial);

  //..............FAVORITES DECLARATION..............
  const savedFavorites = localStorage.getItem("favorites");
  const favoritesInitial =
    savedFavorites !== null ? JSON.parse(savedFavorites) : [];
  const [favoritesState, dispatchFavorites] = useReducer(
    favoritesReducer,
    favoritesInitial
  );

  //..............CART DECLARATION..............
  const savedCart = localStorage.getItem("cart");
  const cartInitial = {
    cartItems: savedCart !== null ? JSON.parse(savedCart) : [],
    isCartOpen: false,
  };
  const [cartState, dispatchCart] = useReducer(cartReducer, cartInitial);

  const categories = ["laptops", "vehicle", "motorcycle", "tablets"];
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategory = async (category) => {
    const url = `https://dummyjson.com/products/category/${category}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${category} data`);
      }
      const data = await res.json();
      dispatchData({
        type: "UPDATE_CATEGORY",

        payload: { data: data.products, category: category },
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    categories.forEach((category) => {
      if (!stateData[category] || stateData[category].length === 0) {
        fetchCategory(category);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(stateData));
    localStorage.setItem("favorites", JSON.stringify(favoritesState));
    localStorage.setItem("cart", JSON.stringify(cartState.cartItems));
  }, [stateData, favoritesState, cartState.cartItems]);
  return (
    <DataContext.Provider
      value={{
        stateData,
        dispatchData,
        fetchCategory,
        isLoading,
        error,
        categories,
        dispatchFavorites,
        favoritesState,
        cartState,
        dispatchCart,
      }}
    >
      <main className={`outer-container`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:productName" element={<DetailsPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        {cartState.isCartOpen && <Cart />}
      </main>
    </DataContext.Provider>
  );
}

export default App;