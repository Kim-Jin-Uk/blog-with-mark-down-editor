import { convertCamelToKebabCase } from "@/common/utils";
import { ButtonInterface, ButtonProperty } from "./types";
import { BasicObject } from "@/common/types";

/**
 * ButtonInterface를 입력받아 class name 배열을 추출하는 함수
 *
 * @param buttonInterface 프로퍼티를 추출할 ButtonInterface
 * @returns buttonInterface로 부터 추출한 class name 배열
 */
export const convertButtonInterfaceToClassName = (
  buttonInterface: ButtonInterface
): string[] => {
  const classNames = [];
  for (const key of Object.getOwnPropertyNames(buttonInterface)) {
    const value = buttonInterface[key];
    if (value) {
      classNames.push(
        `button--${convertCamelToKebabCase(key)}${
          typeof value === "boolean"
            ? ""
            : Array.isArray(value)
            ? `--${value.join("-")}`
            : `--${value}`
        }`
      );
    }
  }
  return classNames;
};
/**
 * 일반 객체를 ButtonInterface로 변환하는 함수
 *
 * @param obj ButtonInterface로 변환할 객체
 * @returns 변환된 ButtonInterface
 */
export const convertObjectToButtonInterface = (
  obj: BasicObject<ButtonProperty>
): ButtonInterface => {
  const buttonInterface = {
    shape: null,
    background: null,
    textColor: null,
    hasBorder: null,
    height: null,
    fontSize: null,
  } as ButtonInterface;
  for (const key of Object.getOwnPropertyNames(obj)) {
    buttonInterface[key] = obj[key];
  }
  return buttonInterface;
};
