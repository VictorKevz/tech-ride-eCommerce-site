import React, { useContext } from "react";
import OrderItemList from "../../Components/OrderItemList";
import "../../Styles/checkout.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import PersonalDetails from "./CheckoutForms/PersonalDetails";
function Checkout() {
  const { categories } = useContext(DataContext);
  return (
    <section className="checkout-wrapper">
      <header className="checkout-header">
        <div className="breadcrumb-wrapper">
          <Link to="/" className="checkout-breadcrumb">
            Home /
          </Link>
          {categories.map((category, i) => (
            <Link to={`/${category}`} className="checkout-breadcrumb" key={i}>
              {" "}
              {` ${category} ${categories.length - 1 === i ? "" : " /"}`}{" "}
            </Link>
          ))}
        </div>
      </header>
      <div className="check-out-container">
        <article className="form-wrapper">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-parag">
            Please provide your details to place your order!
          </p>
          <PersonalDetails/>
        </article>
        <article className="order-summary-wrapper">
          <h2 className="checkout-title">Order Summary</h2>
          <OrderItemList />
        </article>
      </div>
    </section>
  );
}

export default Checkout;
