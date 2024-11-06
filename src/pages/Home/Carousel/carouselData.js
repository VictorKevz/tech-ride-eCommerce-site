import motorcycle from "../../../assets/images/home/carousel/motorcycle.svg";
import computers from "../../../assets/images/home/carousel/computers.svg";
import car from "../../../assets/images/home/carousel/cars.svg";
import tablets from "../../../assets/images/home/carousel/tablets.svg";

import motorcycleMobile from "../../../assets/images/home/carousel/mobile/motorcycle.svg";
import computersMobile from "../../../assets/images/home/carousel/mobile/computers.svg";
import carMobile from "../../../assets/images/home/carousel/mobile/cars.svg";
import tabletsMobile from "../../../assets/images/home/carousel/mobile/tablets.svg";

export const carouselData = [
  {
    id: 0,
    headingText: "Motorcycles",
    parag: "Explore powerful motorcycles for every adventure.",
    imgSrc: { mobile: motorcycleMobile, desktop: motorcycle },
    path: "/motorcycle",
  },

  {
    id: 1,
    headingText: "Super Cars",
    parag: "Shop Cars with top-notch features and design.",
    imgSrc: { mobile: carMobile, desktop: car },
    path: "/vehicle",
  },

  {
    id: 2,
    headingText: "Computers",
    parag: "Find high-performance computers for work and play.",
    imgSrc: { mobile: computersMobile, desktop: computers },
    path: "/laptops",
  },
  {
    id: 3,
    headingText: "Tablets",
    parag: "Discover tablets for work, creativity, and entertainment.",
    imgSrc: { mobile: tabletsMobile, desktop: tablets },
    path: "/tablets",
  },
];
