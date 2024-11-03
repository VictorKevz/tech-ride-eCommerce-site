import React, { useState } from "react";
import "../../../Styles/tabs.css";
import illustration from "../../../assets/images/illustration.webp";
import profile from "../../../assets/images/profile.png";
import { Star } from "@mui/icons-material";

function Tabs({ productObj }) {
  const [tab, setTab] = useState("Details");
  const tabsData = [
    {
      id: 0,
      tabName: "Details",
    },
    {
      id: 1,
      tabName: "Reviews",
    },
    {
      id: 2,
      tabName: "Policies",
    },
  ];
  return (
    <section className="tabs-wrapper">
      <header className="tabs-header">
        {tabsData.map((tabObj) => {
          const isActive = tabObj.tabName === tab;

          return (
            <button
              key={tabObj.id}
              type="button"
              className={`tab-btn ${isActive && "active-tab"}`}
              onClick={() => setTab(tabObj.tabName)}
            >
              {tabObj.tabName}
            </button>
          );
        })}
      </header>
      <div className="tab-info-wrapper">
        {tab === "Details" && (
          <div className="details-tab">
            <article className="tab-text-wrapper">
              <h2 className="tab-title">{productObj?.title}</h2>
              <p className="tab-parag">{productObj?.description}</p>
              <div className="dummy-holder">
                <h3 className="dummy-title">Sub Heading</h3>
                <p className="tab-parag">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Adipisci, eos eum, nostrum exercitationem iure porro quisquam
                  necessitatibus, ad dolor aut assumenda voluptatibus
                  accusantium alias. Culpa eos hic sint quam autem.
                </p>
                <p className="tab-parag">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Adipisci, eos eum, nostrum exercitationem iure porro quisquam
                  necessitatibus, ad dolor aut assumenda voluptatibus
                  accusantium alias. Culpa eos hic sint quam autem.
                </p>
              </div>
            </article>
            <div className="tab-image-wrapper">
              <img
                src={illustration}
                alt="Product Illustration Image"
                className="details-img"
              />
            </div>
          </div>
        )}
        {tab === "Reviews" && (
          <div className="reviews-tab">
            <div className="tab-text-wrapper">
              <h2 className="tab-title">What Clients Our Say!</h2>
              <p className="tab-parag">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore ratione accusamus consectetur atque nam possimus
                sapiente ad nemo facilis suscipit.
              </p>
            </div>
            <div className="review-grid">
              {productObj?.reviews.map((review, index) => {
                const dateString = review.date;
                const date = new Date(dateString);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                const day = String(date.getDate()).padStart(2, "0");

                // Formatting the date
                const formattedDate = `${year}-${month}-${day}`;

                return (
                  <div key={index} className="review-card">
                    <header className="card-header">
                      <div className="profile-wrapper">
                        <img
                          src={profile}
                          alt="Profile picture illustration"
                          className="profile-img"
                        />
                      </div>
                      <div className="name-email">
                        <h3 className="reviewer-name">
                          {review?.reviewerName}
                        </h3>
                        <p className="reviewer-email">
                          {review?.reviewerEmail}
                        </p>
                      </div>
                    </header>
                    <div className="review-body">
                      <p className="comment">{review?.comment}</p>
                      <p className="comment">
                        "Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Accusantium esse suscipit mollitia!"
                      </p>
                      <div className="review-footer">
                        <p className="date">{formattedDate}</p>
                        <div className="rating-wrapper">
                          {Array.from({ length: 5 }, (_, index) => {
                            const isFilled = index < review?.rating;
                            return (
                              <Star
                                key={index}
                                fontSize="large"
                                className={`star-icon ${isFilled && "filled"}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab === "Policies" && <div className="policies-tab"></div>}
      </div>
    </section>
  );
}

export default Tabs;