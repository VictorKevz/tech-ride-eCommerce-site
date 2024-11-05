// data.js
import {
  FlashAuto,
  TaskAlt,
  WorkspacePremium,
  Apple,
  Google,
  Euro,
} from "@mui/icons-material";

export const deliveryData = [
  {
    id: 4,
    label: "Standard",
    value: "standard",
    cost: 0,
    icon: TaskAlt,
    info:"Delivery takes 5-7 days at no extra cost"
  },
  {
    id: 5,
    label: "Express",
    value: "express",
    cost: 5,
    icon: WorkspacePremium,
    info:"Delivery takes 2-4 days at $5 per item"
  },
  { 
    id: 6, 
    label: "Same-day", 
    value: "same-day", 
    cost: 10, 
    icon: FlashAuto,
    info:"Same day delivery at $10 per item" 
  },
];

export const paymentData = [
  { id: 8, label: " Pay", value: "google-pay", icon: Google },
  { id: 9, label: "Cash", value: "cash", icon: Euro },
  { id: 7, label: " Pay", value: "apple-pay", icon: Apple },

];
