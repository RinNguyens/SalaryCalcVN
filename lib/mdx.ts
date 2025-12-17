import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  readTime: string;
  content?: string;
  ogImage?: string;
  image?: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author || 'SalaryLens Team',
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        readTime: readingTime(content).text,
        ogImage: data.ogImage,
        image: data.image,
      } as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPostsData;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || 'SalaryLens Team',
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      readTime: readingTime(content).text,
      content,
      ogImage: data.ogImage,
      image: data.image,
    } as Post;
  } catch (error) {
    return null;
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, 2);
}

export async function getRelatedPosts(currentSlug: string, category: string, limit = 3): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getCategories(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const categories = new Set<string>();

  fileNames.forEach(fileName => {
    if (fileName.endsWith('.mdx')) {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (data.category) {
        categories.add(data.category);
      }
    }
  });

  return Array.from(categories);
}

export function getAllTags(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const tags = new Set<string>();

  fileNames.forEach(fileName => {
    if (fileName.endsWith('.mdx')) {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => tags.add(tag));
      }
    }
  });

  return Array.from(tags);
}