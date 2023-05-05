/**
 * @copyright 김진욱
 * @description 코드 블록 형식을 HTML로 변환하는 기능을 수행합니다
 * @convertCase pre, span, code
 * @created 23-05-03
 * @updated 23-05-03
 */

import {
  codeBlockReg,
  functionReg,
  funcClass,
  classReg,
  classClass,
  methodReg,
  methodClass,
  consoleReg,
  consoleClass,
} from "@/constants/utils";
import { makeCodeBlockTagFor, spanConverterFor } from "./makeHtml";

/**
 * 마크다운 내부의 코드 블록 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertCodeBlock = (markdown: string): string => {
  const html = markdown.replace(
    // 코드블록 형태를 찾는 정규식
    codeBlockReg,
    (_, lang: string, code: string) => {
      // 디폴트 값은 text lang에는 javascript, typescript등이 올 수 있다
      // TODO: 추후 java, python등의 언어 추가
      lang = lang.trim() || "text";
      const highlightedCode = code
        .replace(functionReg, spanConverterFor(funcClass, funcClass))
        .replace(classReg, spanConverterFor(classClass, classClass))
        .replace(methodReg, spanConverterFor(methodClass))
        .replace(consoleReg, spanConverterFor(consoleClass));
      return makeCodeBlockTagFor(lang, highlightedCode.trim());
    }
  );
  return html;
};
