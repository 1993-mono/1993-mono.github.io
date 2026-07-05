import {
  getDevlogFolders,
  getSubFolders,
  getDevlogPostsByFolder,
  getPostCount,
} from '@/lib/devlog';
import DevlogList from './components/DevlogList';

export default function Devlog() {
  const folders = getDevlogFolders();
  const allPosts = getDevlogPostsByFolder(null);

  // Compute post count per folder
  const folderPostCounts: Record<string, number> = {};
  folders.forEach((folder) => {
    folderPostCounts[folder] = getPostCount(folder);
  });

  // Compute subfolder lists per folder
  const subFoldersMap: Record<string, string[]> = {};
  folders.forEach((folder) => {
    const subFolders = getSubFolders(folder);
    if (subFolders.length > 0) {
      subFoldersMap[folder] = subFolders;
    }
  });

  // Also compute subfolders when "All" is selected (includes nested folders)
  const allSubFolders = getSubFolders(null);
  allSubFolders.forEach((folder) => {
    const subFolders = getSubFolders(folder);
    if (subFolders.length > 0) {
      const folderPath = folder;
      subFoldersMap[folderPath] = subFolders;
      // Compute post counts for nested subfolders
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
