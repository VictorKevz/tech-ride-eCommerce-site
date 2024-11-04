import React, { useContext } from "react";
import { DataContext } from "../../../App";
import "../CheckoutForms/personalDetails.css"

function PersonalDetails() {
  const { cartState } = useContext(DataContext);
  const personalData = [
    {
      id: 0,
      label: "First Name",
      name: "firstName",
      value: cartState.personalDetails.firstName,
      placeholder: "John",
    },
    {
      id: 1,
      label: "Last Name",
      name: "lastName",
      value: cartState.personalDetails.lastName,
      placeholder: "Doe",
    },
    {
      id: 2,
      label: "Email Address",
      name: "email",
      value: cartState.personalDetails.email,
      placeholder: "johndoe@example.com",
    },
    {
      id: 3,
      label: "Phone Number",
      name: "phone",
      value: cartState.personalDetails.phone,
      placeholder: "+123 456 7890",
    },
  ];

  const handleChange = (e) => {
    e.preventDefault()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form className="checkout-form-wrapper" onSubmit={handleSubmit}>
      <section className="personal-wrapper">
        {personalData.map((field) => {
          return (
            <fieldset key={field.id} className="field personal">
              <label className="personal-label" htmlFor={field.id}>{field.label}</label>
              <input
                type="text"
                value={field.value}
                name={field.name}
                id={field.id}
                className={`personal-input`}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            </fieldset>
          );
        })}
      </section>
      <button type="submit" className="buyNow-btn submit-btn">Place Order</button>
    </form>
  );
}

export default PersonalDetails;
