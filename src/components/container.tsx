import { FONTSIZE, FONTWEIGHT } from "@/constants/constant";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  idx?: number;
  title?: string;
  cls?: string;
  addedCls?: string;
};

const Container: React.FC<Props> = ({
  children,
  title,
  cls = "basicContainer",
  addedCls,
}) => {
  return (
    <motion.section className={`${cls} ${addedCls}`}>
      {title ? (
        <h3
          style={{
            fontSize: FONTSIZE.L,
            marginBottom: "1em",
            fontWeight: FONTWEIGHT.M,
          }}
        >
          {title}
        </h3>
      ) : (
        <></>
      )}
      {children}
    </motion.section>
  );
};

export default Container;
