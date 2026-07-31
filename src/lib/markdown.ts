import { remark } from 'remark';
import html from 'remark-html';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root, Element, ElementContent } from 'hast';

/** Table of contents item type */
export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

/**
 * Collect all text inside a node, including nested inline elements
 * (code, strong, links) — used for table of contents labels
 */
function getNodeText(node: Element | ElementContent): string {
  if (node.type === 'text') return node.value;
  if (node.type === 'element') {
    return (node.children || []).map(getNodeText).join('');
  }
  return '';
}

/**
 * Rehype plugin that assigns heading ids and extracts a table of contents
 * - Ids are position-based: heading-01-02-03 = h1/h2/h3 counters in document
 *   order, zero-padded (00 = level not present)
 * - Deeper counters reset when a higher-level heading appears,
 *   so the id mirrors the document outline and never collides
 * - Ids are for anchors only — do not target them in styles
 */
function rehypeHeadingIdAndToc() {
  return (tree: Root, file: { data?: Record<string, unknown> }) => {
    const headings: TocItem[] = [];
    const counters = [0, 0, 0]; // h1, h2, h3

    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3'].includes(node.tagName)) {
        const depth = parseInt(node.tagName.charAt(1), 10);
        counters[depth - 1] += 1;
        for (let i = depth; i < counters.length; i += 1) {
          counters[i] = 0;
        }

        const id = `heading-${counters.map((n) => String(n).padStart(2, '0')).join('-')}`;
        const text = getNodeText(node).trim();

        if (!node.properties) node.properties = {};
        node.properties.id = id;

        headings.push({ id, text, depth });
      }
    });

    if (!file.data) file.data = {};
    (file.data as { headings?: TocItem[] }).headings = headings;
  };
}

/**
 * Shared helper to convert markdown to HTML
 * @param markdown - Markdown string to convert
 * @returns HTML string
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
}

/**
 * Rehype plugin that applies explicit linking (for/id) to checkboxes
 */
function rehypeCheckboxLabel() {
  return (tree: Root) => {
    let checkboxCounter = 0;

    visit(tree, 'element', (node, index, parent) => {
      // Find input[type="checkbox"] tags and assign ids plus labels
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

        // Assign a unique id to the checkbox
        checkboxCounter++;
        const checkboxId = `checkbox-${checkboxCounter}`;

        if (!node.properties) {
          node.properties = {};
        }
        node.properties.id = checkboxId;

        // Collect text and inline elements after the checkbox
        const textNodes: ElementContent[] = [];
        let i = checkboxIndex + 1;

        while (i < parent.children.length) {
          const sibling = parent.children[i];
          if (sibling.type === 'text') {
            // Keep text nodes as-is
            textNodes.push(sibling);
            i++;
          } else if (
            sibling.type === 'element' &&
            ['strong', 'em', 'code', 'a'].includes(sibling.tagName)
          ) {
            // Keep already wrapped inline elements as-is
            textNodes.push(sibling);
            i++;
          } else {
            break;
          }
        }

        // Create label (explicit linking)
        if (textNodes.length > 0) {
          // Add span[aria-hidden="true"] before the text
          const hiddenSpan: Element = {
            type: 'element',
            tagName: 'span',
            properties: {
              'aria-hidden': 'true'
            },
            children: []
          };

          const labelNode: Element = {
            type: 'element',
            tagName: 'label',
            properties: {
              for: checkboxId
            },
            children: [hiddenSpan, ...textNodes]
          };

          // Place checkbox and label as sibling nodes
          // Remove existing text nodes and replace them with the label
          parent.children.splice(checkboxIndex + 1, textNodes.length, labelNode);
        }
      }
    });
  };
}

/**
 * Convert markdown to HTML (checkboxes use explicit linking)
 * Assign ids to headings (h1-h3) and extract a table of contents
 * @param markdown - Markdown string to convert
 * @returns HTML string and table of contents array
 */
export async function markdownToHtmlCustom(markdown: string): Promise<{
  html: string;
  headings: TocItem[];
}> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm) // GitHub Flavored Markdown support (includes checkboxes)
    .use(remarkRehype, { allowDangerousHtml: true }) // Allow HTML tags
    .use(rehypeRaw) // Parse HTML tags
    .use(rehypeCheckboxLabel) // Wrap checkboxes in labels
    .use(rehypeHeadingIdAndToc) // Assign heading ids and extract table of contents
    .use(rehypeStringify)
    .process(markdown);

  const headings = (file.data?.headings as TocItem[] | undefined) ?? [];
  return { html: String(file), headings };
}
