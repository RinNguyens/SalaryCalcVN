'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from '@/components/blog/blog-card';
import { CategoryFilter } from '@/components/blog/category-filter';
import { SearchBar } from '@/components/blog/search-bar';
import { BlogHeader } from './BlogHeader';
import { Post } from '@/lib/mdx';
import { MagnifyingGlassIcon, SparklesIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { BackgroundElements } from '@/components/ui/background-elements';
import {
  trackBlogPostView,
  trackSearch,
  trackFormSubmission,
  trackUserInteraction
} from '@/lib/analytics';

interface BlogClientProps {
  allPosts: Post[];
  featuredPosts: Post[];
  categories: string[];
}

export function BlogClient({ allPosts, featuredPosts, categories }: BlogClientProps) {
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'recent'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date');
  const [showFilters, setShowFilters] = useState(false);

  // Track blog page view
  useEffect(() => {
    trackBlogPostView('blog_index', 'blog_list', allPosts.length * 5); // Estimate 5 minutes per post
  }, [allPosts.length]);

  useEffect(() => {
    let filtered = allPosts;

    // Apply tab filter
    if (activeTab === 'featured') {
      filtered = filtered.filter(post => post.featured);
    } else if (activeTab === 'recent') {
      filtered = filtered.slice(0, 6); // Show 6 most recent posts
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
      // Track category filter usage
      trackUserInteraction(`category_${selectedCategory}`, 'blog_filter');
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      // Track search usage
      trackSearch(searchQuery, filtered.length);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'readTime') {
        return parseInt(a.readTime) - parseInt(b.readTime);
      }
      return 0;
    });

    setFilteredPosts(filtered);
  }, [allPosts, selectedCategory, searchQuery, activeTab, sortBy]);

  const postCount = filteredPosts.length;
  const featuredCount = filteredPosts.filter(p => p.featured).length;

  return (
    <>
      {/* Header */}
      <BlogHeader />

      <div className="min-h-screen">
        <BackgroundElements />
        {/* Hero Section */}
        <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/70 backdrop-blur-md border border-white/70 mb-6
                       text-center">
              <SparklesIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-700 text-sm font-medium">
                5+ bài viết chuyên sâu về tài chính
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Blog <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SalaryLens</span>
            </h1>

            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Cẩm nang toàn diện về tính lương, đàm phán, và tối ưu thuế cho người đi làm Việt Nam
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-black/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">{allPosts.length}</span>
                <span>Bài viết</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">{categories.length}</span>
                <span>Chủ đề</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">10K+</span>
                <span>Đọc giả</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Enhanced Search Section */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={(query) => setSearchQuery(query)} />

            {/* Search Results Summary */}
            {(searchQuery || selectedCategory || activeTab !== 'all') && (
              <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-black/80">
                    Tìm thấy <span className="font-bold text-purple-400">{postCount}</span> bài viết
                    {selectedCategory && (
                      <> trong chủ đề <span className="font-bold text-purple-400">{selectedCategory}</span></>
                    )}
                    {activeTab === 'featured' && (
                      <> nổi bật</>
                    )}
                    {activeTab === 'recent' && (
                      <> gần đây</>
                    )}
                    {searchQuery && (
                      <> cho "<span className="font-bold text-purple-400">{searchQuery}</span>"</>
                    )}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setActiveTab('all');
                      trackUserInteraction('clear_filters', 'blog_filter');
                    }}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm rounded-full transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs and Filter Controls */}
        <div className="mb-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-lg'
                    : 'text-black/60 hover:text-black hover:bg-white/5'
                }`}
              >
                Tất cả bài viết
                <span className="ml-2 px-2 py-0.5 bg-black/10 rounded-full text-xs">
                  {allPosts.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'featured'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-lg'
                    : 'text-black/60 hover:text-black hover:bg-white/5'
                }`}
              >
                Nổi bật
                <span className="ml-2 px-2 py-0.5 bg-black/10 rounded-full text-xs">
                  {featuredPosts.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'recent'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-lg'
                    : 'text-black/60 hover:text-black hover:bg-white/5'
                }`}
              >
                Gần đây
                <span className="ml-2 px-2 py-0.5 bg-black/10 rounded-full text-xs">
                  {Math.min(6, allPosts.length)}
                </span>
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-black" />
              <span className="font-medium text-black">Bộ lọc</span>
              {(selectedCategory || sortBy !== 'date') && (
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mb-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-black/60 mb-3">Danh mục</h3>
                  <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="text-sm font-medium text-black/60 mb-3">Sắp xếp theo</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'date', label: 'Mới nhất' },
                      { value: 'title', label: 'Tiêu đề' },
                      { value: 'readTime', label: 'Thời gian đọc' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          sortBy === option.value
                            ? 'bg-purple-500 text-black'
                            : 'bg-white/10 text-black/60 hover:bg-white/20 hover:text-black'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <section>
          {postCount > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-20 h-20 text-black/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-black mb-3">
                  Không tìm thấy bài viết nào
                </h3>
                <p className="text-black/60 mb-8 leading-relaxed">
                  Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác để tìm thấy bài viết bạn quan tâm.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setActiveTab('all');
                      trackUserInteraction('clear_filters', 'blog_filter');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-black font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Đặt lại bộ lọc
                  </button>
                  <button
                    onClick={() => setActiveTab('all')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-black font-medium rounded-full transition-all duration-200 border border-white/20"
                  >
                    Xem tất cả bài viết
                  </button>
                </div>
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

              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Đăng ký nhận bài viết mới
              </h2>

              <p className="text-black/80 mb-8 text-lg">
                Nhận ngay cẩm nang tài chính và các tips đàm phán lương hiệu quả qua email hàng tuần
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email') as string;

                  // Track newsletter signup
                  trackFormSubmission('newsletter_signup', true);
                  trackUserInteraction('newsletter_signup_blog', 'engagement');

                  // Handle newsletter signup
                  alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi email xác nhận.');
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  required
                  className="flex-1 px-6 py-3 bg-white/10 border border-black/50 rounded-full text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Đăng ký
                </button>
              </form>

              <p className="text-black/60 text-sm mt-4">
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