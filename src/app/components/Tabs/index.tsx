'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import './styles.scss';

interface TabItem {
  label: string;
  value: string | number | null;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  selectedValue: string | number | null;
  onTabClick: (value: string | number | null) => void;
  ariaLabel?: string;
}

export default function Tabs({
  items,
  selectedValue,
  onTabClick,
  ariaLabel,
}: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>({ left: 0, top: 0, width: 0, height: 0 });

  const updateIndicatorPosition = () => {
    const activeIndex = items.findIndex(
      (item) => item.value === selectedValue
    );

    if (activeIndex === -1 || !buttonRefs.current[activeIndex] || !tabsRef.current) {
      return;
    }

    const activeButton = buttonRefs.current[activeIndex];
    const tabsContainer = tabsRef.current;

    const buttonRect = activeButton.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    const left = buttonRect.left - containerRect.left;
    const top = buttonRect.top - containerRect.top;
    const width = buttonRect.width;
    const height = buttonRect.height;

    setIndicatorStyle({ left, top, width, height });
  };

  useLayoutEffect(() => {
    updateIndicatorPosition();
  }, [selectedValue, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedValue, items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="tabs" ref={tabsRef} aria-label={ariaLabel}>
      <div
        ref={indicatorRef}
        className="tab-indicator"
        style={{
          left: `${indicatorStyle.left}px`,
          top: `${indicatorStyle.top}px`,
          width: `${indicatorStyle.width}px`,
          height: `${indicatorStyle.height}px`,
        }}
      />
      {items.map((item, index) => (
        <button
          key={item.value ?? 'all'}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          type="button"
          onClick={() => onTabClick(item.value)}
          className={`tab-button ${selectedValue === item.value ? 'active' : ''}`}
        >
          {item.label}
          {item.count !== undefined && <span className="count">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}