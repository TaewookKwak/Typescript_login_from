import { FONTSIZE, FONTWEIGHT } from "@/constants/constant";
import React from "react";

type Props = {
  children?: React.ReactNode;
  idx?: number;
  title?: string;
};

const Container: React.FC<Props> = ({ children, title }) => {
  return (
    <section className="basicContainer">
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
