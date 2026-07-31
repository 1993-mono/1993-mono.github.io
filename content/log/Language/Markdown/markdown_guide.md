---
title: Markdown Guide
date: 2026-01-20
---

Markdown is a text-based markup language that lets you write documents with simple syntax.

---

# Headings

Headings are written using the `#` symbol. The number of `#` characters determines the heading size.

```markdown
# Heading 1 (largest heading)
## Heading 2
### Heading 3 (smallest heading)
```

### Usage
# Heading 1
## Heading 2
### Heading 3

---

# Line Breaks

There are several ways to create line breaks in Markdown.

## Paragraph Break

Adding a blank line creates a new paragraph.

```markdown
This is the first paragraph.

This is the second paragraph.
```

### Usage

This is the first paragraph.

This is the second paragraph.

## Line Break

To break a line within the same paragraph, add two spaces at the end of the line and press Enter.

```markdown
First line  
Second line
```

### Usage

First line  
Second line

---

# Lists

## Unordered List

Unordered lists use `-`, `*`, or `+`.

To enter multiple lines within a list item:

1. Add two spaces
2. Line break
3. Indent 4 spaces

```markdown
- First item  
    This is the second line of this item.  
    The third line is also part of the same item.
- Second item

    You can write a description across multiple lines.

    Each line starts with a 4-space indent.
- Third item
    - Sub-item 1  
        This is the second line of the sub-item.
    - Sub-item 2
```

### Usage
- First item  
    This is the second line of this item.  
    The third line is also part of the same item.
- Second item

    You can write a description across multiple lines.

    Each line starts with a 4-space indent.
- Third item
    - Sub-item 1  
        This is the second line of the sub-item.
    - Sub-item 2

## Ordered List

Ordered lists use numbers followed by a period.

You can also enter multiple lines within an ordered list item.

```markdown
1. First item  
    This is the second line of this item.  
    The third line is also part of the same item.
2. Second item

    You can write a description across multiple lines.

    Each line starts with an indent of 4 or more spaces.
3. Third item
    1. Sub-item 1  
        This is the second line of the sub-item.
    2. Sub-item 2
```

### Usage
1. First item  
    This is the second line of this item.  
    The third line is also part of the same item.
2. Second item

    You can write a description across multiple lines.

    Each line starts with an indent of 4 or more spaces.
3. Third item
    1. Sub-item 1  
        This is the second line of the sub-item.
    2. Sub-item 2

---

# Checkboxes

Checkboxes are useful for creating task lists.

You can also enter multiple lines within a checkbox item.

```markdown
- [ ] Task 1  
    Detailed description of this task.  
    You can write across multiple lines.
- [x] Completed task

    Description of the completed task.

    You can add additional information across multiple lines.
- [ ] Task 3
    - [x] Sub-task 1  
        Detailed description of the sub-task.
    - [ ] Sub-task 2
```

### Usage
- [ ] Task 1  
    Detailed description of this task.  
    You can write across multiple lines.
- [x] Completed task

    Description of the completed task.

    You can add additional information across multiple lines.
- [ ] Task 3
    - [x] Sub-task 1  
        Detailed description of the sub-task.
    - [ ] Sub-task 2

---

# Emphasis

There are several ways to emphasize text.

Bold text can use the `<strong>` tag, italic text can use the `<em>` tag, and strikethrough can use the `<del>` or `<s>` tag.

Use `<strong>` for bold emphasis, `<em>` for italic emphasis, `<del>` to indicate deleted content, and `<s>` when you only want the strikethrough style.

Symbols like `**`, `*`, and `~~` may not render in every environment, so using tags such as `<strong>`, `<em>`, `<del>`, and `<s>` is recommended.

```markdown
<strong>bold text</strong> or **bold text** or __bold text__  
<em>italic</em> or *italic* or _italic_  
<strong><em>bold and italic</em></strong> or ***bold and italic*** or ___bold and italic___  
<del>strikethrough</del> or <s>strikethrough</s> or ~~strikethrough~~
```

### Usage
<strong>bold text</strong> or **bold text** or __bold text__  
<em>italic</em> or *italic* or _italic_  
<strong><em>bold and italic</em></strong> or ***bold and italic*** or ___bold and italic___  
<del>strikethrough</del> or ~~strikethrough~~

## Mark Tag

The `<mark>` tag is an HTML tag used to highlight (emphasize) text. By default it displays with a yellow background and is useful for search results or emphasizing important sections.

```markdown
In this sentence, <mark>this part</mark> is highlighted.  
You can <mark>highlight multiple words</mark>, and you can also highlight <mark>veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryvery a long sentence</mark>.  
You can <mark>**combine bold text and highlighting**</mark>.
```

### Usage

In this sentence, <mark>this part</mark> is highlighted.  
You can <mark>highlight multiple words</mark>, and you can also highlight <mark>veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryvery a long sentence</mark>.  
You can <mark>**combine bold text and highlighting**</mark>.

---

# Links and Images

## Links

```markdown
[Google](https://www.google.com)  
[GitHub](https://github.com "GitHub homepage")
```

### Usage
[Google](https://www.google.com)  
[GitHub](https://github.com "GitHub homepage")

## Images

```markdown
![Local sample image](/images/markdown/sample.jpg)

![Online sample image](https://picsum.photos/seed/markdown-guide/500/280)
![Online sample image](https://picsum.photos/seed/markdown-guide/500/280 "Online sample image")
```

### Usage
![Local sample image](/images/markdown/sample.jpg)

![Online sample image](https://picsum.photos/seed/markdown-guide/500/280)
![Online sample image](https://picsum.photos/seed/markdown-guide/500/280 "Online sample image")

---

# Code Blocks

## Inline Code

Inline code is wrapped in a single backtick (`).

```markdown
Use the `console.log()` function.
```

### Usage
Use the `console.log()` function.

## Code Block

Code blocks are wrapped in three backticks (`).

```
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

### Usage

```
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

---

# Blockquotes

Blockquotes use the `>` symbol.

```markdown
> This is a blockquote.  
> You can write it across multiple lines.
```

### Usage

> This is a blockquote.  
> You can write it across multiple lines.

## Nested Blockquotes

```markdown
> First-level blockquote  
> Second line of first-level blockquote
> 
> Another p tag at first level
> > Second-level blockquote
> > > Third-level blockquote
```

### Usage

> First-level blockquote  
> Second line of first-level blockquote
> 
> Another p tag at first level
> > Second-level blockquote
> > > Third-level blockquote

---

# Tables

Tables are written using pipes (`|`) and hyphens (`-`).  
A minimum of three hyphens is enough.  
Using four, like indentation, makes them easier to remember.

```markdown
| Header 1 | Header 2 | Header 3 |
|----|----|----|
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |
```

### Usage

| Header 1 | Header 2 | Header 3 |
|----|----|----|
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |

## Aligned Tables

```markdown
| Left align | Center align | Right align |
|:----|:----:|----:|
| Left | Center | Right |
| Data 1 | Data 2 | Data 3 |
```

### Usage

| Left align | Center align | Right align |
|:----|:----:|----:|
| Left | Center | Right |
| Data 1 | Data 2 | Data 3 |

## Limitations of Standard Markdown Tables

Standard Markdown table syntax (pipes and hyphens) cannot express the following two features:

- **Cell merging (colspan / rowspan)**  
  There is no syntax for merging cells horizontally or vertically. When needed, use `colspan` and `rowspan` on an HTML `<table>`.
- **th inside tbody (row headers)**  
  Only the first row is recognized as a header. There is no syntax for separating `<thead>`/`<tbody>` or adding a row header (`<th scope="row">`) to each data row. In these cases, you must write the HTML table directly.

---

# Horizontal Rules

Horizontal rules use `---`, `***`, or `___`.

```markdown
---
***
___
```

### Usage

---

# Markdown Extensions

These are extension features added to standard Markdown. Let's look at additional features supported by various Markdown parsers.

## Footnotes

You can add reference information using footnotes.

```markdown
This is a sentence with a footnote.[^1]

[^1]: This is the footnote content.
```

### Usage

This is a sentence with a footnote.[^1]

[^1]: This is the footnote content.

## Definition Lists

Used to list terms and their definitions.

```markdown
Term 1
: Definition 1

Term 2
: Definition 2-1
: Definition 2-2
```

### Usage

Term 1
: Definition 1

Term 2
: Definition 2-1
: Definition 2-2

## Fenced Code Blocks

You can specify a filename or language for code blocks.

```markdown
```javascript:src/app.js
function hello() {
  console.log("Hello, World!");
}
```
```

## Emoji

Some Markdown parsers support emoji shortcuts.

```markdown
:smile: :heart: :thumbsup: :rocket:
```

### Usage :smile: :heart: :thumbsup: :rocket:

## Math

An extension feature that supports LaTeX-style math expressions.

```markdown
Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

### Usage

Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

## Highlight

You can highlight text.

```markdown
==highlighted text==
```

### Usage ==highlighted text==

---

# GitHub Flavored Markdown (GFM)

GitHub Flavored Markdown is the extended version of Markdown used on GitHub. Let's look at the features added to standard Markdown.

## Autolinks

URLs and email addresses are automatically converted to links.

```markdown
https://github.com
user@example.com
```

### Usage
- https://github.com
- user@example.com

## Issue and PR Links

GitHub issues and Pull Requests are automatically linked.

```markdown
See issue #123.
Please check PR #456.
```

### Usage
- See issue #123.
- Please check PR #456.

## Strikethrough

You can add strikethrough to text.

```markdown
~~struck-through text~~
```

### Usage ~~struck-through text~~

## Emoji

On GitHub, you can use emojis directly.

```markdown
:smile: :heart: :thumbsup: :rocket: :tada:
```

### Usage :smile: :heart: :thumbsup: :rocket: :tada:

## Code Blocks in Blockquotes

You can place code blocks inside blockquotes.

```markdown
> Code example:
> ```javascript
> console.log("Hello");
> ```
```

### Usage

> Code example:
> ```javascript
> console.log("Hello");
> ```

---

**Note:** This document was written to explain Markdown syntax, and it was actually written in Markdown!