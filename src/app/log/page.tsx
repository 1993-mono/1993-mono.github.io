import {
  getLogFolders,
  getSubFolders,
  getLogPostsByFolder,
  getPostCount,
} from '@/lib/log';
import LogList from './components/LogList';

export default function Log() {
  const folders = getLogFolders();
  const allPosts = getLogPostsByFolder(null);

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
    <LogList
      folders={folders}
      allPosts={allPosts}
      folderPostCounts={folderPostCounts}
      subFoldersMap={subFoldersMap}
    />
  );
}
