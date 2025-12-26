'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { DevlogPost } from '@/lib/devlog';

interface DevlogTabsProps {
  folders: string[];
  allPosts: DevlogPost[];
  folderPostCounts: Record<string, number>;
  subFoldersMap: Record<string, string[]>;
}

export default function DevlogTabs({
  folders,
  allPosts,
  folderPostCounts,
  subFoldersMap,
}: DevlogTabsProps) {
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
      {/* 1차 탭 */}
      <div className="tabs-primary mb-4">
        <button
          type="button"
          onClick={() => handlePrimaryTabClick(null)}
          className={`tab-button ${selectedPrimaryTab === null ? 'active' : ''}`}
        >
          전체 ({getPostCount(null)})
        </button>
        {folders.map((folder) => (
          <button
            key={folder}
            type="button"
            onClick={() => handlePrimaryTabClick(folder)}
            className={`tab-button ${selectedPrimaryTab === folder ? 'active' : ''}`}
          >
            {folder} ({getPostCount(folder)})
          </button>
        ))}
      </div>

      {/* 2차 탭 (1차 탭이 선택되었고 하위 폴더가 있을 때만 표시) */}
      {selectedPrimaryTab !== null && secondaryTabs.length > 0 && (
        <div className="tabs-secondary mb-4">
          <button
            type="button"
            onClick={() => handleSecondaryTabClick(null)}
            className={`tab-button ${selectedSecondaryTab === null ? 'active' : ''}`}
          >
            전체 ({getPostCount(selectedPrimaryTab)})
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
                {folder} ({getPostCount(folderPath)})
              </button>
            );
          })}
        </div>
      )}

      {/* 포스트 목록 */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map((post: DevlogPost) => (
            <li key={post.slug}>
              <Link
                href={`/devlog/${post.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

