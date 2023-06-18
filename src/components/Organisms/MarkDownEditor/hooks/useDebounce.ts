/**
 * @copyright 김진욱
 * @description 다바운싱 변수를 관리하는 훅
 * @created 23-05-03
 * @updated 23-05-03
 */
import { useEffect, useState } from "react";
/**
 * 변수에 디바운싱 적용
 * @param value 디바운싱을 적용할 변수
 * @param delay 디바운싱을 적용할 시간
 * @returns 디바운싱이 적용된 변수
 */
export const useDebounce = <T>(value: T, delay: number = 200): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
