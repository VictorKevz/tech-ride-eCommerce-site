import React, { useState } from "react";
import "./faqs.css";
import { faqsData } from "./faqsData";
import { Add, Check, Remove } from "@mui/icons-material";

function FAQs() {
  const [faqIds, setFaqIds] = useState([1]);

  const updateFaqs = (currentID) => {
    setFaqIds((prevId) => {
      const isAdded = prevId.includes(currentID);
      if (isAdded) {
        return prevId.filter((id) => id !== currentID);
      } else return [...prevId, currentID];
    });
  };

  return (
    <section className="faqs-main-wrapper">
      <h2 className="faqs-title">FAQs</h2>
      <article className="accordion-wrapper">
        {faqsData.map((obj) => {
          const isOpen = faqIds.includes(obj.id);
          return (
            <div key={obj.id} className="accordion-item">
              <header
                className="accordion-header"
                onClick={() => updateFaqs(obj.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${obj.id}`}
                role="button"
              >
                <h3 className="question">{obj.question}</h3>
                <button
                  type="button"
                  className={`accordion-btn ${isOpen && "blue"}`}
                >
                  {isOpen ? (
                    <Remove fontSize="large" />
                  ) : (
                    <Add fontSize="large" />
                  )}
                </button>
              </header>
              {isOpen && (
                <div
                  id={`faq-content-${obj.id}`}
                  role="region"
                  aria-labelledby={`faq-header-${obj.id}`}
                  className={isOpen ? "content-wrapper" : "hidden"}
                  aria-hidden={!isOpen}
                >
                  <h4 className="sub-heading">{obj.answer.subHeading}</h4>
                  <div className="icon-text-wrapper">
                    <img
                      src={obj.icon}
                      alt={`Icon illustrating the question: ${obj.question}`}
                      className="accordion-icon"
                    />
                    <ul className="text-wrapper">
                      {obj.answer.options.map((option, i) => (
                        <li key={i} className="option">
                          <Check fontSize="large" />
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </article>
    </section>
  );
}

export default FAQs;
