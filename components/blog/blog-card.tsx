'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/mdx';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = post.image || '/images/blog/default.svg';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image container with gradient overlay */}
      <div className={`${featured ? 'h-48 md:h-64' : 'h-48'} relative overflow-hidden`}>
        {imageUrl.endsWith('.svg') ? (
          // SVG image
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-contain p-4"
            />
          </div>
        ) : (
          // Other image formats
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1.5 bg-purple-500/90 text-black text-xs font-medium rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-medium rounded-full backdrop-blur-sm">
              <span>⭐</span> Nổi bật
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('vi-VN', {
              day: 'numeric',
              month: 'short'
            })}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-black mb-3 group-hover:text-purple-400 transition-colors line-clamp-2 ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 mb-4 line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>

        {/* Tags and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-white/5 text-xs text-slate-300 rounded-lg hover:bg-white/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-2.5 py-1 bg-white/5 text-xs text-slate-300 rounded-lg">
                +{post.tags.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-purple-400 group-hover:text-purple-300 transition-all duration-200">
            <span className="text-sm font-medium">Đọc thêm</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}