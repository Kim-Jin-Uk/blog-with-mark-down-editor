import { None, BasicObject } from "@/common/types";
import { ReactNode } from "react";

export type ButtonShape = "round" | "square";
export type ButtonBackground = "white" | "black" | "blue";
export type ButtonTextColor = "black" | "blue" | "red" | "white";
export type ButtonAlign = "left" | "right";

export type ButtonProperty =
  | ButtonShape
  | ButtonBackground
  | ButtonTextColor
  | ButtonAlign
  | boolean
  | number
  | number[]
  | None;

export interface ButtonInterface extends BasicObject<ButtonProperty> {
  shape: ButtonShape | None;
  background: ButtonBackground | None;
  textColor: ButtonTextColor | None;
  hasBorder: boolean | None;
  height: number | None;
  width: number | None;
  fontSize: number | None;
  padding: number[] | None;
  align: ButtonAlign | None;
  isNotActive: boolean | None;
}

export interface ButtonProps {
  children: ReactNode;
  buttonInterface: ButtonInterface;
  svg?: string | null;
  onClick?: () => void;
}
