import React, { useContext, useState } from "react";
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MenuOpen,
  Person,
  ShoppingBag,
  ThumbUp,
  Widgets,
} from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { DataContext } from "../App";

function Navbar() {
  const { favoritesState,cartState,dispatchCart } = useContext(DataContext);
  const [navOpen, setNav] = useState(false);
  const [menuOpen, setMenu] = useState(false);
  const navData = [
    {
      id: 0,
      path: "/vehicle",
      label: "cars",
    },
    {
      id: 1,
      path: "/laptops",
      label: "computers",
    },
    {
      id: 2,
      path: "/tablets",
      label: "tablets",
    },
    {
      id: 3,
      path: "/motorcycle",
      label: "motorcycles",
    },
  ];

  const menuData = [
    {
      id: 0,
      path: "#",
      text: "Cart",
      icon: ShoppingBag,
    },
    {
      id: 1,
      path: "/favorites",
      text: "Favorites",
      icon: ThumbUp,
    },
    {
      id: 2,
      path: "/#",
      text: "Login",
      icon: Person,
    },
  ];

  const handleMenu = (currentText) => {
    setMenu(!menuOpen);
    setNav(false);
    currentText === "Cart" ? dispatchCart({type:"TOGGLE_CART",payload:{cartOpen:true}}) : null

  };
  const handleNav = () => {
    setNav(!navOpen);
    setMenu(false);
  };
  return (
    <header className="header-wrapper">
      <div className="logo-toggle-container">
        <button type="button" className="nav-toggle-btn" onClick={handleNav}>
          {navOpen ? (
            <Close fontSize="large" className="close-icon" />
          ) : (
            <MenuOpen fontSize="large" />
          )}
        </button>
        <NavLink to="/" className="logo">
          TECH & RIDE
        </NavLink>
      </div>

      <nav className="nav-container">
        <ul className={`nav-links-wrapper ${navOpen && "open"}`}>
          {navData.map((link) => (
            <li key={link.id} className="nav-item">
              <NavLink to={link.path} className="nav-link" onClick={handleNav}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Section for far right icons */}
      <div className={`cart-favorites-login-wrapper ${menuOpen && "open"}`}>
        {menuData.map((item) => (
          <Link key={item.id} to={item.path} className="menu-icon-link" onClick={()=> handleMenu(item.text)}>
            <item.icon fontSize="large" className="menu-icon" />
            {item.text}
            {favoritesState.length > 0 && item.text === "Favorites" && (
              <span className="num fav-nav">{favoritesState.length}</span>
            )}
            {cartState.cartItems.length > 0 && item.text === "Cart" && (
              <span className="num cart-nav">{cartState.cartItems.length}</span>
            )}
          </Link>
        ))}
      </div>
      <button type="button" className={`menu-btn`} onClick={handleMenu}>
        <Widgets fontSize="large" />
        {menuOpen ? (
          <KeyboardArrowUp fontSize="large" />
        ) : (
          <KeyboardArrowDown fontSize="large" />
        )}
      </button>

      {/* <div className={`nav-overlay ${navOpen && "show"}`}></div> */}
    </header>
  );
}

export default Navbar;
