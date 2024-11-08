import motorcycles from "../../assets/images/categories/motorcycle.svg";
import car from "../../assets/images/categories/car.svg";
import tablets from "../../assets/images/categories/tablets.svg";
import laptops from "../../assets/images/categories/computers.svg";

import motorcyclesMobile from "../../assets/images/categories/mobile/motorcycle.svg";
import carMobile from "../../assets/images/categories/mobile/cars.svg";
import tabletsMobile from "../../assets/images/categories/mobile/tablets.svg";
import laptopsMobile from "../../assets/images/categories/mobile/computers.svg";

export const categoryHeaderData = {
  motorcycle: {
    bgImage: { desktop: motorcycles, mobile: motorcyclesMobile },
    heading: "Motorcycles",
    parag:
      "Explore our selection of motorcycles, from sport bikes to adventure models.",
  },
  vehicle: {
    bgImage: { desktop: car, mobile: carMobile },
    heading: "Super Cars",
    parag: "Discover the latest smartphones with cutting-edge technology.",
  },
  tablets: {
    bgImage: { desktop: tablets, mobile: tabletsMobile },
    heading: "Tablets",
    parag: "Find the perfect tablet for work, play, or both.",
  },
  laptops: {
    bgImage: { desktop: laptops, mobile: laptopsMobile },
    heading: "Laptops",
    parag: "Browse our range of high-performance laptops.",
  },
};
