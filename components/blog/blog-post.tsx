import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { BlogCard } from './blog-card';
import { Post } from '@/lib/mdx';

interface BlogPostProps {
  post: Post;
  relatedPosts: Post[];
}

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl md:text-4xl font-bold text-black mt-8 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-black mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-bold text-black mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg md:text-xl font-semibold text-black mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-slate-300 my-4 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside text-slate-300 my-4 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside text-slate-300 my-4 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="pl-2">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 my-6 text-slate-300 italic bg-purple-500/10 py-2">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !match ? (
      <code className="px-1 py-0.5 bg-white/10 text-purple-300 rounded text-sm" {...props}>
        {children}
      </code>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 overflow-x-auto my-4">
      {children}
    </pre>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 underline transition-colors"
    >
      {children}
    </a>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-slate-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-white/20 bg-white/10 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-white/20 px-4 py-2">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="my-8 border-t border-white/10" />
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-black">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
};

export function BlogPost({ post, relatedPosts }: BlogPostProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-invert prose-lg">
        <MDXRemote
          source={post.content || ''}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
            },
          }}
          components={components}
        />
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
            Bài viết liên quan
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}