/**
 * @copyright 김진욱
 * @description 사용자의 입력중 마크다운 형식에 대해 그에 상응하는 HTML을 렌더링 합니다
 * @created 23-05-03
 * @updated 23-05-08
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { parseMarkdown } from "@/utils/markdown";
import { useDebounce } from "@/utils/hooks/customHooks";
import {
  markdownAddStyleMap,
  markdownSetStyleMap,
} from "../../constants/components";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const debounceMarkdown = useDebounce(markdown, 200);
  const [innerHtml, setInnerHtml] = useState("");
  const markdownTextArea: React.MutableRefObject<HTMLTextAreaElement | null> =
    useRef(null);
  /**
   * 마크다운 텍스트 에디터의 Selection 위치를 조절
   *
   * @param newCursorPosition 변경시킬 포지션
   */
  const setMarkdownTextAreaSelection = (newCursorPosition: number) => {
    // setMarkdown은 비동기 이므로 리페인트 이전에 호출되는 requestAnimationFrame을 통해 커서 위치를 조정
    const textarea = markdownTextArea.current as HTMLTextAreaElement;

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = newCursorPosition;
      textarea.selectionEnd = newCursorPosition;
      textarea.scrollTop = textarea.scrollHeight;
    });
  };

  /**
   * 선택 영역에 스타일을 추가하는 함수
   */
  const setStyle = useCallback(
    (styleKey: string, start: number, end: number) => {
      if (!markdownSetStyleMap.has(styleKey)) return false;
      const [addStyleStart, addStyleEnd] = markdownSetStyleMap.get(
        styleKey
      ) as string[];
      const newMarkdown = `${markdown.substring(0, start)}${
        addStyleStart + markdown.substring(start, end) + addStyleEnd
      }${markdown.substring(end)}`;
      setMarkdown(newMarkdown);
      const newCursorPosition =
        end + addStyleStart?.length + addStyleEnd?.length;
      setMarkdownTextAreaSelection(newCursorPosition);
      return true;
    },
    [markdown]
  );
  /**
   * 스타일(기본 문구 포함)을 추가하는 함수
   */
  const addStyle = useCallback(
    (key: string) => {
      const styleText = markdownAddStyleMap.get(key) as string;
      const textarea = markdownTextArea.current as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = textarea;
      if (selectionStart !== selectionEnd) {
        const isSetStyle = setStyle(key, selectionStart, selectionEnd);
        if (isSetStyle) return;
      }
      const newMarkdown = `${markdown.substring(
        0,
        selectionStart
      )}${styleText}${markdown.substring(selectionEnd)}`;
      setMarkdown(newMarkdown);
      const newCursorPosition = selectionStart + styleText?.length;
      setMarkdownTextAreaSelection(newCursorPosition);
    },
    [markdown, setStyle]
  );
  /**
   * 사용자의 입력이 탭이면 감지해서 \t값을 넣어준다
   *
   * @param event 사용자의 입력 이벤트
   */
  const tabHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const textarea = markdownTextArea.current as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = textarea;
      const newMarkdown = `${markdown.substring(
        0,
        selectionStart
      )}\t${markdown.substring(selectionEnd)}`;
      setMarkdown(newMarkdown);
      const newCursorPosition = selectionStart + 1;
      setMarkdownTextAreaSelection(newCursorPosition);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  /**
   * 스타일 추가가 가능한 버튼 렌더링
   */
  const renderAddStyleButtons = (): JSX.Element[] => {
    const addStyleButtons: JSX.Element[] = [];
    markdownAddStyleMap.forEach((_, key) => {
      const addStyleButton = (
        <button key={key} onClick={() => addStyle(key)}>
          {key}
        </button>
      );
      addStyleButtons.push(addStyleButton);
    });
    return addStyleButtons;
  };

  /** 모든 변화에 대해 파싱을 적용하면 비효율적이기에 디바운싱을 적용 */
  useEffect(
    () => setInnerHtml(parseMarkdown(debounceMarkdown)),
    [debounceMarkdown]
  );

  return (
    <>
      {renderAddStyleButtons()}
      <textarea
        ref={markdownTextArea}
        value={markdown}
        onKeyDown={tabHandler}
        onChange={handleChange}
      />
      <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </>
  );
};

export default MarkdownEditor;
