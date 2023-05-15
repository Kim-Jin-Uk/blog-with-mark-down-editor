# MarkdownEditor 구현을 위한 유틸리티 함수

## 지원하는 스타일 기능

- 헤더: h
  - `# Header1`,`## Header2` 등
- 볼드체: strong
  - `**Bold**`
- 이텔릭체: em
  - `_Italic_`
- 링크: a
  - `[Link Title](https://test.link.com)`
- 줄바꿈: br
  - `/n`
- 인라인 코드: code
  - `` `Inline Code` ``
- 수평선: hr
  - `---`, `===` 등
- 이미지: img
  - `[Link Title](https://test.link.com)`
- 코드 블록: pre, span, code
  - ` ```Code Block``` `
- 리스트: ul, ol, li
  - `1. Ordered List`, `- UnOrdered List`
- 인용구: blockquote
  - `> Block Quote`
- 테이블: table, thead, tbody, th, tr, td
  - ```
    | head1 | head2 | head3 |
    | :-: | :-: | :-: |
    | row1 | row2 | row3 |
    ```

## 구현 방식

> 정규식을 이용하여 스타일을 감지, 렌더링 화면에서 태그형태로 변환한 텍스트를 보여준다
