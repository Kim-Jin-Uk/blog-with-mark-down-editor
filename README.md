# 마크다운 기능 설명
[마크다운](https://github.com/Kim-Jin-Uk/blog-with-mark-down-editor/blob/main/src/components/MarkDownEditor/utils/MarkDownEditor.md)

## 마크다운 에디터
`Showdown`, `Marked`와 같은 다양한 라이브러리들이 존재하지만 정규식, 문자열을 파싱에 대한 이해도를 높이기 위해 직접 구현하고자 했습니다.

## 직면했던 문제
- Tab 입력
  > * 일반적으로 `textarea` 에서는 tab키를 입력할 수 없습니다.
  > * 이를 개선 하고자 `event.preventDefault()`를 통해 기본 이벤트를 취소하고 `/t`문자열을 추가해 주었습니다.
  > * 이때 `textarea`내부의 문자열을 수정하기에 커서의 위치가 제일 마지막으로 이동하는 문제가 발생합니다.
  > * 이를 개선하고자 `textarea`의 `selectionStart`, `selectionEnd`를 조작하여 해결했습니다.
  > * 이때 `SetState`의 경우 비동기로 처리되므로 위 문제가 해결되지 않습니다.
  > * 이를 개선하고자 `requestAnimationFrame`을 통해 리페인트 이전에 커서 위치를 조작하여 해결했습니다.

- XSS 문제
  > * 텍스트 에디터를 구현함에 있어 XSS 공격을 대비할 필요성을 느꼈습니다
  > * 마크다운 에디터 내에서 지원하는 문법만으로만 태그 입력이 가능케 하도록 처리했습니다
  > `<`와 같이 태그를 여는 문자열의 경우 `&lt;`와 같이 텍스트로만 인식되도록 처리했습니다
