import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/mdx';
import { BlogPost } from '@/components/blog/blog-post';
import { ShareIcons } from '@/components/blog/share-icons';
import { Breadcrumb } from '@/components/blog/breadcrumb';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
    };
  }

  return {
    title: `${post.title} | SalaryLens Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.ogImage ? [post.ogImage] : ['/og/default-blog.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <Breadcrumb category={post.category} />

        {/* Article Header with Hero Image */}
        <header className="mb-12">
          {/* Hero Image */}
          {post.image && (
            <div className="mb-8">
              <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-3xl">
                {post.image.endsWith('.svg') ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                ) : (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-500/90 text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{new Date(post.date).toLocaleDateString('vi-VN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white rounded-full text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <ShareIcons
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`}
                title={post.title}
              />
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <BlogPost post={post} relatedPosts={relatedPosts} />
        </div>

        {/* Call to Action */}
        <section className="mt-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Tính lương Net chính xác trong 30 giây
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Sử dụng công cụ tính lương miễn phí của SalaryLens để biết chính xác thu nhập thực nhận của bạn
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Dùng thử ngay
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}