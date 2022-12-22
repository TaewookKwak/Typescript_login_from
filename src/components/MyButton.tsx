import React from "react";
import { motion } from "framer-motion";

interface ButtonProp {
  title: string;
}

export const MyButton = ({ title }: ButtonProp) => {
  return (
    <motion.button whileTap={{ scale: 1.4 }} className="button-type1">
      {title}
    </motion.button>
  );
};
