/**
 * @copyright 김진욱
 * @description 간단한 정규식으로 변환가능한 태그 형식을 HTML로 변환하는 기능을 수행합니다
 * @convertCase h, strong, em, a, br, code, hr, img
 * @created 23-05-03
 * @updated 23-05-08
 */

import {
  breakReg,
  horizontalReg,
  imageReg,
  inlineCodeReg,
  italicReg,
  strongReg,
} from "@/components/Organisms/MarkDownEditor/constants/regExp";
import { headConverterFor } from "@/components/Organisms/MarkDownEditor/utils/makeHtml";

/**
 * 마크다운 내부의 (h, strong, em, a, br) 태그 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertSimpleTag = (markdown: string): string => {
  const html = headConverterFor(markdown, [1, 2, 3, 4, 5, 6])
    // 볼드체 변환
    .replace(strongReg, "<strong>$1</strong>")
    // 이탤릭체 변환
    .replace(italicReg, "<em>$1</em>")
    // 줄바꿈 변환
    .replace(breakReg, "<br>");
  return html;
};
/**
 * 마크다운 내부의 인라인 코드 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertInlineCode = (markdown: string): string => {
  const html = markdown.replace(inlineCodeReg, "<code>$1</code>");
  return html;
};
/**
 * 마크다운 내부의 수평선 코드 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertHorizontalRule = (markdown: string): string => {
  const html = markdown.replace(horizontalReg, "<hr>");
  return html;
};
/**
 * 마크다운 내부의 이미지 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertImg = (markdown: string): string => {
  const html = markdown.replace(imageReg, '<img src="$2" alt="$1" title="$3">');
  return html;
};
