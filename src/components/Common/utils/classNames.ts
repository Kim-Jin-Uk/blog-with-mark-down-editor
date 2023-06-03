import { BasicObject } from "@/common/types";

/**
 * 객체 형태의 class names를 문자열로 변환해주는 함수
 *
 * @param classes element에 적용할 class를 프로퍼티로 갖는 객체
 * @returns element에 적용할 수 있도록 문자열 형태로 가공한 class name
 */
export const classNames = (classes: BasicObject<boolean>) => {
  return Object.entries(classes)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ");
};
