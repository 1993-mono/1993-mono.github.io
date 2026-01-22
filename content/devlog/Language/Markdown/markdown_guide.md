---
title: Markdown 가이드
date: 2026-01-20
---

# Markdown 가이드

Markdown은 텍스트 기반의 마크업 언어로, 간단한 문법으로 문서를 작성할 수 있게 해줍니다.

---

## 제목 (Headings)

제목은 `#` 기호를 사용하여 작성합니다. `#`의 개수에 따라 제목의 크기가 결정됩니다.

```markdown
# 제목 1 (가장 큰 제목)
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6 (가장 작은 제목)
```

### 예시

# 제목 1
## 제목 2
### 제목 3

---

## 리스트 (Lists)

### 순서 없는 리스트 (Unordered List)

순서 없는 리스트는 `-`, `*`, 또는 `+` 기호를 사용합니다.

```markdown
- 항목 1
- 항목 2
- 항목 3
  - 하위 항목 1
  - 하위 항목 2
```

**실제 예시:**
- 항목 1
- 항목 2
- 항목 3
  - 하위 항목 1
  - 하위 항목 2

### 순서 있는 리스트 (Ordered List)

순서 있는 리스트는 숫자와 점을 사용합니다.

```markdown
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목
   1. 하위 항목 1
   2. 하위 항목 2
```

**실제 예시:**
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목
   1. 하위 항목 1
   2. 하위 항목 2

---

## 체크박스 (Checkboxes)

체크박스는 작업 목록을 만들 때 유용합니다.

```markdown
- [ ] 완료되지 않은 작업
- [x] 완료된 작업
- [ ] 또 다른 작업
  - [x] 하위 작업 1
  - [ ] 하위 작업 2
```

**실제 예시:**
- [ ] 완료되지 않은 작업
- [x] 완료된 작업
- [ ] 또 다른 작업
  - [x] 하위 작업 1
  - [ ] 하위 작업 2

### 체크박스 활용 예시

#### 학습 체크리스트
- [ ] Markdown 기본 문법 학습
- [x] 제목 작성법 익히기
- [x] 리스트 작성법 익히기
- [ ] 코드 블록 작성법 익히기
- [ ] 표 작성법 익히기

#### 프로젝트 진행 상황
- [ ] 기획 단계
  - [x] 요구사항 분석
  - [x] 기능 명세서 작성
  - [ ] 일정 수립
- [x] 디자인 단계
  - [x] 와이어프레임 작성
  - [x] UI 디자인
  - [x] 디자인 시스템 구축
- [ ] 개발 단계
  - [x] 개발 환경 설정
  - [ ] 프론트엔드 개발
  - [ ] 백엔드 개발
  - [ ] API 연동
- [ ] 테스트 단계
  - [ ] 단위 테스트
  - [ ] 통합 테스트
  - [ ] 사용자 테스트
- [ ] 배포 단계
  - [ ] 스테이징 배포
  - [ ] 프로덕션 배포
  - [ ] 모니터링 설정

---

## 강조 (Emphasis)

텍스트를 강조하는 여러 방법이 있습니다.

```markdown
**굵은 글씨** 또는 __굵은 글씨__
*기울임* 또는 _기울임_
***굵고 기울임*** 또는 ___굵고 기울임___
~~취소선~~
```

**실제 예시:**
- **굵은 글씨**
- *기울임*
- ***굵고 기울임***
- ~~취소선~~

---

## 줄바꿈 (Line Breaks)

마크다운에서 줄바꿈을 하는 방법은 여러 가지가 있습니다.

### 단락 구분 (Paragraph Break)

빈 줄 하나를 추가하면 새로운 단락으로 구분됩니다.

```markdown
첫 번째 단락입니다.

두 번째 단락입니다.
```

**실제 예시:**

첫 번째 단락입니다.

두 번째 단락입니다.

### 단순 줄바꿈 (Line Break)

같은 단락 내에서 줄바꿈을 하려면 줄 끝에 공백 2개를 추가하고 엔터를 누릅니다.

```markdown
첫 번째 줄  
두 번째 줄
```

**실제 예시:**

첫 번째 줄  
두 번째 줄

---

## 링크와 이미지

### 링크

```markdown
[링크 텍스트](https://example.com)
[링크 텍스트](https://example.com "툴팁 텍스트")
```

**실제 예시:**
- [Google](https://www.google.com)
- [GitHub](https://github.com "GitHub 홈페이지")

### 이미지

```markdown
![이미지 대체 텍스트](이미지_경로.png)
![이미지 대체 텍스트](이미지_경로.png "이미지 제목")
```

---

## 코드 블록

### 인라인 코드

인라인 코드는 백틱(`) 하나로 감쌉니다.

```markdown
`console.log()` 함수를 사용합니다.
```

**실제 예시:** `console.log()` 함수를 사용합니다.

### 코드 블록

코드 블록은 백틱(`) 세 개로 감싸고 언어를 지정할 수 있습니다.

```markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```
```

**실제 예시:**

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

### 다양한 언어 예시

#### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

#### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

#### CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.title {
  font-size: 2rem;
  color: #333;
}
```

#### JSON

```json
{
  "name": "Markdown 가이드",
  "version": "1.0.0",
  "features": [
    "제목",
    "리스트",
    "체크박스",
    "코드 블록"
  ]
}
```

---

## 인용문

인용문은 `>` 기호를 사용합니다.

```markdown
> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.
```

**실제 예시:**

> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

### 중첩 인용문

```markdown
> 첫 번째 레벨 인용문
> > 두 번째 레벨 인용문
> > > 세 번째 레벨 인용문
```

**실제 예시:**

> 첫 번째 레벨 인용문
> > 두 번째 레벨 인용문
> > > 세 번째 레벨 인용문

---

## 표 (Tables)

표는 파이프(`|`)와 하이픈(`-`)을 사용하여 작성합니다.

```markdown
| 헤더 1 | 헤더 2 | 헤더 3 |
|--------|--------|--------|
| 셀 1   | 셀 2   | 셀 3   |
| 셀 4   | 셀 5   | 셀 6   |
```

**실제 예시:**

| 헤더 1 | 헤더 2 | 헤더 3 |
|--------|--------|--------|
| 셀 1   | 셀 2   | 셀 3   |
| 셀 4   | 셀 5   | 셀 6   |

### 정렬된 표

```markdown
| 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
|:----------|:-----------:|------------:|
| 왼쪽      | 가운데      | 오른쪽      |
| 데이터 1  | 데이터 2    | 데이터 3    |
```

**실제 예시:**

| 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
|:----------|:-----------:|------------:|
| 왼쪽      | 가운데      | 오른쪽      |
| 데이터 1  | 데이터 2    | 데이터 3    |

---

## 수평선

수평선은 `---`, `***`, 또는 `___`를 사용합니다.

```markdown
---
***
___
```

**실제 예시:**

---

## Markdown 확장 문법

표준 Markdown에 추가된 확장 기능들입니다. 다양한 Markdown 파서에서 지원하는 추가 기능들을 살펴보겠습니다.

### 각주 (Footnotes)

각주를 사용하여 참고 정보를 추가할 수 있습니다.

```markdown
이것은 각주가 있는 문장입니다.[^1]

[^1]: 이것은 각주 내용입니다.
```

**실제 예시:**

이것은 각주가 있는 문장입니다.[^1]

[^1]: 이것은 각주 내용입니다.

### 정의 리스트 (Definition Lists)

용어와 그 정의를 나열할 때 사용합니다.

```markdown
용어 1
: 정의 1

용어 2
: 정의 2-1
: 정의 2-2
```

**실제 예시:**

용어 1
: 정의 1

용어 2
: 정의 2-1
: 정의 2-2

### 삽입 코드 (Fenced Code Blocks)

코드 블록에 파일명이나 언어를 명시할 수 있습니다.

```markdown
```javascript:src/app.js
function hello() {
  console.log("Hello, World!");
}
```
```

### 이모지 (Emoji)

일부 Markdown 파서에서는 이모지 단축어를 지원합니다.

```markdown
:smile: :heart: :thumbsup: :rocket:
```

**실제 예시:** :smile: :heart: :thumbsup: :rocket:

### 수학식 (Math)

LaTeX 형식의 수학식을 지원하는 확장 기능입니다.

```markdown
인라인 수식: $E = mc^2$

블록 수식:
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

**실제 예시:**

인라인 수식: $E = mc^2$

블록 수식:
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 하이라이트

텍스트를 하이라이트할 수 있습니다.

```markdown
==하이라이트된 텍스트==
```

**실제 예시:** ==하이라이트된 텍스트==

---

## GitHub Flavored Markdown (GFM)

GitHub Flavored Markdown은 GitHub에서 사용하는 Markdown 확장 버전입니다. 표준 Markdown에 추가된 기능들을 살펴보겠습니다.

### 자동 링크 (Autolinks)

URL과 이메일 주소가 자동으로 링크로 변환됩니다.

```markdown
https://github.com
user@example.com
```

**실제 예시:**
- https://github.com
- user@example.com

### 이슈 및 PR 링크

GitHub 이슈와 Pull Request에 자동으로 링크됩니다.

```markdown
이슈 #123을 참고하세요.
PR #456을 확인해주세요.
```

**실제 예시:**
- 이슈 #123을 참고하세요.
- PR #456을 확인해주세요.

### 취소선 (Strikethrough)

텍스트에 취소선을 그을 수 있습니다.

```markdown
~~취소된 텍스트~~
```

**실제 예시:** ~~취소된 텍스트~~

### 이모지

GitHub에서는 이모지를 직접 사용할 수 있습니다.

```markdown
:smile: :heart: :thumbsup: :rocket: :tada:
```

**실제 예시:** :smile: :heart: :thumbsup: :rocket: :tada:

### 인용문 내 코드 블록

인용문 안에 코드 블록을 넣을 수 있습니다.

```markdown
> 코드 예시:
> ```javascript
> console.log("Hello");
> ```
```

**실제 예시:**

> 코드 예시:
> ```javascript
> console.log("Hello");
> ```

---

**참고:** 이 문서는 Markdown 문법을 설명하기 위해 작성되었으며, 실제로 Markdown으로 작성되었습니다!