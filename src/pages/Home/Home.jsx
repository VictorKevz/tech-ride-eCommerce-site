import React from "react";
import Carousel from "./Carousel/Carousel";
import Categories from "./Categories/Categories";

import "../../Styles/Home.css";
import BestDeals from "./BestDeals/BestDeals";

function Home() {
  return (
    <section className="home-wrapper">
      <Carousel />
     <Categories/>
     <BestDeals/>
    </section>
  );
}

export default Home;
