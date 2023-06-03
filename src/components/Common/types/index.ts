import { ReactNode } from "react";

export type ButtonType = "" | "main" | "black" | "white";

export interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  svg?: string | null;
  onClick?: () => void;
}
