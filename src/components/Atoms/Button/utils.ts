import { convertCamelToKebabCase } from "@/common/utils";
import { ButtonClass } from "./types";

/**
 * ButtonClass를 입력받아 class name 배열을 추출하는 함수
 *
 * @param buttonClass 프로퍼티를 추출할 ButtonClass
 * @returns buttonClass로 부터 추출한 class name 배열
 */
export const convertButtonClassToClassName = (
  buttonClass: ButtonClass
): string[] => {
  const classNames = [];
  for (const key of Object.getOwnPropertyNames(buttonClass)) {
    const value = buttonClass[key];
    console.log(key, value, !!value);
    if (value) {
      classNames.push(
        `${convertCamelToKebabCase(key)}${
          typeof value === "boolean" ? "" : `--${value}`
        }`
      );
    }
  }
  return classNames;
};
