import { remark } from 'remark';
import html from 'remark-html';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root, Element, ElementContent } from 'hast';

/**
 * 마크다운을 HTML로 변환하는 공통 함수
 * @param markdown - 변환할 마크다운 문자열
 * @returns HTML 문자열
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
}

/**
 * 체크박스를 label로 감싸는 rehype 플러그인
 */
function rehypeCheckboxLabel() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      // input[type="checkbox"] 태그를 찾아서 label로 감싸기
      if (
        node.tagName === 'input' &&
        node.properties &&
        typeof node.properties.type === 'string' &&
        node.properties.type === 'checkbox' &&
        parent &&
        parent.type === 'element' &&
        Array.isArray(parent.children)
      ) {
        const checkboxIndex = parent.children.indexOf(node as ElementContent);
        
        // 체크박스 다음에 오는 텍스트 노드들을 찾아서 label로 감싸기
        const textNodes: ElementContent[] = [];
        let i = checkboxIndex + 1;
        
        // 체크박스 다음의 텍스트와 인라인 요소들을 수집
        while (i < parent.children.length) {
          const sibling = parent.children[i];
          if (sibling.type === 'text' || 
              (sibling.type === 'element' && 
               ['strong', 'em', 'code', 'a'].includes(sibling.tagName))) {
            textNodes.push(sibling);
            i++;
          } else {
            break;
          }
        }
        
        // label로 감싸기
        if (textNodes.length > 0) {
          // 기존 노드들을 제거하고 label로 감싸기
          const labelNode: Element = {
            type: 'element',
            tagName: 'label',
            properties: {
              style: 'cursor: pointer; display: flex; align-items: flex-start; gap: 0.5em;'
            },
            children: [node, ...textNodes]
          };
          
          // 원본 노드들을 label로 교체
          parent.children.splice(checkboxIndex, textNodes.length + 1, labelNode);
        }
      }
    });
  };
}

/**
 * 마크다운을 HTML로 변환 (체크박스는 input + label로 변환)
 * @param markdown - 변환할 마크다운 문자열
 * @returns HTML 문자열 (체크박스는 input[type="checkbox"]와 label로 변환됨)
 */
export async function markdownToHtmlCustom(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm) // GitHub Flavored Markdown 지원 (체크박스 포함)
    .use(remarkRehype)
    .use(rehypeCheckboxLabel) // 체크박스를 label로 감싸기
    .use(rehypeStringify)
    .process(markdown);
  
  return String(file);
}