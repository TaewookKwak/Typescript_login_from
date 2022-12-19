import { FONTSIZE, FONTWEIGHT } from "@/constants/constant";
import React from "react";

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
    <section className={`${cls} ${addedCls}`}>
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
    </section>
  );
};

export default Container;
