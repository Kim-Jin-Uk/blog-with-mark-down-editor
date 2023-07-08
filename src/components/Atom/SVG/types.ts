import { None } from "@/common/types";

export interface ColorProps {
  color: string | None;
}

export interface LogoProps extends ColorProps {
  width: number | None;
  height: number | None;
}
