import deliveryIcon from "../../../../assets/images/home/faqs/delivery.svg";
import returnIcon from "../../../../assets/images/home/faqs/return.svg";
import contactIcon from "../../../../assets/images/home/faqs/contact.svg";

export const policiesData = [
  {
    id: 1,
    heading: "Shipping Policy",
    parag:
      "Our shipping policy ensures that all orders are processed and shipped within 2-3 business days. We partner with reliable couriers to provide timely deliveries, with tracking provided for each order. Shipping costs may vary based on the destination and the selected delivery option. If you experience delays, please contact our support team for assistance.",
    icon: deliveryIcon,
  },
  {
    id: 2,
    heading: "Return Policy",
    parag:
      "We offer a 30-day return policy for eligible items. To initiate a return, please ensure the item is in its original condition and packaging. Once we receive and inspect the returned product, a refund will be processed to the original payment method. Please note that return shipping fees may apply, and some items may be non-returnable based on their condition or customization.",
    icon: returnIcon,
  },
  {
    id: 3,
    heading: "Warranty Policy",
    parag:
      "All products come with a standard one-year warranty covering manufacturing defects. Warranty claims require proof of purchase and may be subject to inspection. Our warranty policy does not cover damages from misuse, unauthorized repairs, or accidental incidents. For extended warranty options, please check with our customer support or during the checkout process.",
    icon: contactIcon,
  },
];
