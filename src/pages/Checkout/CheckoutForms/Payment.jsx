import React, { useContext } from "react";
import { paymentData } from "./optionsData";
import CheckoutOptionsSelector from "../../../Components/CheckoutOptionsSelector";
import { DataContext } from "../../../App";

function Payment() {
  const { cartState } = useContext(DataContext);
  return (
    <CheckoutOptionsSelector
      title="3. Payment Method"
      optionsData={paymentData}
      selectedValue={cartState.payment}
      dispatchType="UPDATE_PAYMENT"
      name="payment-option"
    />
    
  );
}

export default Payment;