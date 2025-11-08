import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNoteBySlug, getAllSlugs } from '@/lib/notes';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function NotePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="terminal p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-green-700 hover:text-green-400 transition-colors text-sm mb-4 inline-block"
        >
          {'<'} BACK_TO_INDEX
        </Link>
      </div>

      <article>
        <header className="mb-8 border-b border-green-800 pb-6">
          <h1 className="text-3xl font-bold glow mb-3">
            {'>'} {note.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-green-700">
            <time>
              [{new Date(note.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}]
            </time>
          </div>

          {note.description && (
            <p className="text-green-400 mt-4">{note.description}</p>
          )}

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-green-800 px-2 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mt-8 pt-6 border-t border-green-800">
        <Link
          href="/"
          className="text-green-700 hover:text-green-400 transition-colors text-sm"
        >
          {'<'} BACK_TO_INDEX
        </Link>
      </div>
    </div>
  );
}
