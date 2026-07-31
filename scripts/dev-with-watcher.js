/**
 * Dev server + content/log file watcher
 * - On start: refresh index, then run Next.js dev
 * - While running: auto-refresh index when content/log changes
 */

const { spawn, spawnSync } = require('child_process');
const path = require('path');

const logDir = path.join(process.cwd(), 'content/log');
const indexScript = path.join(process.cwd(), 'scripts/generate-log-index.js');

// Run index refresh asynchronously (for watch mode)
function runIndexGenerator() {
  const child = spawn('node', [indexScript], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  child.on('close', (code) => {
    if (code !== 0) {
      console.error('[log] Failed to refresh index');
    }
  });
}

// 1. Refresh index on startup (sync - dev starts after completion)
console.log('[log] Refreshing index...');
const result = spawnSync('node', [indexScript], {
  stdio: 'inherit',
  cwd: process.cwd(),
});
if (result.status !== 0) {
  console.error('[log] Failed to refresh index');
}

// 2. Start Next.js dev server (webpack: Turbopack 내부 오류 우회)
const nextDev = spawn('yarn', ['next', 'dev', '--webpack'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: { ...process.env },
});

// 3. Watch content/log (fs.watch recursive - Node 18+)
let watchDebounce = null;
function scheduleIndexUpdate() {
  if (watchDebounce) clearTimeout(watchDebounce);
  watchDebounce = setTimeout(() => {
    console.log('[log] content/log changed, refreshing index...');
    runIndexGenerator();
    watchDebounce = null;
  }, 300);
}

try {
  const fs = require('fs');
  if (fs.existsSync(logDir)) {
    fs.watch(logDir, { recursive: true }, () => {
      scheduleIndexUpdate();
    });
    console.log('[log] Watching content/log');
  }
} catch (err) {
  console.warn('[log] Failed to set up file watcher:', err.message);
}

// Exit this script when the Next.js process exits
nextDev.on('close', (code) => {
  process.exit(code ?? 0);
});
