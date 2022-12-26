import React from "react";
import { motion } from "framer-motion";

interface ButtonProp {
  title: string;
  onClickBtn: (e: React.MouseEvent<HTMLElement>) => void;
}

export const MyButton = ({ title, onClickBtn }: ButtonProp) => {
  return (
    <motion.button
      whileTap={{ scale: 1.1 }}
      className="button-type1"
      onClick={onClickBtn}
    >
      {title}
    </motion.button>
  );
};
