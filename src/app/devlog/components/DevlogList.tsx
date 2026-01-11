'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { DevlogPost } from '@/lib/devlog';
import { useDevlogStore } from '@/stores/devlog';

interface DevlogListProps {
  folders: string[];
  allPosts: DevlogPost[];
  folderPostCounts: Record<string, number>;
  subFoldersMap: Record<string, string[]>;
}

export default function DevlogList({
  folders,
  allPosts,
  folderPostCounts,
  subFoldersMap,
}: DevlogListProps) {
  const { selectedPrimaryTab, selectedSecondaryTab, setSelectedPrimaryTab, setSelectedSecondaryTab } = useDevlogStore();

  const secondaryTabs = useMemo(() => {
    if (selectedPrimaryTab === null) {
      return [];
    }
    return subFoldersMap[selectedPrimaryTab] || [];
  }, [selectedPrimaryTab, subFoldersMap]);

  const filteredPosts = useMemo(() => {
    let targetFolder: string | null = null;

    if (selectedSecondaryTab !== null && selectedPrimaryTab !== null) {
      targetFolder = `${selectedPrimaryTab}/${selectedSecondaryTab}`;
    } else if (selectedPrimaryTab !== null) {
      targetFolder = selectedPrimaryTab;
    }

    if (targetFolder === null) {
      return allPosts;
    }

    return allPosts.filter((post) => {
      if (!post.folder) {
        return targetFolder === null;
      }
      const folderNormalized = targetFolder.replace(/\\/g, '/');
      const postFolderNormalized = post.folder.replace(/\\/g, '/');
      return (
        postFolderNormalized === folderNormalized ||
        postFolderNormalized.startsWith(folderNormalized + '/')
      );
    });
  }, [selectedPrimaryTab, selectedSecondaryTab, allPosts]);

  const getPostCount = (folder: string | null): number => {
    if (folder === null) {
      return allPosts.length;
    }
    return folderPostCounts[folder] || 0;
  };

  const handlePrimaryTabClick = (folder: string | null) => {
    setSelectedPrimaryTab(folder);
  };

  const handleSecondaryTabClick = (folder: string | null) => {
    setSelectedSecondaryTab(folder);
  };

  return (
    <>
      <p>[개선사항]</p>
      <p>- 탭 활성화 시 활성화된 탭 뒤로 움직이는 배경 작업 예정</p>

      {/* 탭 목록 */}
      {folders.length > 0 && (
        <>
          {/* 1차 탭 */}
          <div className="tabs primary" aria-label="1차 탭">
            <button
              type="button"
              onClick={() => handlePrimaryTabClick(null)}
              className={`tab-button ${selectedPrimaryTab === null ? 'active' : ''}`}
            >
              전체 <span className="count">{getPostCount(null)}</span>
            </button>
            {folders.map((folder) => (
              <button
                key={folder}
                type="button"
                onClick={() => handlePrimaryTabClick(folder)}
                className={`tab-button ${selectedPrimaryTab === folder ? 'active' : ''}`}
              >
                {folder} <span className="count">{getPostCount(folder)}</span>
              </button>
            ))}
          </div>

          {/* 2차 탭 */}
          {selectedPrimaryTab !== null && secondaryTabs.length > 0 && (
            <div className="tabs secondary" aria-label="2차 탭">
              <button
                type="button"
                onClick={() => handleSecondaryTabClick(null)}
                className={`tab-button ${selectedSecondaryTab === null ? 'active' : ''}`}
              >
                전체 <span className="count">{getPostCount(selectedPrimaryTab)}</span>
              </button>
              {secondaryTabs.map((folder) => {
                const folderPath = `${selectedPrimaryTab}/${folder}`;
                return (
                  <button
                    key={folder}
                    type="button"
                    onClick={() => handleSecondaryTabClick(folder)}
                    className={`tab-button ${selectedSecondaryTab === folder ? 'active' : ''}`}
                  >
                    {folder} <span className="count">{getPostCount(folderPath)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* 포스트 목록 */}
      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <p className="no-data">아직 작성된 글이 없습니다.</p>
        ) : (
          <ul>
            {filteredPosts.map((post: DevlogPost) => {
              let categoryPath = '';
              
              if (post.folder) {
                const folderParts = post.folder.split('/');
                
                if (selectedPrimaryTab === null) {
                  categoryPath = folderParts.join(' / ');
                } else if (selectedSecondaryTab !== null) {
                  const targetPath = `${selectedPrimaryTab}/${selectedSecondaryTab}`;
                  const postFolderNormalized = post.folder.replace(/\\/g, '/');
                  
                  if (postFolderNormalized.startsWith(targetPath + '/')) {
                    const remainingPath = postFolderNormalized.substring(targetPath.length + 1);
                    if (remainingPath) {
                      categoryPath = remainingPath.split('/').join(' / ');
                    }
                  }
                } else {
                  const postFolderNormalized = post.folder.replace(/\\/g, '/');
                  
                  if (postFolderNormalized.startsWith(selectedPrimaryTab + '/')) {
                    const remainingPath = postFolderNormalized.substring(selectedPrimaryTab.length + 1);
                    if (remainingPath) {
                      categoryPath = remainingPath.split('/').join(' / ');
                    }
                  }
                }
              }

              return (
                <li key={post.slug}>
                  <Link
                    href={`/devlog/${post.slug}`}
                    className="post-button"
                  >
                    {categoryPath && <p className="category">{categoryPath}</p>}
                    <h3 className="title">{post.title}</h3>
                    <p className="date">{post.date}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}