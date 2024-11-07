import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import "../pages/Checkout/CheckoutForms/checkoutStyles/delivery.css";
import { InfoOutlined } from "@mui/icons-material";
function CheckoutOptionsSelector({
  title,
  optionsData,
  selectedValue,
  dispatchType,
  name,
}) {
  const { dispatchCart } = useContext(DataContext);
  const [toolTip, setToolTip] = useState(null);

  const handleTooltip = (currentID) => {
    setToolTip((prevID) => (prevID === currentID ? null : currentID));
  };
  return (
    <section className="delivery-wrapper">
      <h3 className="form-title">{title}</h3>
      {optionsData.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <fieldset key={option.id} className="delivery-field">
            <label
              htmlFor={option.id}
              className={`delivery-label ${isSelected && "selected"}`}
            >
              <input
                type="radio"
                id={option.id}
                name={name}
                value={option.value}
                checked={isSelected}
                className="delivery-input"
                onChange={() =>
                  dispatchCart({
                    type: dispatchType,
                    payload: {
                      value: option.value,
                      cost: option.cost,
                    },
                  })
                }
              />
              <option.icon fontSize="large" /> {option.label}
              {name === "delivery-option" && (
                <button
                  type="button"
                  className="tool-tip-btn"
                  onClick={() => handleTooltip(option.id)}
                >
                  <InfoOutlined fontSize="medium" />
                </button>
              )}
              {toolTip === option.id && name === "delivery-option" && (
                <div className="tool-tip-wrapper">
                  <p className="tip-content">{option.info}</p>
                </div>
              )}
            </label>
          </fieldset>
        );
      })}
    </section>
  );
}

export default CheckoutOptionsSelector;
