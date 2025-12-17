# SalaryLens Blog System

Blog system cho SalaryLens với 5 bài viết chất lượng cao về tài chính và đàm phán lương.

## 📁 Cấu trúc

```
app/
├── blog/
│   ├── page.tsx                    # Blog listing page
│   ├── [slug]/page.tsx             # Individual blog post
│   └── layout.tsx                  # Blog layout
components/blog/
│   ├── blog-card.tsx               # Blog post card component
│   ├── category-filter.tsx         # Category filter
│   ├── search-bar.tsx              # Search functionality
│   ├── blog-post.tsx               # MDX renderer
│   ├── breadcrumb.tsx              # Breadcrumb navigation
│   └── share-icons.tsx             # Social sharing
content/blog/
│   ├── gross-to-net.mdx            # Bài 1: Tính lương Gross → Net
│   ├── salary-negotiation.mdx      # Bài 2: Đàm phán lương
│   ├── tax-optimization.mdx        # Bài 3: Tối ưu thuế
│   ├── job-comparison.mdx          # Bài 4: So sánh job offers
│   └── financial-planning.mdx      # Bài 5: Quản lý tài chính
lib/
│   └── mdx.ts                      # MDX processing utilities
```

## 🚀 Features

### ✅ Đã implement:
- Blog listing với featured posts
- MDX support cho rich content
- Category filtering
- Search functionality
- Social sharing
- Related posts
- Reading time calculation
- Breadcrumb navigation
- Responsive design
- SEO optimization

### 📝 Bài viết:
1. **Cách tính lương Gross → Net** - Hướng dẫn chi tiết với ví dụ thực tế
2. **Đàm phán lương** - 7 bước tăng 20-30% thu nhập với scripts mẫu
3. **Tối ưu thuế TNCN** - 5 cách giảm thuế hợp pháp
4. **So sánh Job Offers** - Framework 5 bước chọn công việc tốt nhất
5. **Quản lý tài chính 50-30-20** - Hướng dẫn phân bổ lương hiệu quả

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **MDX** (Markdown + React components)
- **next-mdx-remote** (SSG support)
- **Framer Motion** (Animations)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **Gray-matter** (Frontmatter parsing)
- **Reading-time** (Read time calculation)

## 📝 Thêm bài viết mới

1. Tạo file mới trong `content/blog/` với format `slug.mdx`
2. Add frontmatter:
```yaml
---
title: 'Tiêu đề bài viết'
description: 'Mô tả ngắn'
date: 'YYYY-MM-DD'
author: 'SalaryLens Team'
category: 'Tên category'
tags: ['tag1', 'tag2', 'tag3']
featured: true/false
ogImage: '/og/image-name.jpg'
---
```

3. Viết content trong Markdown với support:
- Code blocks với syntax highlighting
- Tables
- Callout boxes
- Internal/external links

## 🎨 Customization

### Thay đổi style:
- Edit trong `components/blog/*.tsx`
- Sử dụng Tailwind classes
- Glass UI design consistency với main site

### Thêm components MDX:
- Add vào `components/blog/blog-post.tsx`
- Import và register trong `components` object

## 📊 SEO Optimization

### Meta tags tự động:
- Dynamic title và description
- Open Graph images
- Structured data (JSON-LD)
- Canonical URLs

### Internal linking:
- Mỗi bài link đến calculator
- Related articles tự động
- Breadcrumb navigation

## 🚀 Deployment

Blog được pre-rendered tại build time:
```bash
pnpm build
```
- Static generation cho performance
- Fast loading với Next.js Image optimization
- CDN friendly structure

## 📈 Analytics Tracking

Views và engagement được track qua:
- Page views cho mỗi bài
- Reading progress milestones
- Social share interactions
- Search query tracking

## 🔧 Maintenance

### Regular tasks:
- [ ] Update content quarterly
- [ ] Check broken links monthly
- [ ] Monitor analytics weekly
- [ ] Add new posts based on trends

### Performance:
- Images optimized với Next.js Image
- Lazy loading cho posts
- Minimal JavaScript bundle
- Core Web Vitals optimized

---

Blog này giúp **establish expertise** và **improve SEO** cho SalaryLens! 📝✨