/**
 * @copyright 김진욱
 * @description 링크 형식을 HTML로 변환하는 기능을 수행합니다
 * @convertCase a
 * @created 23-05-03
 * @updated 23-05-08
 */

import {
  descriptionLinkReg,
  refferenceLinkReg,
  propertyLinkReg,
  urlLinkReg,
} from "@/components/Organism/MarkDownEditor/constants/regExp";
import { linkConverterFor } from "@/components/Organism/MarkDownEditor/utils/makeHtml";

/**
 * 마크다운 내부의 링크 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertLink = (markdown: string): string => {
  const html = markdown
    // 링크 변환
    .replace(descriptionLinkReg, (_, p1, p2, p3) =>
      linkConverterFor(p2, p3, p1)
    )
    // 참조 링크 변환
    .replace(refferenceLinkReg, (_, p1, p2) => linkConverterFor(p2, "", p1))
    // 링크 설명 변환
    .replace(propertyLinkReg, (_, p1, p2, p3) =>
      linkConverterFor(p2, p3 || "", p1)
    )
    // URL 변환
    .replace(urlLinkReg, (_, p1, p2) => linkConverterFor(p2, "", p2, p1));

  return html;
};
