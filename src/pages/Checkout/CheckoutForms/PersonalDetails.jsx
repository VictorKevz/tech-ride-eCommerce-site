import React, { useContext } from "react";
import { DataContext } from "../../../App";
import "../CheckoutForms/checkoutStyles/personalDetails.css";

function PersonalDetails() {
  const { cartState, dispatchCart } = useContext(DataContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatchCart({
      type: "UPDATE_PERSONAL_DETAILS",
      payload: {
        name,
        value,
      },
    });
  };

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

  return (
    <section className="personal-wrapper">
      {personalData.map((field) => {
        return (
          <fieldset key={field.id} className="field personal">
            <label className="personal-label" htmlFor={field.id}>
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              name={field.name}
              id={field.id}
              className={`personal-input`}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
            {!cartState.isValid[field.name] && (
              <span className="error-message">
                Please Provide a valid {field.label}
              </span>
            )}
          </fieldset>
        );
      })}
    </section>
  );
}

export default PersonalDetails;
