/** regexp 상수 */
// code-block
/** 코드 블록 패턴 */
export const codeBlockReg = /```([a-z]*)\n([\s\S]*?)```/g;
/** 함수 선언 패턴 */
export const functionReg = /\b(function)\s+([a-zA-Z_$][\w$]*)\b/g;
/** 클래스 선언 패턴 */
export const classReg = /\b(class)\s+([a-zA-Z_$][\w$]*)\b/g;
/** 메소드 호출 패턴 */
export const methodReg = /([a-zA-Z_$][\w$]*)\s*\(/g;
/** 콘솔 패턴 */
export const consoleReg = /\b(console)\b/g;

// link
/** [링크 텍스트](링크 주소 "링크 설명") 형태 */
export const descriptionLinkReg = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g;
/** [링크 텍스트][링크 식별자] 형태 */
export const refferenceLinkReg = /\[([^\]]+)\]\[([^\]]+)\]/g;
/** [링크 식별자]: 링크 주소 "링크 설명" 형태 */
export const propertyLinkReg = /\[([^\]]+)\]:\s*(\S+)(?:\s+"([^"]+)")?/g;
/** URL 형태 */
export const urlLinkReg = /(^|[^"])(https?:\/\/\S+)/g;

/** classname 상수 */
export const codeBlockClass = "code-block";
export const funcClass = "code-func";
export const classClass = "code-class";
export const methodClass = "code-method";
export const consoleClass = "code-console";
