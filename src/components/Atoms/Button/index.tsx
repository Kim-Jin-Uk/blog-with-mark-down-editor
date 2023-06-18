import React, { lazy, Suspense } from "react";
import { ButtonProps } from "./types";
import { classNames } from "@/common/utils";
import { convertButtonClassToClassName } from "./utils";

const Button = ({
  children,
  buttonClass,
  svg = null,
  onClick = () => "",
}: ButtonProps) => {
  const buttonClassNames = convertButtonClassToClassName(buttonClass);
  const classes = ["button", ...buttonClassNames].join(" ");
  console.log(classes, buttonClassNames, buttonClass);
  const imageMapper = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>([
    ["follow", lazy(() => import("../SVG/Follow"))],
  ]);

  const SVG = svg && imageMapper.has(svg) && imageMapper.get(svg);
  return (
    <>
      <button onClick={onClick} className={classes}>
        <Suspense fallback={<div>로딩 중. . .</div>}>{SVG && <SVG />}</Suspense>
        {children}
      </button>
    </>
  );
};

export default Button;
