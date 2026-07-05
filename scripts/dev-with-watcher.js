/**
 * Dev server + content/devlog file watcher
 * - On start: refresh index, then run Next.js dev
 * - While running: auto-refresh index when content/devlog changes
 */

const { spawn, spawnSync } = require('child_process');
const path = require('path');

const devlogDir = path.join(process.cwd(), 'content/devlog');
const indexScript = path.join(process.cwd(), 'scripts/generate-devlog-index.js');

// Run index refresh asynchronously (for watch mode)
function runIndexGenerator() {
  const child = spawn('node', [indexScript], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  child.on('close', (code) => {
    if (code !== 0) {
      console.error('[devlog] Failed to refresh index');
    }
  });
}

// 1. Refresh index on startup (sync - dev starts after completion)
console.log('[devlog] Refreshing index...');
const result = spawnSync('node', [indexScript], {
  stdio: 'inherit',
  cwd: process.cwd(),
});
if (result.status !== 0) {
  console.error('[devlog] Failed to refresh index');
}

// 2. Start Next.js dev server (webpack: Turbopack 내부 오류 우회)
const nextDev = spawn('yarn', ['next', 'dev', '--webpack'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: { ...process.env },
});

// 3. Watch content/devlog (fs.watch recursive - Node 18+)
let watchDebounce = null;
function scheduleIndexUpdate() {
  if (watchDebounce) clearTimeout(watchDebounce);
  watchDebounce = setTimeout(() => {
    console.log('[devlog] content/devlog changed, refreshing index...');
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
    console.log('[devlog] Watching content/devlog');
  }
} catch (err) {
  console.warn('[devlog] Failed to set up file watcher:', err.message);
}

// Exit this script when the Next.js process exits
nextDev.on('close', (code) => {
  process.exit(code ?? 0);
});
