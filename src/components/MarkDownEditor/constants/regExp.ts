/** regexp 상수 */
// code-block
/** 코드 블록 패턴 */
export const codeBlockReg = /```([a-z]*)\n([\s\S]*?)```/gm;
/** 함수 선언 패턴 */
export const functionReg = /\b(function)\s+([a-zA-Z_$][\w$]*)\b/gm;
/** 클래스 선언 패턴 */
export const classReg = /\b(class)\s+([a-zA-Z_$][\w$]*)\b/gm;
/** 메소드 호출 패턴 */
export const methodReg = /([a-zA-Z_$][\w$]*)\s*\(/gm;
/** 콘솔 패턴 */
export const consoleReg = /\b(console)\b/gm;

// link
/** [링크 텍스트](링크 주소 "링크 설명") 형태 */
export const descriptionLinkReg =
  /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/gm;
/** [링크 텍스트][링크 식별자] 형태 */
export const refferenceLinkReg = /\[([^\]]+)\]\[([^\]]+)\]/gm;
/** [링크 식별자]: 링크 주소 "링크 설명" 형태 */
export const propertyLinkReg = /\[([^\]]+)\]:\s*(\S+)(?:\s+"([^"]+)")?/gm;
/** URL 형태 */
export const urlLinkReg = /(^|[^"])(https?:\/\/\S+)/gm;

// list
/** ul */
export const unOrderedListReg = /^[-+*]\s+/;
/** ol */
export const orderedListReg = /^\d+\.\s+/;

// simple
export const strongReg = /\*\*(.*?)\*\*/gm;
export const italicReg = /_(.*?)_/gm;
export const breakReg = /\n/gm;
export const inlineCodeReg = /`([^`]+)`/gm;
export const horizontalReg = /^([-*=_]{3,})$/gm;
export const imageReg = /!\[([^\]]+)\]\(([^\s]+)(?:\s+"([^"]+)")?\)/gm;

// table
export const tableReg = /^((\|.*\|)\s*\n)+/gm;
