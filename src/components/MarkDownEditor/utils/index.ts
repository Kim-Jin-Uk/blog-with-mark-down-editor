/**
 * @copyright 김진욱
 * @description 마크다운형식의 문자열을 HTML로 변환하는 기능을 수행합니다
 * @created 23-05-03
 * @updated 23-05-12
 */

import { convertCodeBlock } from "C-Markdown/utils/toCodeBlock";
import { convertLink } from "C-Markdown/utils/toLink";
import { convertList } from "C-Markdown/utils/toList";
import {
  convertInlineCode,
  convertHorizontalRule,
  convertImg,
  convertSimpleTag,
} from "C-Markdown/utils/toSimples";
import { convertQuote } from "C-Markdown/utils/toQuote";
import { convertTable } from "C-Markdown/utils/toTable";
import { replaceXSS } from "C-Markdown/utils/replaceXSS";

/**
 * 마크다운을 HTML 형태로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @param fns 변환에 사용할 함수 리스트
 * @returns 변환된 HTML
 */
const convertMarkdownToHtml = (
  markdown: string,
  ...fns: ((markdown: string) => string)[]
): string => {
  let html = markdown;
  for (const f of fns) {
    try {
      html = f(html);
    } catch {
      html = html;
    }
  }
  return html;
};

/**
 * 마크다운을 HTML형태의 문자열로 파싱하는 함수
 * @param {string} markdown 변환할 마크다운
 * @returns {string} 변환된 HTML
 */
export const parseMarkdown = (markdown: string): string => {
  const html = convertMarkdownToHtml(
    markdown,
    replaceXSS,
    convertCodeBlock,
    convertInlineCode,
    convertList,
    convertTable,
    convertHorizontalRule,
    convertImg,
    convertLink,
    convertQuote,
    convertSimpleTag
  );
  return html;
};
