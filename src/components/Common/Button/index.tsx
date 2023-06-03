import React, { lazy, Suspense } from "react";
import { ButtonProps } from "./type";
import { classNames } from "@/components/Common/utils";

const Button = ({
  children,
  type = "",
  svg = null,
  onClick = () => "",
}: ButtonProps) => {
  const classes = classNames({
    button: true,
    [`button--${type}`]: type !== "",
  });

  const imageMapper = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>([
    ["follow", lazy(() => import("../../../images/Follow"))],
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
