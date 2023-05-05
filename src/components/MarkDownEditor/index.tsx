/**
 * @copyright 김진욱
 * @description 사용자의 입력중 마크다운 형식에 대해 그에 상응하는 HTML을 렌더링 합니다
 * @created 23-05-03
 * @updated 23-05-03
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
  const addStyleButtonMap = new Map<string, string>([
    ["h1", "H1"],
    ["h2", "H2"],
    ["h3", "H3"],
    ["strong", "Bold"],
  ]);

  const setMarkdownTextAreaSelection = (newCursorPosition: number) => {
    // setMarkdown은 비동기 이므로 리페인트 이전에 호출되는 requestAnimationFrame을 통해 커서 위치를 조정
    const textarea = markdownTextArea.current as HTMLTextAreaElement;
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = newCursorPosition;
      textarea.selectionEnd = newCursorPosition;
    });
  };

  const setStyle = useCallback(
    (styleKey: string, start: number, end: number) => {
      if (!markdownSetStyleMap.has(styleKey)) return;
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
    },
    [markdown]
  );

  const addStyle = useCallback(
    (styleKey: string) => {
      if (!markdownAddStyleMap.has(styleKey)) return;
      const styleText = markdownAddStyleMap.get(styleKey) as string;
      const textarea = markdownTextArea.current as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = textarea;
      if (selectionStart !== selectionEnd) {
        return setStyle(styleKey, selectionStart, selectionEnd);
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

  const renderAddStyleButtons = (): JSX.Element[] => {
    const addStyleButtons: JSX.Element[] = [];
    addStyleButtonMap.forEach((text, key) => {
      const addStyleButton = (
        <button key={key} onClick={() => addStyle(key)}>
          {text}
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
