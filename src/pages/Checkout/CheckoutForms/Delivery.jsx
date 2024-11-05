// Delivery.js
import React, { useContext } from "react";
import { deliveryData } from "./optionsData";
import CheckoutOptionsSelector from "../../../Components/CheckoutOptionsSelector";
import { DataContext } from "../../../App";


function Delivery() {
  const { cartState } = useContext(DataContext);
  return (
    <CheckoutOptionsSelector
      title="2. Delivery Method"
      optionsData={deliveryData}
      selectedValue={cartState.delivery.method}
      dispatchType="UPDATE_DELIVERY"
      name="delivery-option"
    />
  );
}

export default Delivery;