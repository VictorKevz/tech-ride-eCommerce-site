export const productCardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      delay: 0.2 * i,
      ease: "easeInOut",
      duration: 0.7,
    },
  }),
  exit: {
    opacity: 0.5,
    y: 100,
    scale: 0.5,

    transition: {
      type: "tween",
      delay: 0.35,
      ease: "easeInOut",
      duration: 0.7,
    },
  },
};

export const cartVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      type: "tween",
      delay: 0.25,
   
      duration: 0.5,
    },
  },
};

export const detailsCheckoutVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "right" ? 100 : -100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      delay: 0.2,
      ease: "easeInOut",
      duration: 0.7,
    },
  },
};

export const sliderVariants = (direction) => (
    {
        hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.7,
          },
        },
        exit: {
          opacity: 0,
          x: direction === "left" ? 30 : -30,
          transition: { duration: 0.3, type: "tween", ease: "easeInOut" },
        },
      }
);

export const categoryPageVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: "-50%",
    transition: {
      type: "tween",
      
   
      duration: 0.3,
    },
  },
};