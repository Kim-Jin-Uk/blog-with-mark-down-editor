import { None, BasicObject } from "@/common/types";
import { ReactNode } from "react";

export type ButtonShape = "round" | "square";
export type ButtonBackground = "white" | "black" | "blue";
export type ButtonTextColor = "black" | "blue" | "red" | "white";

export class ButtonClass extends BasicObject<
  ButtonShape | ButtonBackground | ButtonTextColor | boolean | number
> {
  shape: ButtonShape;
  background: ButtonBackground;
  textColor: ButtonTextColor;
  hasBorder: boolean;
  height: number;
  fontSize: number;
  constructor(
    shape: ButtonShape | None,
    background: ButtonBackground | None,
    textColor: ButtonTextColor | None,
    hasBorder: boolean | None,
    height: number | None,
    fontSize: number | None
  ) {
    super();
    this.shape = shape || "round";
    this.background = background || "white";
    this.textColor = textColor || "black";
    this.hasBorder = hasBorder || false;
    this.height = height || 28;
    this.fontSize = fontSize || 14;
  }
}

export interface ButtonProps {
  children: ReactNode;
  buttonClass: ButtonClass;
  svg?: string | null;
  onClick?: () => void;
}
