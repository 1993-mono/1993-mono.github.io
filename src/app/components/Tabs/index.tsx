'use client';

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
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="tabs" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.value ?? 'all'}
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