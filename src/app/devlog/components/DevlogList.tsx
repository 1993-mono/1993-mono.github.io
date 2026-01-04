'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { DevlogPost } from '@/lib/devlog';

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
  const [selectedPrimaryTab, setSelectedPrimaryTab] = useState<string | null>(null);
  const [selectedSecondaryTab, setSelectedSecondaryTab] = useState<string | null>(null);

  // 2차 탭 목록 계산 (1차 탭이 선택되었고 하위 폴더가 있을 때만)
  const secondaryTabs = useMemo(() => {
    if (selectedPrimaryTab === null) {
      return []; // 전체 선택 시 2차 탭 표시 안 함
    }
    return subFoldersMap[selectedPrimaryTab] || [];
  }, [selectedPrimaryTab, subFoldersMap]);

  // 현재 선택된 탭에 따라 포스트 필터링
  const filteredPosts = useMemo(() => {
    let targetFolder: string | null = null;

    if (selectedSecondaryTab !== null && selectedPrimaryTab !== null) {
      // 2차 탭이 선택된 경우 (1차 탭이 선택되어 있어야 함)
      targetFolder = `${selectedPrimaryTab}/${selectedSecondaryTab}`;
    } else if (selectedPrimaryTab !== null) {
      // 1차 탭만 선택된 경우
      targetFolder = selectedPrimaryTab;
    }

    if (targetFolder === null) {
      return allPosts;
    }

    // 폴더별 필터링
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

  // 포스트 개수 계산 헬퍼
  const getPostCount = (folder: string | null): number => {
    if (folder === null) {
      return allPosts.length;
    }
    return folderPostCounts[folder] || 0;
  };

  // 1차 탭 클릭 핸들러
  const handlePrimaryTabClick = (folder: string | null) => {
    setSelectedPrimaryTab(folder);
    setSelectedSecondaryTab(null); // 1차 탭 변경 시 2차 탭 초기화
  };

  // 2차 탭 클릭 핸들러
  const handleSecondaryTabClick = (folder: string | null) => {
    setSelectedSecondaryTab(folder);
  };

  return (
    <main id="devlog">
      탭 활성화 시 활성화된 탭 뒤로 움직이는 배경 작업 예정

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
            {filteredPosts.map((post: DevlogPost) => (
              <li key={post.slug}>
                <Link
                  href={`/devlog/${post.slug}`}
                  className="post-button"
                >
                  <h3 className="title">{post.title}</h3>
                  <p className="date">{post.date}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

