'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TocItem } from '@/lib/markdown';
import PostAsideToc from './PostAsideToc';
import PostAsideTocBars from './PostAsideTocBars';

interface PostAsideProps {
  items: TocItem[];
}

export default function PostAside({ items }: PostAsideProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="post-aside"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PostAsideTocBars items={items} />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="post-aside-toc-panel"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: -20 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PostAsideToc items={items} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
