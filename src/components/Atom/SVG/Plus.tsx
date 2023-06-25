import React from "react";
import { ColorProps } from "./types";

const Plus = ({ color }: ColorProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg--inner-button--height-24px"
    >
      <rect
        x="3.33594"
        y="9.26562"
        width="13.3333"
        height="1.48148"
        style={{ fill: color }}
      />
      <rect
        x="10.7422"
        y="3.33594"
        width="13.3333"
        height="1.48148"
        transform="rotate(90 10.7422 3.33594)"
        style={{ fill: color }}
      />
    </svg>
  );
};

export default Plus;
