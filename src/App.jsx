import React, { createContext, useReducer, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import DetailsPage from "./pages/Details/DetailsPage";
import Favorites from "./pages/Favorites/Favorites";
import Cart from "./Components/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./Components/OrderConfirmation";
import Footer from "./Components/Footer/Footer";

export const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      return {
        ...state,
        [action.payload.category]: action.payload.data,
      };
    case "OPEN_LIGHTBOX":
      return {
        ...state,
        isLightBoxOpen: true,
      };
    case "CLOSE_LIGHTBOX":
      return {
        ...state,
        isLightBoxOpen: false,
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
    return state.cartItems.findIndex((item) => item.id === id);
  };

  switch (action.type) {
    case "ADD_TO_CART":
      const { productObj, quantity, openCart } = action.payload;

      const itemIndex = getMatchedProductIndex(productObj.id);

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
        isCartOpen: openCart,
      };
    case "TOGGLE_CART":
      const { cartOpen } = action.payload;
      return { ...state, isCartOpen: cartOpen };

    case "INCREMENT_QUANTITY":
      const incrementIndex = getMatchedProductIndex(action.payload.id);
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
      const decrementIndex = getMatchedProductIndex(action.payload.id);
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
      const { id } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    case "UPDATE_PERSONAL_DETAILS":
      const { name, value } = action.payload;
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          [name]: value,
        },
        isValid: {
          ...state.isValid,
          [name]: true,
        },
      };
    case "UPDATE_DELIVERY":
      return {
        ...state,
        delivery: {
          method: action.payload.value,
          cost: action.payload.cost,
        },
      };
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payment: action.payload.value,
      };

    case "SUBMIT_FORM":
      const { isValid } = action.payload;
      return {
        ...state,
        isValid: {
          ...isValid,
        },
      };
    case "SHOW_ORDER_CONFIRMATION":
      return {
        ...state,
        confirmOrder: true,
        orderNumber: state.orderNumber + 10,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        isCartOpen: false,
        personalDetails: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        isValid: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
        delivery: {
          method: "standard",
          cost: 0,
        },
        payment: "apple-pay",
        confirmOrder: false,
      };
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
      : {
          laptops: [],
          vehicle: [],
          tablets: [],
          motorcycle: [],
          isLightBoxOpen: false,
        };

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
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    isValid: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
    delivery: {
      method: "standard",
      cost: 0,
    },
    payment: "apple-pay",
    confirmOrder: false,
    orderNumber: 100,
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

  useEffect(() => {
    if (cartState.confirmOrder || stateData.isLightBoxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [cartState.confirmOrder, stateData.isLightBoxOpen]);
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
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <AnimatePresence mode="wait">
          {cartState.isCartOpen && <Cart />}
        </AnimatePresence>
        {cartState.confirmOrder && <OrderConfirmation />}
        <Footer />
      </main>
    </DataContext.Provider>
  );
}

export default App;
