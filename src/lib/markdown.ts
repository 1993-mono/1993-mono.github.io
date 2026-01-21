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
 * 체크박스에 explicit linking (for/id)을 적용하는 rehype 플러그인
 */
function rehypeCheckboxLabel() {
  return (tree: Root) => {
    let checkboxCounter = 0;

    visit(tree, 'element', (node, index, parent) => {
      // input[type="checkbox"] 태그를 찾아서 id 부여 및 label 생성
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

        // 체크박스에 고유한 id 부여
        checkboxCounter++;
        const checkboxId = `checkbox-${checkboxCounter}`;

        if (!node.properties) {
          node.properties = {};
        }
        node.properties.id = checkboxId;

        // 체크박스 다음의 텍스트와 인라인 요소들을 수집
        const textNodes: ElementContent[] = [];
        let i = checkboxIndex + 1;

        while (i < parent.children.length) {
          const sibling = parent.children[i];
          if (sibling.type === 'text') {
            // 텍스트 노드는 그대로 사용
            textNodes.push(sibling);
            i++;
          } else if (
            sibling.type === 'element' &&
            ['strong', 'em', 'code', 'a'].includes(sibling.tagName)
          ) {
            // 이미 태그로 감싸진 인라인 요소는 그대로 사용
            textNodes.push(sibling);
            i++;
          } else {
            break;
          }
        }

        // label 생성 (explicit linking)
        if (textNodes.length > 0) {
          const labelNode: Element = {
            type: 'element',
            tagName: 'label',
            properties: {
              for: checkboxId
            },
            children: textNodes
          };

          // 체크박스와 label을 형제 노드로 배치
          // 기존 텍스트 노드들을 제거하고 label로 교체
          parent.children.splice(checkboxIndex + 1, textNodes.length, labelNode);
        }
      }
    });
  };
}

/**
 * 마크다운을 HTML로 변환 (체크박스는 explicit linking 방식으로 변환)
 * @param markdown - 변환할 마크다운 문자열
 * @returns HTML 문자열 (체크박스는 input[type="checkbox"]에 id와 label[for]로 연결됨)
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