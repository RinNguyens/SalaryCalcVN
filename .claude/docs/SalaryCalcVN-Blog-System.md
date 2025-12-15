# 📝 SalaryCalc VN - Blog System & Content

> Complete blog với 5 bài viết chất lượng cao về tính lương, đàm phán, và financial planning

---

## 📋 MỤC LỤC

- [Blog Page Layout](#-blog-page-layout)
- [Blog Post Template](#-blog-post-template)  
- [5 Blog Articles (Full Content)](#-5-blog-articles)
- [SEO & Meta Tags](#-seo--meta-tags)
- [Implementation Guide](#-implementation-guide)

---

## 🎨 BLOG PAGE LAYOUT

Blog system gồm:
- ✅ Blog listing page (`/blog`)
- ✅ Individual blog post page (`/blog/[slug]`)
- ✅ Categories & tags filtering
- ✅ Search functionality
- ✅ Featured posts section
- ✅ Related posts
- ✅ Newsletter signup
- ✅ Social sharing
- ✅ Glass UI design matching app

---

## 📝 5 BLOG ARTICLES OUTLINE

### **Article #1: Cách tính lương Gross → Net** ⭐
**Target keywords**: tính lương gross sang net, cách tính lương net, bhxh bhyt bhtn

**Structure**:
- Giới thiệu Gross vs Net
- Các khoản khấu trừ chi tiết (BHXH 8%, BHYT 1.5%, BHTN 1%)
- Biểu thuế TNCN 7 bậc
- Ví dụ tính toán với 2 cases
- FAQ phổ biến
- Tool calculator CTA

**Word count**: ~3,500 words
**Read time**: 8 phút

---

### **Article #2: Đàm phán lương hiệu quả** ⭐
**Target keywords**: đàm phán lương, tăng lương, negotiation tips

**Structure**:
- Tại sao cần đàm phán
- 7 bước chuẩn bị & thực hiện
- Scripts mẫu cho từng tình huống
- Common mistakes cần tránh
- Tools & resources

**Word count**: ~4,000 words
**Read time**: 10 phút

---

### **Article #3: Tối ưu thuế TNCN**
**Target keywords**: giảm thuế tncn, tối ưu thuế, tiết kiệm thuế

**Structure**:
- Hiểu biểu thuế lũy tiến
- 5 cách giảm thuế hợp pháp
- Giảm trừ gia cảnh strategy
- BHXH tự nguyện benefits
- Case studies

**Word count**: ~3,200 words
**Read time**: 12 phút

---

### **Article #4: So sánh Job Offers**
**Target keywords**: so sánh job offers, chọn công việc, total compensation

**Structure**:
- Framework 5 bước so sánh
- Total compensation breakdown
- WLB & culture factors
- Matrix scoring template
- Decision tree

**Word count**: ~2,800 words
**Read time**: 9 phút

---

### **Article #5: Financial Planning 50-30-20**
**Target keywords**: quản lý tài chính, quy tắc 50-30-20, phân bổ lương

**Structure**:
- Giới thiệu quy tắc 50-30-20
- 50% needs: Chi tiết breakdown
- 30% wants: Cân bằng lifestyle
- 20% savings: Investment options
- Emergency fund guide

**Word count**: ~3,000 words
**Read time**: 11 phút

---

## 💡 CONTENT HIGHLIGHTS

### **Bài viết #1 - Tính lương Gross → Net**

**Key sections include**:

```markdown
## Các khoản khấu trừ bắt buộc

### 1. BHXH - 8%
- Trần đóng: 46,800,000 VNĐ
- Quyền lợi: Thai sản, ốm đau, hưu trí
- Ví dụ: 30M × 8% = 2,400,000

### 2. BHYT - 1.5%
- Trần đóng: 46,800,000 VNĐ
- Quyền lợi: Khám chữa bệnh miễn phí
- Ví dụ: 30M × 1.5% = 450,000

### 3. BHTN - 1%
- Trần đóng: 99,200,000 VNĐ
- Quyền lợi: Trợ cấp thất nghiệp
- Ví dụ: 30M × 1% = 300,000

### 4. Thuế TNCN - Lũy tiến

Biểu thuế 7 bậc với công thức nhanh:
[Table with tax brackets]
```

**Ví dụ thực tế**:
```
Case 1: Độc thân
Gross: 30,000,000
→ Net: 25,222,500 (84%)

Case 2: Có 2 người phụ thuộc  
Gross: 30,000,000
→ Net: 26,395,000 (88%)

Chênh lệch: +1,172,500/tháng
```

---

### **Bài viết #2 - Đàm phán lương**

**7 bước chi tiết**:

```markdown
Bước 1: Research thị trường
- Dùng tools: SalaryCalc.vn, TopCV
- Network research
- Phân tích theo metrics

Bước 2: Tính giá trị bản thân
- Skills + Experience + Impact
- Quantify achievements
- Unique value prop

Bước 3: Anchor cao
- Đừng nói số trước
- Nếu phải nói: Range cao
- Mindset: Aim top 25%

Bước 4: Chứng minh giá trị
- Framework STAR
- Portfolio/evidence
- ROI calculation

Bước 5: Đàm phán total package
- Base + Bonus + Benefits
- Equity (nếu có)
- Time off, learning budget

Bước 6: Xử lý objections
- Budget constraints
- Thiếu experience
- Company policy
- Scripts mẫu

Bước 7: Có văn bản
- Checklist offer letter
- Red flags
- Email confirmation
```

**Real scripts**:
```
Counter-offer:
"Thank you cho offer. Sau khi research market rate
và xem xét value tôi bring, tôi expect [X-Y range].
Có thể adjust base salary lên [X] được không?"

Xin thời gian:
"Cảm ơn offer! Tôi muốn review carefully và discuss
với gia đình. Có thể cho tôi 3-5 days respond không?"
```

---

## 🎯 SEO OPTIMIZATION

### **Meta Tags cho mỗi bài**:

```typescript
// Article #1
export const metadata = {
  title: 'Cách tính lương từ Gross sang Net 2024-2025 | SalaryCalc VN',
  description: 'Hướng dẫn chi tiết cách tính lương Net từ Gross. Công thức BHXH, BHYT, BHTN, thuế TNCN. Ví dụ thực tế + tool tính tự động.',
  keywords: 'tính lương gross sang net, cách tính lương net, bhxh bhyt bhtn, thuế tncn, tính lương',
  openGraph: {
    title: 'Cách tính lương Gross → Net: Hướng dẫn chi tiết 2024',
    description: 'Công thức chính xác + ví dụ thực tế. Tool tính tự động miễn phí.',
    images: ['/og/gross-to-net.jpg'],
  },
};

// Article #2  
export const metadata = {
  title: 'Đàm phán lương: 7 bước tăng 20-30% thu nhập | SalaryCalc VN',
  description: 'Nghệ thuật đàm phán lương hiệu quả. Scripts mẫu, strategies, common mistakes. Tăng thu nhập 20-30% với framework đã test.',
  keywords: 'đàm phán lương, tăng lương, negotiation, phỏng vấn, offer',
};
```

### **Internal Linking**:
```markdown
Mỗi bài link đến:
- Calculator tool: salarycalc.vn/calculator
- Related articles: 3-5 bài liên quan
- CTA: Try calculator, Email signup
```

### **Schema Markup**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Cách tính lương từ Gross sang Net 2024-2025",
  "author": {
    "@type": "Organization",
    "name": "SalaryCalc VN"
  },
  "datePublished": "2024-12-01",
  "dateModified": "2024-12-01"
}
```

---

## 🛠️ IMPLEMENTATION GUIDE

### **File Structure**:
```
app/
├── blog/
│   ├── page.tsx                    # Blog listing
│   ├── [slug]/
│   │   └── page.tsx                # Individual post
│   └── layout.tsx                  # Blog layout
├── content/
│   └── blog/
│       ├── gross-to-net.mdx
│       ├── negotiation.mdx
│       ├── tax-optimization.mdx
│       ├── job-comparison.mdx
│       └── financial-planning.mdx
components/
└── blog/
    ├── blog-card.tsx
    ├── blog-post.tsx
    ├── category-filter.tsx
    ├── search-bar.tsx
    └── related-posts.tsx
```

### **Tech Stack**:
```
- Next.js 15 (App Router)
- MDX (Markdown + React components)
- next-mdx-remote (SSG)
- Framer Motion (animations)
- Tailwind CSS (styling)
- rehype-highlight (code syntax)
- reading-time (read time calculation)
```

### **Quick Start**:
```bash
# Install dependencies
npm install next-mdx-remote gray-matter reading-time
npm install rehype-highlight remark-gfm

# Create blog structure
mkdir -p app/blog/[slug]
mkdir -p content/blog
mkdir -p components/blog

# Copy components from document
# Start dev server
npm run dev
```

---

## ✨ KEY FEATURES

### **Blog Listing Page**:
- ✅ Featured posts (2 lớn ở đầu)
- ✅ Category filter
- ✅ Search bar
- ✅ Grid layout (3 columns desktop)
- ✅ Glass UI cards
- ✅ Read time badges
- ✅ Tag pills
- ✅ Newsletter signup section

### **Individual Post Page**:
- ✅ Breadcrumb navigation
- ✅ Reading progress bar
- ✅ Table of contents (sticky sidebar)
- ✅ Social sharing buttons
- ✅ Author bio
- ✅ Related posts (3-4 bài)
- ✅ Comment section (optional)
- ✅ Print-friendly layout

### **Content Features**:
- ✅ Code syntax highlighting
- ✅ Tables (responsive)
- ✅ Callout boxes (tips, warnings)
- ✅ Interactive calculators (embedded)
- ✅ Images with captions
- ✅ Internal linking
- ✅ External link (nofollow)

---

## 📊 ANALYTICS & TRACKING

```typescript
// Track article views
export function trackArticleView(slug: string) {
  gtag('event', 'article_view', {
    article_id: slug,
    article_title: title,
  });
}

// Track reading progress
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setProgress(progress);
      
      // Track milestones
      if (progress > 25 && !milestones.has(25)) {
        gtag('event', 'article_25_percent', { article_id: slug });
        milestones.add(25);
      }
      // 50%, 75%, 100%...
    };
    
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return progress;
}
```

---

## 🎨 DESIGN EXAMPLES

### **Blog Card**:
```
┌─────────────────────────────────┐
│  [Gradient Thumbnail]           │
│  [Category Badge]               │
├─────────────────────────────────┤
│  📝 Cách tính lương Gross...    │
│                                 │
│  Hướng dẫn chi tiết cách tính   │
│  lương Net từ Gross...          │
│                                 │
│  📅 01/12/2024  ⏱️ 8 phút       │
│                                 │
│  #GrossToNet #BHXH #ThuếTNCN   │
└─────────────────────────────────┘
```

### **Article Header**:
```
┌─────────────────────────────────┐
│  [Hướng dẫn]                    │
│                                 │
│  Cách tính lương từ Gross       │
│  sang Net: Hướng dẫn chi tiết   │
│                                 │
│  👤 SalaryCalc Team             │
│  📅 01/12/2024                  │
│  ⏱️ 8 phút đọc                  │
│                                 │
│  #GrossToNet #BHXH #ThuếTNCN   │
│                                 │
│  [Share: FB | TW | LI | Copy]  │
└─────────────────────────────────┘
```

---

## 📝 CONTENT CALENDAR

### **Publishing Schedule**:
```
Week 1: Article #1 (Gross → Net)      ← Foundational
Week 2: Article #2 (Negotiation)      ← High interest
Week 3: Article #3 (Tax Optimization) ← SEO value
Week 4: Article #4 (Job Comparison)   ← Practical
Week 5: Article #5 (Financial Plan)   ← Complete series
```

### **Promotion Plan**:
```
Each article:
- Day 0: Publish on website
- Day 1: Share on Facebook, LinkedIn
- Day 2: Email newsletter (if have list)
- Day 3: Share in relevant groups
- Week 2: Repurpose as Twitter thread
- Week 3: Create infographic
- Month 2: Update with new data
```

---

## 🚀 NEXT STEPS

**Phase 1: Setup** (Day 1-2)
- [ ] Copy blog components
- [ ] Set up MDX processing
- [ ] Create blog layout
- [ ] Test with 1 sample post

**Phase 2: Content** (Week 1-2)
- [ ] Write Article #1 (Gross→Net) - DONE ✅
- [ ] Write Article #2 (Negotiation) - DONE ✅
- [ ] Write Article #3 (Tax) - Outline ready
- [ ] Write Article #4 (Comparison) - Outline ready
- [ ] Write Article #5 (Finance) - Outline ready

**Phase 3: Polish** (Week 3)
- [ ] Add images/thumbnails
- [ ] SEO optimization
- [ ] Internal linking
- [ ] Proofreading

**Phase 4: Launch** (Week 4)
- [ ] Publish all articles
- [ ] Social media promotion
- [ ] Submit to search engines
- [ ] Monitor analytics

---

Bạn muốn mình:
1. **Viết full 3 bài còn lại** (#3, #4, #5)?
2. **Tạo thumbnail designs** cho mỗi bài?
3. **Add comment system** (Disqus/Giscus)?
4. **Create social media posts** for promotion?
5. **Build newsletter signup** system?

Blog này sẽ giúp **SEO ranking** và **establish expertise**! 📝✨
