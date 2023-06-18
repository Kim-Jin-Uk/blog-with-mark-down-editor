/**
 * @copyright 김진욱
 * @description 마크다운 변환 함수에서 사용할 HTML로 변환하는 기능을 수행합니다
 * @created 23-05-08
 * @updated 23-05-08
 */
/**
 * replaceValue에 새로운 span 태그를 추가해준다
 *
 * @param beforeValue 기존 replaceValue
 * @param className
 * @param idx
 * @returns span 태그를 추가한 replaceValue
 */
const addSpanFor = (
  beforeValue: string,
  className: string,
  idx: number
): string => {
  return `${beforeValue} <span class="${className}">${idx + 1}</span>`;
};
/**
 * className 배열을 입력받아 span태그 형태로 변환하는 replaceValue를 생성한다
 *
 * @param classNames className 배열
 * @returns replaceValue
 */
export const spanConverterFor = (...classNames: string[]): string => {
  const replaceValue = classNames.reduce(
    (html: string, className: string, idx: number) => {
      return addSpanFor(html, className, idx);
    },
    ""
  );
  return replaceValue;
};
/**
 * innerCode를 코드 블록으로 감싸준다
 *
 * @param lang code block의 언어 설정
 * @param innerCode code block 내부의 코드
 * @returns 코드 블록 형태로 변환된 HTML
 */
export const makeCodeBlockTagFor = (
  lang: string,
  innerCode: string
): string => {
  const HTML = `<pre class="code-block"><code class="${lang}">${innerCode}</code></pre>`;
  return HTML;
};
/**
 * 링크 주소, 제목, 내용, 대체 텍스트를 입력받아 HTML형태로 변환
 *
 * @param href
 * @param tile
 * @param contents
 * @param head link를 설명하는 문구
 * @returns 변환된 HTML
 */
export const linkConverterFor = (
  href: string = "",
  tile: string = "",
  contents: string = "",
  head: string = ""
): string => {
  const HTML = `${head}<a href="${href}" title="${tile}">${contents}</a>`;
  return HTML;
};
/**
 *  before, tag, value를 입력받아 HTML형태로 변환
 *
 * @param before 이전 리스트를 닫는 문자열
 * @param tag 현재 태그이름
 * @param value 태그의 값
 * @returns 변환된 HTML
 */
export const listConverterFor = (
  before: string = "",
  tag: string = "",
  value: string
) => {
  const HTML = `${before}${tag}<li>${value}</li>`;
  return HTML;
};

/**
 * Header 숫자를 입력받아 그에 맞는 정규식 리턴
 *
 * @param headNum Header 숫자
 * @returns 헤더에 맞는 정규식
 */
export const getHeaderRegFor = (headNum: number): RegExp =>
  new RegExp(`^${"#".repeat(headNum)}\\s(.*)$`, "gm");
/**
 * Header을 감짛서 HTML 형태로 변환
 *
 * @param before 원본 문자열
 * @param headNums 변환할 Header태그들의 숫자 배열
 * @returns 변환된 HTML
 */
export const headConverterFor = (before: string, headNums: number[]) => {
  let HTML = before;
  for (const headNum of headNums) {
    HTML = HTML.replace(
      getHeaderRegFor(headNum),
      `<h${headNum}>$1</h${headNum}>`
    );
  }
  return HTML;
};
/**
 * 정렬방식, 내부 값, 헤더 여부를 입력받아 row형태의 HTML을 생성하는 함수
 *
 * @param align 정렬 방식
 * @param value cell의 값
 * @param isHeader header 여부
 * @returns 변환된 row 형태의 HTML
 */
export const makeTableRow = (
  align: string,
  value: string,
  isHeader: boolean
) => {
  const HTML = `<t${
    isHeader ? "h" : "d"
  } style="text-align: ${align}">${value}</t${isHeader ? "h" : "d"}>`;
  return HTML;
};
