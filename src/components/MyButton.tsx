import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface ButtonProp {
  title: string;
  onClickBtn: (e: React.MouseEvent<HTMLElement>) => void;
}

export const MyButton = ({ title, onClickBtn }: ButtonProp) => {
  return (
    <StyledButtonType1
      whileTap={{ scale: 1.1 }}
      onClick={onClickBtn}
      className="btn-type1"
    >
      {title}
    </StyledButtonType1>
  );
};

const StyledButtonType1 = styled(motion.button)`
  background-color: #9898a0;
  font-size: 1em;
  font-weight: 600;
  color: white;
  padding: 0.7em 1em;
  margin-right: 1em;
  border: none;
  border-radius: 10px;
  &:hover {
    transition: all 300ms ease;
    background-color: #20bfa9;
  }
`;
