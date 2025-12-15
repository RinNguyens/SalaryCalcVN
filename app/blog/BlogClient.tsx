'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from '@/components/blog/blog-card';
import { CategoryFilter } from '@/components/blog/category-filter';
import { SearchBar } from '@/components/blog/search-bar';
import { BlogHeader } from './BlogHeader';
import { Post } from '@/lib/mdx';
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface BlogClientProps {
  allPosts: Post[];
  featuredPosts: Post[];
  categories: string[];
}

export function BlogClient({ allPosts, featuredPosts, categories }: BlogClientProps) {
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = allPosts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [allPosts, selectedCategory, searchQuery]);

  const postCount = filteredPosts.length;
  const featuredCount = filteredPosts.filter(p => p.featured).length;

  return (
    <>
      {/* Header */}
      <BlogHeader />

      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              5+ bài viết chuyên sâu về tài chính
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Blog <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SalaryCalc VN</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Cẩm nang toàn diện về tính lương, đàm phán, và tối ưu thuế cho người đi làm Việt Nam
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{allPosts.length}</span>
                <span>Bài viết</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{categories.length}</span>
                <span>Chủ đề</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">10K+</span>
                <span>Đọc giả</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            {(searchQuery || selectedCategory) && (
              <p className="text-center text-gray-400 mt-4">
                Tìm thấy <span className="text-white font-semibold">{postCount}</span> bài viết
                {selectedCategory && (
                  <> trong chủ đề <span className="text-white font-semibold">{selectedCategory}</span></>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Featured Posts */}
        {featuredCount > 0 && !searchQuery && !selectedCategory && (
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <SparklesIcon className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Bài viết nổi bật
                </h2>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">
                  {featuredCount}
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2  place-items-center">
                {featuredPosts.slice(0, 2).map((post) => (
                  <div key={post.slug} className="w-full max-w-md">
                    <BlogCard post={post} featured={post.featured} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {searchQuery || selectedCategory ? 'Kết quả' : 'Tất cả bài viết'}
            </h2>
            {postCount > 0 && (
              <span className="text-sm text-gray-400">
                {postCount} bài viết
              </span>
            )}
          </div>

          {postCount > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-400 mb-6">
                  Thử tìm kiếm với từ khóa khác hoặc chọn chủ đề khác nhé
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-full transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5" />
            <div className="relative text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
                <span>📧</span> Đăng ký miễn phí
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Đăng ký nhận bài viết mới
              </h2>

              <p className="text-gray-300 mb-8 text-lg">
                Nhận ngay cẩm nang tài chính và các tips đàm phán lương hiệu quả qua email hàng tuần
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle newsletter signup
                  alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi email xác nhận.');
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  required
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Đăng ký
                </button>
              </form>

              <p className="text-gray-500 text-sm mt-4">
                Cam kết không spam. Hủy đăng ký bất cứ lúc nào.
              </p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}