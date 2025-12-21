'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  compact?: boolean;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange, compact = false }: CategoryFilterProps) {
  const categoryEmojis: Record<string, string> = {
    'Lương': '💰',
    'Thuế': '📊',
    'Đàm phán': '💼',
    'Tài chính': '💵',
    'Chuyên môn': '🎯',
    'Khác': '📌'
  };

  const buttonClass = compact
    ? "px-3 py-1.5 text-sm"
    : "px-4 py-2 text-sm font-medium";

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? 'justify-start' : 'justify-center'}`}>
      {/* All Categories Button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`
          ${buttonClass} rounded-full transition-all duration-200
          flex items-center gap-2
          ${selectedCategory === null
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-lg scale-105'
            : 'bg-white/10 text-black/80 hover:bg-white/20 hover:text-black hover:scale-105'
          }
        `}
      >
        <span>🌟</span>
        <span>Tất cả</span>
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            ${buttonClass} rounded-full transition-all duration-200
            flex items-center gap-2
            ${selectedCategory === category
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-lg scale-105'
              : 'bg-white/10 text-black/80 hover:bg-white/20 hover:text-black hover:scale-105'
            }
          `}
        >
          <span>{categoryEmojis[category] || '📌'}</span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
}