import { getAllPosts, getFeaturedPosts, getCategories } from '@/lib/mdx';
import { BlogClient } from './BlogClient';

export const metadata = {
  title: 'Blog SalaryLens - Kiến thức về lương, thuế và đàm phán',
  description: 'Tổng hợp bài viết hữu ích về cách tính lương, tối ưu thuế, kỹ năng đàm phán và quản lý tài chính cá nhân cho người đi làm Việt Nam.',
  openGraph: {
    title: 'Blog SalaryLens - Kiến thức tài chính cho người đi làm',
    description: 'Cẩm nang toàn diện về lương, thuế và đàm phán công việc',
    images: ['/og/blog.jpg'],
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();
  const categories = getCategories();

  return (
    <BlogClient
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      categories={categories}
    />
  );
}