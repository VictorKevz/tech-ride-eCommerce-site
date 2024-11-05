import React, { useContext } from "react";
import Delivery from './CheckoutForms/Delivery'
import Payment from './CheckoutForms/Payment'
import PersonalDetails from './CheckoutForms/PersonalDetails'
import { DataContext } from "../../App";

function CheckoutForm() {
    const { cartState, dispatchCart } = useContext(DataContext);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9 ]{7,15}$/;
  
    const { firstName, lastName, email, phone } = cartState.personalDetails;
  
    const handleValidation = () => {
      const newValid = { ...cartState.isValid };
      if (!firstName.trim()) {
        newValid.firstName = false;
      }
      if (!lastName.trim()) {
        newValid.lastName = false;
      }
      if (!email || !emailRegex.test(email)) {
        newValid.email = false;
      }
      if (!phone || !phoneRegex.test(phone)) {
        newValid.phone = false;
      }
      dispatchCart({ type: "SUBMIT_FORM", payload: { isValid: newValid } });
      const isValid = Object.values(newValid).every(Boolean);
      return isValid;
    };
   
    const handleSubmit = (e) => {
      e.preventDefault();
      if (handleValidation()) {
        dispatchCart({type:"SHOW_ORDER_CONFIRMATION"})
      } else {
        
        return;
      }
    };
  return (
    <form className="checkout-form-wrapper" onSubmit={handleSubmit}>
      <h3 className="form-title">1.Personal Details</h3>
      <PersonalDetails/>
      <Delivery />
      <Payment/>
      <div className="submit-btn-wrapper">
      <button 
      type="submit" 
      className="submit-btn"
      
      >
        Place Order
      </button>
      </div>
    </form>
  )
}

export default CheckoutForm