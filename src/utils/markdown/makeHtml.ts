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

export const linkConverterFor = (
  href: string = "",
  tile: string = "",
  contents: string = "",
  head: string = ""
): string => {
  const HTML = `${head}<a href="${href}" title="${tile}">${contents}</a>`;
  return HTML;
};
