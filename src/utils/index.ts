import { BasicObject } from "@/types";

export const classNames = (classes: BasicObject<boolean>) => {
  return Object.entries(classes)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ");
};
