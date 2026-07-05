'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Tab list */}
      {folders.length > 0 && (
        <>
          {/* Primary tabs */}
          <Tabs
            items={[
              { label: 'All', value: null, count: getPostCount(null) },
              ...folders.map((folder) => ({
                label: folder,
                value: folder,
                count: getPostCount(folder),
              })),
            ]}
            selectedValue={selectedPrimaryTab}
            onTabClick={handlePrimaryTabClick}
            ariaLabel="Primary tabs"
          />

          {/* Secondary tabs */}
          <AnimatePresence mode="popLayout">
            {selectedPrimaryTab !== null && secondaryTabs.length > 0 && (
              <motion.div
                key="secondary-tabs"
                initial={{ y: '-25%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-25%', opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Tabs
                  items={[
                    { label: 'All', value: null, count: getPostCount(selectedPrimaryTab) },
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
                  ariaLabel="Secondary tabs"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Post list */}
      <motion.div
        className="posts-list"
        layout
        transition={{
          layout: { duration: 0.15 }
        }}
      >
        {filteredPosts.length === 0 ? (
          <p className="no-data">No posts yet :^(</p>
        ) : (
          <ul>
            {filteredPosts.map((post: DevlogPost) => {
              let categoryPath: string[] = [];

              if (post.folder) {
                const folderParts = post.folder.split('/');

                if (selectedPrimaryTab === null) {
                  categoryPath = folderParts;
                } else if (selectedSecondaryTab !== null) {
                  const targetPath = `${selectedPrimaryTab}/${selectedSecondaryTab}`;
                  const postFolderNormalized = post.folder.replace(/\\/g, '/');

                  if (postFolderNormalized.startsWith(targetPath + '/')) {
                    const remainingPath = postFolderNormalized.substring(targetPath.length + 1);
                    if (remainingPath) {
                      categoryPath = remainingPath.split('/');
                    }
                  }
                } else {
                  const postFolderNormalized = post.folder.replace(/\\/g, '/');

                  if (postFolderNormalized.startsWith(selectedPrimaryTab + '/')) {
                    const remainingPath = postFolderNormalized.substring(selectedPrimaryTab.length + 1);
                    if (remainingPath) {
                      categoryPath = remainingPath.split('/');
                    }
                  }
                }
              }

              return (
                <motion.li
                  key={post.slug}
                  layout
                  transition={{
                    layout: { duration: 0.15 }
                  }}
                >
                  <Link
                    href={`/devlog/${post.slug}`}
                    className="post-button"
                  >
                    <AnimatePresence mode="popLayout">
                      {categoryPath.length > 0 && (
                        <motion.nav
                          className="category-navigation"
                          key="category-navigation"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <ol>
                            {categoryPath.map((category, index) => (
                              <li key={index}>{category}</li>
                            ))}
                          </ol>
                        </motion.nav>
                      )}
                    </AnimatePresence>
                    <motion.h3
                      className="title"
                      layout
                      transition={{
                        layout: { duration: 0.15 }
                      }}
                    >
                      {post.title}
                    </motion.h3>
                    <p className="date">
                      {post.date}
                    </p>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </>
  );
}