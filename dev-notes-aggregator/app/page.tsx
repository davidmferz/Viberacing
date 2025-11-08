'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { AggregatedNote } from '@/types';

export default function Home() {
  const [notes, setNotes] = useState<AggregatedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching notes:', err);
        setLoading(false);
      });
  }, []);

  // Get unique developers and tags
  const developers = Array.from(
    new Set(notes.map(note => note.developer.name))
  ).sort();

  const tags = Array.from(
    new Set(notes.flatMap(note => note.tags || []))
  ).sort();

  // Filter notes
  const filteredNotes = notes.filter(note => {
    if (selectedDeveloper && note.developer.name !== selectedDeveloper) {
      return false;
    }
    if (selectedTag && !note.tags?.includes(selectedTag)) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        note.title.toLowerCase().includes(search) ||
        note.description?.toLowerCase().includes(search) ||
        note.developer.name.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const getDeveloperColor = (developerName: string): string => {
    const colors = ['#00ff00', '#00ffff', '#ffff00', '#ff00ff'];
    const index = developers.indexOf(developerName) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="terminal p-12 text-center">
        <p className="glow text-xl">{'>'} LOADING NOTES...</p>
        <p className="text-green-700 mt-4 text-sm">Fetching from all sources...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="terminal p-6">
        <h2 className="text-xl font-bold glow mb-4">{'>'} FILTERS</h2>

        {/* Search */}
        <div className="mb-4">
          <label className="block text-sm text-green-700 mb-2">SEARCH:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-black border border-green-700 px-4 py-2 focus:border-green-400 focus:outline-none"
          />
        </div>

        {/* Developer filter */}
        <div className="mb-4">
          <label className="block text-sm text-green-700 mb-2">DEVELOPERS:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDeveloper(null)}
              className={`filter-badge border-green-700 ${
                !selectedDeveloper ? 'active' : ''
              }`}
            >
              ALL ({notes.length})
            </button>
            {developers.map(dev => {
              const count = notes.filter(n => n.developer.name === dev).length;
              return (
                <button
                  key={dev}
                  onClick={() => setSelectedDeveloper(dev === selectedDeveloper ? null : dev)}
                  className={`filter-badge ${
                    selectedDeveloper === dev ? 'active' : 'border-green-700'
                  }`}
                  style={{
                    borderColor: selectedDeveloper === dev ? getDeveloperColor(dev) : undefined
                  }}
                >
                  {dev} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Tag filter */}
        {tags.length > 0 && (
          <div>
            <label className="block text-sm text-green-700 mb-2">TAGS:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`filter-badge border-green-700 ${
                  !selectedTag ? 'active' : ''
                }`}
              >
                ALL
              </button>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`filter-badge border-green-700 ${
                    selectedTag === tag ? 'active' : ''
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes list */}
      <div className="terminal p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold glow">{'>'} TIMELINE</h2>
          <p className="text-green-700 text-sm">
            Showing {filteredNotes.length} of {notes.length} notes
          </p>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-green-700">
            <p>{'>'} NO NOTES FOUND</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNotes.map((note, index) => {
              const color = getDeveloperColor(note.developer.name);
              return (
                <article
                  key={`${note.developer.name}-${note.slug}-${index}`}
                  className="note-card border-green-700"
                  style={{ borderColor: color }}
                >
                  <div className="flex items-start gap-4">
                    {note.developer.avatar && (
                      <Image
                        src={note.developer.avatar}
                        alt={note.developer.name}
                        width={32}
                        height={32}
                        className="developer-avatar mt-1"
                        style={{ borderColor: color }}
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                        <a
                          href={note.noteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold hover:opacity-80 transition-opacity"
                          style={{ color }}
                        >
                          {'>'} {note.title}
                        </a>
                        <span
                          className="text-sm font-bold"
                          style={{ color }}
                        >
                          [{note.developer.name}]
                        </span>
                        <time className="text-sm text-green-700">
                          {new Date(note.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>

                      {note.description && (
                        <p className="text-green-400 mb-2">{note.description}</p>
                      )}

                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className="text-xs border border-green-800 px-2 py-1 hover:border-green-400 transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Add developer section */}
      <div className="terminal p-6 text-sm">
        <h3 className="text-lg font-bold glow mb-3">{'>'} ADD YOUR NOTES</h3>
        <p className="text-green-400 mb-2">
          Want to add your dev notes to this aggregator?
        </p>
        <ol className="list-decimal list-inside space-y-1 text-green-700">
          <li>Create your own dev notes blog</li>
          <li>Implement the API spec (metadata.json, notes.json)</li>
          <li>Add your metadata URL to this aggregator&apos;s developer list</li>
          <li>Your notes will automatically appear here</li>
        </ol>
        <p className="mt-4 text-green-400">
          Check the source code for implementation details.
        </p>
      </div>
    </div>
  );
}
