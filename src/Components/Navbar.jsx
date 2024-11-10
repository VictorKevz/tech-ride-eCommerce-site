import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { cartVariants } from "../Variants";

function Navbar() {
  const { favoritesState, cartState, dispatchCart } = useContext(DataContext);
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
    currentText === "Cart"
      ? dispatchCart({ type: "TOGGLE_CART", payload: { cartOpen: true } })
      : null;
  };

  const handleNav = () => {
    setNav(!navOpen);
    setMenu(false);
  };

  return (
    <header className="header-wrapper" role="banner">
      <div className="logo-toggle-container">
        <button
          type="button"
          className="nav-toggle-btn"
          onClick={handleNav}
          aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={navOpen}
        >
          {navOpen ? (
            <Close fontSize="large" className="close-icon" aria-hidden="true" />
          ) : (
            <MenuOpen fontSize="large" aria-hidden="true" />
          )}
        </button>
        <NavLink to="/" className="logo" aria-label="Home page - TECH & RIDE">
          TECH & RIDE
        </NavLink>
      </div>

      <nav className="nav-container" aria-label="Primary navigation">
        <ul
          key={navOpen}
          className={`nav-links-wrapper desktop ${navOpen && "open"}`}
        >
          {navData.map((link) => (
            <li key={link.id} className="nav-item">
              <NavLink
                to={link.path}
                className="nav-link"
                activeClassName="active"
                onClick={handleNav}
                aria-label={`Go to ${link.label}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          <motion.ul
            key={navOpen}
            className={`nav-links-wrapper mobile ${navOpen && "open"}`}
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {navData.map((link) => (
              <li key={link.id} className="nav-item" role="menuitem">
                <NavLink
                  to={link.path}
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleNav}
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={menuOpen}
          className={`cart-favorites-login-wrapper ${menuOpen && "open"}`}
          variants={cartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="User menu options"
          role="menu"
        >
          {menuData.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="menu-icon-link"
              onClick={() => handleMenu(item.text)}
              aria-label={`Open ${item.text}`}
              role="menuitem"
            >
              <item.icon
                fontSize="large"
                className="menu-icon"
                aria-hidden="true"
              />
              <span>{item.text}</span>
              {favoritesState.length > 0 && item.text === "Favorites" && (
                <span className="num fav-nav" aria-label={`You have ${favoritesState.length} favorite items`}>
                  {favoritesState.length}
                </span>
              )}
              {cartState.cartItems.length > 0 && item.text === "Cart" && (
                <span className="num cart-nav" aria-label={`You have ${cartState.cartItems.length} items in your cart`}>
                  {cartState.cartItems.length}
                </span>
              )}
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
      
      <button
        type="button"
        className={`menu-btn`}
        onClick={handleMenu}
        aria-label={menuOpen ? "Close user menu" : "Open user menu"}
        aria-expanded={menuOpen}
      >
        <Widgets fontSize="large" aria-hidden="true" />
        {menuOpen ? (
          <KeyboardArrowUp fontSize="large" aria-hidden="true" />
        ) : (
          <KeyboardArrowDown fontSize="large" aria-hidden="true" />
        )}
      </button>
    </header>
  );
}

export default Navbar;
