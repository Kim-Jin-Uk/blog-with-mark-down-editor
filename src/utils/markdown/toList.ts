/**
 * @copyright 김진욱
 * @description 리스트 형식을 HTML로 변환하는 기능을 수행합니다
 * @convertCase ul, ol, li
 * @created 23-05-03
 * @updated 23-05-03
 */
import { orderedListReg, unOrderedListReg } from "@/constants/utils";
import { ListNode } from "./types";
import { listConverterFor } from "./makeHtml";
/**
 * 직전 리스트 아이템과 현재 리스트 아이템의 깊이가 동일한 경우를 처리하는 함수
 * @param html 변환중인 HTML
 * @param stack 리스트 아이템의 계층 구조를 담고 있는 스택
 * @param prev 직전 리스트 아이템
 * @param node 현재 리스트 아이템
 * @returns 변환된 HTML
 */
const handleSameDepthItems = (
  html: string,
  stack: ListNode[],
  prev: ListNode,
  node: ListNode
): string => {
  // case 1-1 직전 아이템과 태그 형식이 동일한 경우
  if (node.tag === prev.tag) html += listConverterFor("", "", node.value);
  // case 1-1 직전 아이템과 태그 형식이 다른 경우
  else {
    // 직전 아이템의 태그를 닫아주고 최상위 항목을 현재 아이템으로 교체 한다
    html += listConverterFor(`</${prev.tag}>`, `<${node.tag}>`, node.value);
    stack.pop();
    stack.push(node);
  }
  return html;
};
/**
 * 리스트 노드배열을 HTML형식으로 변환하는 함수
 * @param nodes 변환할 리스트 노드 배열 (깊이, 태그명, 내용값)
 * @returns 변환된 리스트 형식의 HTML
 */
const convertNodeToList = (nodes: ListNode[]): string => {
  const stack: ListNode[] = [];
  let html = "";

  for (const node of nodes) {
    if (stack.length === 0) {
      // 스택이 빈 경우는 처음 들어온 리스트 아이템
      stack.push(node);
      let liOfDepth = "";
      for (let i = 1; i < node.depth; i++) {
        liOfDepth += "<ul>";
        stack.push({ depth: i, tag: "ul", value: "" });
      }
      html += listConverterFor(liOfDepth, `<${node.tag}>`, node.value);
      continue;
    }
    let prev = stack.at(-1) as ListNode;
    // case 1 직전 아이템과 깊이가 동일한 경우
    if (node.depth === prev.depth) {
      html = handleSameDepthItems(html, stack, prev, node);
    }
    // case 2 직전 아이템 보다 깊이가 깊어진 경우
    else if (node.depth > prev.depth) {
      let liOfDiffDepth = "";
      for (let i = 1; i < node.depth - prev.depth; i++) {
        liOfDiffDepth += "<ul>";
        stack.push({ depth: i + prev.depth, tag: "ul", value: "" });
      }
      html += listConverterFor(liOfDiffDepth, `<${node.tag}>`, node.value);
      stack.push(node);
    }
    // case 3 직전 아이템 보다 깊이가 얕아진 경우
    else {
      // 현재 아이템의 부모 전까지의 태그들을 모두 닫아준다
      while (stack.length) {
        const beClosed = stack.pop() as ListNode;
        if (beClosed.depth === node.depth) {
          stack.push(beClosed);
          prev = beClosed;
          break;
        }
        html += `</${beClosed.tag}>`;
      }
      // 이후 과정은 case 1과 상동
      html = handleSameDepthItems(html, stack, prev, node);
    }
  }
  while (stack.length) html += `</${(stack.pop() as ListNode).tag}>`;

  return html + "\n";
};
/**
 * 마크다운 내부의 리스트 형식을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운
 * @returns 변환된 HTML
 */
export const convertList = (markdown: string): string => {
  const convertedTab = markdown.replace(/\t/g, "    ");
  const lines = convertedTab.split("\n");
  // 리스트 아이템 요소인지를 판별
  let inList = false;
  // 리스트 아이템 요소를 저장
  let listNodes: ListNode[] = [];
  // 반환할 HTML
  let html = "";

  for (const line of lines) {
    // 4칸의 공백으로 깊이를 판단
    const indent = Math.ceil(line.search(/\S/) / 4);
    // 불필요한 공백 제거
    const trimmedLine = line.trim();
    const isUnOrdered = unOrderedListReg.test(trimmedLine);
    const isOrdered = orderedListReg.test(trimmedLine);
    if (isUnOrdered || isOrdered) {
      // 리스트 아이템 형식이라면 리스트 노드 생성 및 배열에 담아주기
      const node: ListNode = {
        depth: indent,
        tag: isUnOrdered ? "ul" : "ol",
        value: isUnOrdered
          ? trimmedLine.slice(2)
          : trimmedLine.slice(trimmedLine.indexOf(".") + 2),
      };
      inList = true;

      listNodes.push(node);
    } else {
      if (inList) {
        // 리스트 형식이 종료되었으니 그동안의 리스트 아이템들을 변환한다
        html += convertNodeToList(listNodes);
        inList = false;
        listNodes = [];
      }
      html += `${line}\n`;
    }
  }
  // 리스트 형식이 종료되었으니 그동안의 리스트 아이템들을 변환한다
  if (inList) html += convertNodeToList(listNodes);

  return html;
};
