/**
 * dev 서버 + content/devlog 파일 감시
 * - 시작 시: 인덱스 갱신 후 Next.js dev 실행
 * - 과정 중: content/devlog 변경 시 인덱스 자동 갱신
 */

const { spawn, spawnSync } = require('child_process');
const path = require('path');

const devlogDir = path.join(process.cwd(), 'content/devlog');
const indexScript = path.join(process.cwd(), 'scripts/generate-devlog-index.js');

// 인덱스 갱신 실행 (비동기 - watch용)
function runIndexGenerator() {
  const child = spawn('node', [indexScript], {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
  });
  child.on('close', (code) => {
    if (code !== 0) {
      console.error('[devlog] 인덱스 갱신 실패');
    }
  });
}

// 1. 시작 시 인덱스 갱신 (동기 - 완료 후 dev 시작)
console.log('[devlog] 인덱스 갱신 중...');
const result = spawnSync('node', [indexScript], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});
if (result.status !== 0) {
  console.error('[devlog] 인덱스 갱신 실패');
}

// 2. Next.js dev 서버 시작
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
  env: { ...process.env },
});

// 3. content/devlog 감시 (fs.watch recursive - Node 18+ 지원)
let watchDebounce = null;
function scheduleIndexUpdate() {
  if (watchDebounce) clearTimeout(watchDebounce);
  watchDebounce = setTimeout(() => {
    console.log('[devlog] content/devlog 변경 감지, 인덱스 갱신 중...');
    runIndexGenerator();
    watchDebounce = null;
  }, 300);
}

try {
  const fs = require('fs');
  if (fs.existsSync(devlogDir)) {
    fs.watch(devlogDir, { recursive: true }, () => {
      scheduleIndexUpdate();
    });
    console.log('[devlog] content/devlog 파일 감시 시작');
  }
} catch (err) {
  console.warn('[devlog] 파일 감시 설정 실패:', err.message);
}

// Next.js 프로세스 종료 시 해당 스크립트도 종료
nextDev.on('close', (code) => {
  process.exit(code ?? 0);
});
