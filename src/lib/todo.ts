import { remark } from 'remark';
import html from 'remark-html';

export interface TodoItem {
  id: string;
  title: string;
  checked: boolean;
  details?: string; // 마크다운 형식
  htmlDetails?: string; // HTML로 변환된 내용
}

export interface TodoCategory {
  id: string;
  name: string;
  todos: TodoItem[];
}

// 마크다운을 HTML로 변환하는 헬퍼 함수
async function markdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
}

// TODO 데이터
const todoData: TodoCategory[] = [
  {
    id: 'devlog-language',
    name: '개발 기록',
    todos: [
      {
        id: 'devlog-language-1',
        title: 'Javascript',
        checked: false,
      },
      {
        id: 'devlog-language-2',
        title: 'React',
        checked: false,
      },
      {
        id: 'devlog-language-3',
        title: 'Next.js',
        checked: false,
      },
      {
        id: 'devlog-language-4',
        title: 'Typescript',
        checked: false,
      },
      {
        id: 'devlog-language-5',
        title: 'React Native',
        checked: false,
      },
    ],
  },
  {
    id: 'portfolio',
    name: '포트폴리오',
    todos: [
      {
        id: 'portfolio-1',
        title: '갤러리 레이아웃 구현',
        checked: false,
      },
      {
        id: 'portfolio-2',
        title: '작품 카드 디자인',
        checked: false,
      },
      {
        id: 'portfolio-3',
        title: '필터링 기능 (선택사항)',
        checked: false,
      },
    ],
  },
  {
    id: 'home',
    name: '인사말',
    todos: [
      {
        id: 'home-1',
        title: '레이아웃 구성',
        checked: false,
      },
      {
        id: 'home-2',
        title: '시각적 요소 추가',
        checked: false,
      },
    ],
  },
  {
    id: 'responsive',
    name: '반응형',
    todos: [
      {
        id: 'responsive-1',
        title: '모바일 레이아웃 최적화',
        checked: false,
        details: `모바일 화면에서 사용자 경험을 개선하기 위한 레이아웃 조정이 필요합니다.

- 개선 필요: 모바일 메뉴에서 메뉴(링크) 클릭 시, 메뉴가 자동으로 닫히지 않는 문제를 수정해야 합니다.`,
      },
      {
        id: 'responsive-2',
        title: '태블릿 뷰포트 대응',
        checked: false,
        details: '태블릿 화면 크기에 맞는 중간 레이아웃을 구현해야 합니다.',
      },
    ],
  },
  {
    id: 'dark-mode',
    name: '다크모드',
    todos: [
      {
        id: 'dark-mode-1',
        title: '다크모드 색상 팔레트 정의',
        checked: false,
        details: '다크모드에 사용할 색상 팔레트를 정의하고 CSS 변수로 관리합니다.',
      },
      {
        id: 'dark-mode-2',
        title: '다크모드 토글 기능 구현',
        checked: false,
        details: `사용자가 다크모드를 켜고 끌 수 있는 토글 기능을 구현합니다.

- 시스템 설정 감지
- 수동 토글 버튼
- 설정 저장 기능`,
      },
    ],
  },
];

// HTML 변환된 데이터 가져오기
export async function getTodos(): Promise<TodoCategory[]> {
  const todosWithHtml = await Promise.all(
    todoData.map(async (category) => ({
      ...category,
      todos: await Promise.all(
        category.todos.map(async (todo) => ({
          ...todo,
          htmlDetails: todo.details ? await markdownToHtml(todo.details) : undefined,
        }))
      ),
    }))
  );
  return todosWithHtml;
}