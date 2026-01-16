// 사이트 공통 상수
export const SITE_NAME = 'DevFolio';

// 메뉴 정보
export const MENU = {
  HOME: {
    name: '인사말',
    description: '포트폴리오 + 개발 기록',
  },
  PORTFOLIO: {
    name: '포트폴리오',
    description: '포트폴리오 작품들을 모아놓은 갤러리',
  },
  DEVLOG: {
    name: '개발 기록',
    description: '개발 과정에서 배운 것들과 기록들',
  },
  TODO: {
    name: '할 일',
    description: '앞으로 할 작업들을 체크할 수 있는 목록',
  },
} as const;