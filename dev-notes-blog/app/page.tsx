import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';

export default function Home() {
  const notes = getAllNotes();

  return (
    <div className="terminal p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold glow mb-2">{'>'} NOTES_INDEX</h2>
        <p className="text-green-700">Total entries: {notes.length}</p>
      </div>

      {notes.length === 0 ? (
        <div className="text-green-700 text-center py-12">
          <p>{'>'} NO NOTES FOUND</p>
          <p className="mt-2 text-sm">Create your first note in /notes/*.md</p>
        </div>
      ) : (
        <div className="space-y-6">
          {notes.map((note) => (
            <article key={note.slug} className="border-l-4 border-green-700 pl-4 py-2 hover:border-green-500 transition-colors">
              <Link href={`/notes/${note.slug}`}>
                <div className="group">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-xl font-bold group-hover:glow transition-all">
                      {'>'} {note.title}
                    </h3>
                    <time className="text-sm text-green-700">
                      [{new Date(note.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}]
                    </time>
                  </div>

                  {note.description && (
                    <p className="text-green-400 mb-2">{note.description}</p>
                  )}

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
