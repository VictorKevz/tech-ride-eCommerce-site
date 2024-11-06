import React from "react";
import { policiesData } from "./policeData";
import "../Policies/policies.css"
function Policies() {
  return (
    <section className="policies-wrapper">
      <h2 className="tab-title">More On Our Policies</h2>
      <div className="policy-container">
        {policiesData.map((policy) => (
          <div key={policy.id} className="policy-item">
            <div className="policy-text">
              <h3 className="dummy-title">{policy.heading}</h3>
              <p className="dummy-parag">{policy.parag}</p>
            </div>
            <div className="policy-icon-wrapper">
                <img src={policy.icon} alt={`Icon illustrating ${policy.heading}`} className="policy-icon" />
                <div className="tab-icon-styled"></div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Policies;
