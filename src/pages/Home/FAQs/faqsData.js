import deliveryIcon from "../../../assets/images/home/faqs/delivery.svg"
import paymentIcon from "../../../assets/images/home/faqs/payment.svg"
import trackingIcon from "../../../assets/images/home/faqs/tracking.svg"
import returnIcon from "../../../assets/images/home/faqs/return.svg"
import contactIcon from "../../../assets/images/home/faqs/contact.svg"

export const faqsData = [
   
    {
        id: 2,
        question: "What payment methods do you accept?",
        answer: {
            subHeading: "Multiple payment options for your convenience",
            options: [
                "Credit/Debit Cards: Visa, MasterCard, American Express",
                "PayPal: Pay securely through your PayPal account",
                "Apple Pay & Google Pay: Use digital wallets for faster checkout",
                "Cash on Delivery: Available for select regions"
            ]
        },
        icon: paymentIcon
    },
    {
        id: 1,
        question: "What are your delivery options and costs?",
        answer: {
            subHeading: "Three delivery options at low cost",
            options: [
                "Standard Delivery: 5-7 days delivery (Free)",
                "Express Delivery: 2-4 days delivery ($5 per item)",
                "Same-day Delivery: within 24 hours delivery ($5 per item) - location restrictions apply",
            ]
        },
        icon: deliveryIcon
    },
    {
        id: 3,
        question: "How can I track my order?",
        answer: {
            subHeading: "Easy tracking options to keep you updated",
            options: [
                "Once your order ships, you'll receive a confirmation email with a tracking link",
                "You can also track your order through the 'Order History' section in your account",
                "For any delays or updates, we will notify you via email or SMS"
            ]
        },
        icon: trackingIcon
    },
    {
        id: 4,
        question: "Can I return or exchange an item?",
        answer: {
            subHeading: "Straightforward return and exchange policy",
            options: [
                "Items can be returned within 30 days of delivery in original condition",
                "Exchanges are possible for items of equal or lesser value within 30 days",
                "To start a return, visit the 'Returns & Exchanges' page in your account"
            ]
        },
        icon: returnIcon
    },
    {
        id: 5,
        question: "How can I contact Tech & Ride?",
        answer: {
            subHeading: "Multiple contact options",
            options: [
                "Email support@tech-ride.com",
                "Call (123) 456-7890",
                "Visit our website"
            ]
        },
        icon: contactIcon
    }
];