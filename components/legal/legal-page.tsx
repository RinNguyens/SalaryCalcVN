'use client';

import { useState } from 'react';
import { ChevronRight, Calendar, FileText, ArrowUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { motion } from 'framer-motion';

interface LegalContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

// Simple markdown-like content renderer
function ContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentList: string[] = [];
  let currentTable: string[][] = [];
  let inTable = false;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 ">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-black">{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (currentTable.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
          <table className="min-w-full divide-y divide-blue-100 border border-blue-100 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-50 to-emerald-50">
              <tr>
                {currentTable[0].map((cell, idx) => (
                  <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white/50">
              {currentTable.slice(2).map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-blue-50/50 transition">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-3 text-sm text-black border-t border-blue-50">
                      <code className="text-xs bg-blue-100/70 text-blue-900 px-2 py-1 rounded font-medium">{cell.trim()}</code>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = [];
      inTable = false;
    }
  };

  lines.forEach((line, idx) => {
    // Check for table
    if (line.includes('|')) {
      if (!inTable) {
        flushList();
        inTable = true;
      }
      currentTable.push(line.split('|').filter(cell => cell.trim()));
      return;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-xl text-black bg-clip-text text-transparent mb-4">
          {line.replace('### ', '')}
        </h3>
      );
    }
    // List items
    else if (line.trim().startsWith('•')) {
      currentList.push(line.trim().substring(1).trim());
    }
    // Bold text
    else if (line.includes('**')) {
      flushList();
      const parts = line.split('**');
      elements.push(
        <p key={idx} className="text-slate-200 leading-relaxed my-2">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i} className="text-slate-900 font-semibold">{part}</strong> : part
          )}
        </p>
      );
    }
    // Links
    else if (line.includes('[') && line.includes('](')) {
      flushList();
      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, text, url] = linkMatch;
        elements.push(
          <p key={idx} className="text-slate-200 leading-relaxed my-2">
            Xem thêm:{' '}
            <a href={url} className="text-indigo-600 hover:text-indigo-700 underline font-medium hover:underline-offset-4 transition">
              {text}
            </a>
          </p>
        );
      }
    }
    // Regular paragraphs
    else if (line.trim()) {
      flushList();
      elements.push(
        <p key={idx} className="text-slate-200 leading-relaxed my-2">
          {line}
        </p>
      );
    }
  });

  flushList();
  flushTable();

  return <>{elements}</>;
}

export function LegalPage({ content }: { content: LegalContent }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/30 to-emerald-500/30 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm mb-4">
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-indigo-600">Legal Document</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-black bg-clip-text text-transparent mb-4">
          {content.title}
        </h1>

        <p className="text-lg text-slate-200 mb-6 font-medium">
          {content.subtitle}
        </p>

        <div className="inline-flex items-center gap-2 text-sm text-slate-200">
          <Calendar className="w-4 h-4 text-slate-200" />
          <span className="font-medium">Cập nhật lần cuối: {content.lastUpdated}</span>
        </div>
      </div>

      {/* Table of Contents (Mobile Dropdown) */}
      <div className="lg:hidden mb-8">
        <GlassCard variant="subtle" className="p-4">
          <button
            onClick={() => setActiveSection(activeSection ? null : 'toc')}
            className="flex items-center justify-between w-full"
          >
            <span className="font-semibold text-slate-900">Mục lục</span>
            <ChevronRight
              className={`w-5 h-5 text-blue-600 transition-transform ${
                activeSection === 'toc' ? 'rotate-90' : ''
              }`}
            />
          </button>

          {activeSection === 'toc' && (
            <nav className="mt-4 space-y-2">
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block py-2 px-3 text-sm text-black hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 rounded-lg transition font-medium"
                  onClick={() => setActiveSection(null)}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          )}
        </GlassCard>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar TOC (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <GlassCard variant="subtle" className="sticky top-24 p-6">
            <h2 className="font-bold text-slate-900 mb-4 text-lg">Mục lục</h2>
            <nav className="space-y-2">
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block py-2 px-3 text-sm text-black hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 rounded-lg transition font-medium"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </GlassCard>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9">
          <GlassCard variant="subtle" className="overflow-hidden">
            <article className="prose prose-blue max-w-none p-6 md:p-10">
              {content.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={index > 0 ? 'mt-12' : ''}
                >
                  <h2 className="text-2xl text-black bg-clip-text text-transparent mb-4">
                    {section.title}
                  </h2>
                  <ContentRenderer content={section.content} />
                </section>
              ))}
            </article>

            {/* Contact CTA */}
            <div className="border-t border-blue-100 p-6 md:p-10 bg-gradient-to-br from-blue-500/15 to-emerald-500/15">
              <div className="text-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-emerald-900 bg-clip-text text-transparent mb-2">
                  Có câu hỏi?
                </h3>
                <p className="text-slate-700 mb-4 font-medium">
                  Liên hệ với chúng tôi nếu bạn cần hỗ trợ hoặc làm rõ
                </p>
                <a
                  href="mailto:support@salarylens.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-black/95 rounded-lg hover:from-blue-700 hover:to-blue-800 hover:text-black transition shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Gửi email cho chúng tôi</span>
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Back to top */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition font-medium group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <ArrowUp className="w-5 h-5 group-hover:text-indigo-700 transition" />
              </motion.div>
              <span>Về đầu trang</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
