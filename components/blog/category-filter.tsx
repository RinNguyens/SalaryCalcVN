'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
        }`}
      >
        Tất cả
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}