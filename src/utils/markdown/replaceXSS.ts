import { BasicObject } from "@/types/main/types";

/** 직접적으로 태그형태를 텍스트로만 인식하도록 변경해주는 매퍼 */
const tagReplaceMapper: BasicObject<string> = {
  "&": "&amp;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};
/**
 * 직접적으로 입력한 태그형태를 텍스트로만 인식하도록 변경
 *
 * @param tag 직접적으로 입력한 태그 형태 문자열
 * @returns 문자열로 인식하도록 변경된 문자열
 */
const replaceTag = (tag: string) => tagReplaceMapper[tag] || tag;
/**
 * XSS 취약점을 감지하고 태그형태를 문자열로만 인식하도록 변환한다
 *
 * @param text 공격을 감지할 문자열
 * @returns XSS 취약점을 변환한 문자열
 */
export const replaceXSS = (text: string): string =>
  text.replace(/[&<>"'/]/g, replaceTag);
