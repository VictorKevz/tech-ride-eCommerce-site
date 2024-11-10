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
      "Embrace the freedom of the open road with our dynamic range of motorcycles, each designed for exceptional performance and style. With models built for speed, adventure, or city commuting, there’s a bike to suit every rider's needs.",
  },
  vehicle: {
    bgImage: { desktop: car, mobile: carMobile },
    heading: "Super Cars",
    parag: "Experience the thrill of driving with our premium selection of cars, crafted to deliver unmatched performance and comfort. From cutting-edge technology to luxurious interiors, these vehicles are built to elevate every journey.",
  },
  tablets: {
    bgImage: { desktop: tablets, mobile: tabletsMobile },
    heading: "Tablets",
    parag: "Explore a variety of tablets that blend functionality with portability, making them ideal for both personal and professional use. Featuring high-resolution displays and fast processors, these devices are perfect for streaming, sketching, or staying productive on the go.",
  },
  laptops: {
    bgImage: { desktop: laptops, mobile: laptopsMobile },
    heading: "Laptops",
    parag: "Our range of powerful laptops designed to meet the demands of work, gaming, and creative pursuits. Equipped with the latest processors, crisp displays, and ample storage, these machines handle multitasking effortlessly.",
  },
};
