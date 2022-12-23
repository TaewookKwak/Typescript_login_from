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
    <motion.section
      exit={{ opacity: 0, x: 1000 }}
      className={`${cls} ${addedCls}`}
    >
      {title ? (
        <motion.h3
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: FONTSIZE.L,
            marginBottom: "1em",
            fontWeight: FONTWEIGHT.M,
          }}
        >
          {title}
        </motion.h3>
      ) : (
        <></>
      )}
      {children}
    </motion.section>
  );
};

export default Container;
