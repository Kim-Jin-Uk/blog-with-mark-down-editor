import React, { lazy, Suspense } from "react";
import { ButtonProps } from "./types";
import { convertButtonInterfaceToClassName } from "./utils";

import Follow from "@/components/Atom/SVG/Follow";
import All from "@/components/Atom/SVG/All";
import DataStructure from "@/components/Atom/SVG/DataStructure";

const Button = ({
  children,
  buttonInterface,
  svg = null,
  onClick = () => "",
}: ButtonProps) => {
  const buttonClassNames = convertButtonInterfaceToClassName(buttonInterface);

  const classes = ["button", ...buttonClassNames].join(" ");

  const imageMapper = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>([
    ["follow", Follow],
    ["all", All],
    ["dataStructure", DataStructure],
  ]);

  const SVG = svg && imageMapper.has(svg) && imageMapper.get(svg);
  return (
    <>
      <button onClick={onClick} className={classes}>
        {svg && (
          <Suspense fallback={<div>로딩 중...</div>}>{SVG && <SVG />}</Suspense>
        )}
        {children}
      </button>
    </>
  );
};

export default Button;
