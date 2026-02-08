/**
 * devlog 인덱스 생성 스크립트
 * content/devlog 폴더를 스캔하여 .devlog-index.json 생성
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const devlogDir = path.join(process.cwd(), 'content/devlog');
const indexPath = path.join(process.cwd(), '.devlog-index.json');

// 날짜를 문자열로 변환
function formatDate(date) {
  if (!date) return '';
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  if (typeof date === 'string') return date;
  return String(date);
}

// 재귀적으로 .md 파일 수집
function collectMarkdownFiles(dir, baseDir = devlogDir) {
  const result = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(baseDir, dir).replace(/\\/g, '/');
    const folder = relativePath || '';

    if (item.isDirectory()) {
      result.push(...collectMarkdownFiles(fullPath, baseDir));
    } else if (item.isFile() && item.name.endsWith('.md')) {
      result.push({ fullPath, folder });
    }
  }
  return result;
}

// 1차 폴더 목록 (content/devlog 직속 하위)
function getTopFolders() {
  const items = fs.readdirSync(devlogDir, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
}

// 특정 폴더의 직속 하위 폴더 목록 (devlog.ts getSubFolders와 동일)
function getSubFoldersOf(parentFolder) {
  const folderPath = parentFolder
    ? path.join(devlogDir, parentFolder)
    : devlogDir;
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return [];
  }
  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
}

// 부모 폴더 → 하위 폴더 맵 생성 (재귀적으로 모든 폴더 탐색)
function getSubFoldersMap(folders) {
  const map = {};
  function collect(parentFolder) {
    const subFolders = getSubFoldersOf(parentFolder);
    if (subFolders.length > 0) {
      map[parentFolder || ''] = subFolders;
      for (const sub of subFolders) {
        const fullPath = parentFolder ? `${parentFolder}/${sub}` : sub;
        collect(fullPath);
      }
    }
  }
  for (const folder of folders) {
    collect(folder);
  }
  return map;
}

function generate() {
  if (!fs.existsSync(devlogDir)) {
    console.warn('content/devlog 폴더가 없습니다.');
    fs.writeFileSync(indexPath, JSON.stringify({ entries: [], folders: [], subFoldersMap: {} }, null, 2));
    return;
  }

  const files = collectMarkdownFiles(devlogDir);
  const folders = getTopFolders();
  const subFoldersMap = getSubFoldersMap(folders);

  const entries = files.map(({ fullPath, folder }) => {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const fileName = path.basename(fullPath);
    const folderNormalized = folder ? folder.replace(/\\/g, '/') : '';
    const slug = folderNormalized
      ? `${folderNormalized}/${fileName.replace(/\.md$/, '')}`
      : fileName.replace(/\.md$/, '');

    return {
      slug,
      title: data.title || '',
      date: formatDate(data.date),
      folder: folderNormalized || undefined,
    };
  });

  // 날짜순 정렬 (최신순)
  entries.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });

  const index = {
    entries,
    folders,
    subFoldersMap,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`devlog 인덱스 갱신 완료: ${entries.length}개 포스트`);
}

generate();
