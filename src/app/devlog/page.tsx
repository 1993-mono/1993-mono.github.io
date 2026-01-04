import {
  getDevlogFolders,
  getSubFolders,
  getDevlogPostsByFolder,
  getPostCount,
} from '@/lib/devlog';
import DevlogList from './components/DevlogList';
import './styles.scss';

export default function Devlog() {
  const folders = getDevlogFolders();
  const allPosts = getDevlogPostsByFolder(null);

  // 각 폴더의 포스트 개수 계산
  const folderPostCounts: Record<string, number> = {};
  folders.forEach((folder) => {
    folderPostCounts[folder] = getPostCount(folder);
  });

  // 각 폴더의 하위 폴더 목록 계산
  const subFoldersMap: Record<string, string[]> = {};
  folders.forEach((folder) => {
    const subFolders = getSubFolders(folder);
    if (subFolders.length > 0) {
      subFoldersMap[folder] = subFolders;
    }
  });

  // 전체 선택 시의 하위 폴더들도 계산 (중첩 폴더 포함)
  const allSubFolders = getSubFolders(null);
  allSubFolders.forEach((folder) => {
    const subFolders = getSubFolders(folder);
    if (subFolders.length > 0) {
      const folderPath = folder;
      subFoldersMap[folderPath] = subFolders;
      // 하위 폴더의 포스트 개수도 계산
      subFolders.forEach((subFolder) => {
        const fullPath = `${folder}/${subFolder}`;
        folderPostCounts[fullPath] = getPostCount(fullPath);
      });
    }
  });

  return (
    <DevlogList
      folders={folders}
      allPosts={allPosts}
      folderPostCounts={folderPostCounts}
      subFoldersMap={subFoldersMap}
    />
  );
}