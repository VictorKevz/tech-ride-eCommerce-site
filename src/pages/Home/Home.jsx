import React from "react";
import Carousel from "./Carousel/Carousel";
import Categories from "./Categories/Categories";

import "../../Styles/Home.css";
import BestDeals from "./BestDeals/BestDeals";
import FAQs from "./FAQs/FAQs";

function Home() {
  return (
    <section className="home-wrapper">
      <Carousel />
     <Categories/>
     <BestDeals/>
     <FAQs/>
    </section>
  );
}

export default Home;
