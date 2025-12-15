import Link from 'next/link';

interface BreadcrumbProps {
  category: string;
}

export function Breadcrumb({ category }: BreadcrumbProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-gray-400">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
        </li>
        <li>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </li>
        <li>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
        </li>
        <li>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </li>
        <li className="text-white">{category}</li>
      </ol>
    </nav>
  );
}