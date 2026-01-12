'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { DevlogPost } from '@/lib/devlog';
import { useDevlogStore } from '@/stores/devlog';
import Tabs from '@/app/components/Tabs';

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

  const handlePrimaryTabClick = (value: string | number | null) => {
    setSelectedPrimaryTab(value as string | null);
  };

  const handleSecondaryTabClick = (value: string | number | null) => {
    setSelectedSecondaryTab(value as string | null);
  };

  return (
    <>
      <p>[개선사항]</p>
      <p>- 탭 활성화 시 활성화된 탭 뒤로 움직이는 배경 작업 예정</p>

      {/* 탭 목록 */}
      {folders.length > 0 && (
        <>
          {/* 1차 탭 */}
          <Tabs
            items={[
              { label: '전체', value: null, count: getPostCount(null) },
              ...folders.map((folder) => ({
                label: folder,
                value: folder,
                count: getPostCount(folder),
              })),
            ]}
            selectedValue={selectedPrimaryTab}
            onTabClick={handlePrimaryTabClick}
            ariaLabel="1차 탭"
          />

          {/* 2차 탭 */}
          {selectedPrimaryTab !== null && secondaryTabs.length > 0 && (
            <Tabs
              items={[
                { label: '전체', value: null, count: getPostCount(selectedPrimaryTab) },
                ...secondaryTabs.map((folder) => {
                  const folderPath = `${selectedPrimaryTab}/${folder}`;
                  return {
                    label: folder,
                    value: folder,
                    count: getPostCount(folderPath),
                  };
                }),
              ]}
              selectedValue={selectedSecondaryTab}
              onTabClick={handleSecondaryTabClick}
              ariaLabel="2차 탭"
            />
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