import matter from 'gray-matter';
import type { Metadata, AggregatedNote, DeveloperSource } from '@/types';

interface NoteFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export async function fetchDeveloperNotes(source: DeveloperSource): Promise<AggregatedNote[]> {
  try {
    // Fetch metadata
    const metadataResponse = await fetch(source.metadataUrl, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!metadataResponse.ok) {
      console.error(`Failed to fetch metadata from ${source.metadataUrl}`);
      return [];
    }

    const metadata: Metadata = await metadataResponse.json();

    // Construct notes list URL
    const notesListUrl = metadata.fileList.url.startsWith('http')
      ? metadata.fileList.url
      : new URL(metadata.fileList.url, source.metadataUrl).href;

    // Fetch notes list (now returns array of URLs)
    const notesResponse = await fetch(notesListUrl, {
      next: { revalidate: 60 }
    });

    if (!notesResponse.ok) {
      console.error(`Failed to fetch notes from ${notesListUrl}`);
      return [];
    }

    const noteUrls: string[] = await notesResponse.json();

    // Fetch all notes in parallel
    const notesPromises = noteUrls.map(async (noteUrl) => {
      try {
        const noteResponse = await fetch(noteUrl, {
          next: { revalidate: 60 }
        });

        if (!noteResponse.ok) {
          console.error(`Failed to fetch note from ${noteUrl}`);
          return null;
        }

        // Parse markdown with frontmatter
        const markdownContent = await noteResponse.text();
        const { data } = matter(markdownContent);
        const frontmatter = data as NoteFrontmatter;

        // Extract slug from URL
        const slug = noteUrl.split('/').pop()?.replace('.md', '') || '';

        return {
          slug,
          title: frontmatter.title,
          date: frontmatter.date,
          description: frontmatter.description,
          tags: frontmatter.tags,
          developer: metadata.profile,
          sourceUrl: source.metadataUrl,
          noteUrl: noteUrl.replace('/api/notes/', '/notes/').replace('.md', ''),
        };
      } catch (error) {
        console.error(`Error fetching note from ${noteUrl}:`, error);
        return null;
      }
    });

    const notes = await Promise.all(notesPromises);

    // Filter out null values (failed fetches)
    return notes.filter((note): note is AggregatedNote => note !== null);
  } catch (error) {
    console.error(`Error fetching notes from ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllNotes(sources: DeveloperSource[]): Promise<AggregatedNote[]> {
  // Fetch all notes in parallel
  const allNotesArrays = await Promise.all(
    sources.map(source => fetchDeveloperNotes(source))
  );

  // Flatten and sort by date (newest first)
  const allNotes = allNotesArrays.flat();

  return allNotes.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getUniqueTags(notes: AggregatedNote[]): string[] {
  const tagSet = new Set<string>();

  notes.forEach(note => {
    note.tags?.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getUniqueDevelopers(notes: AggregatedNote[]): Profile[] {
  const developerMap = new Map<string, Profile>();

  notes.forEach(note => {
    if (note.developer.name) {
      developerMap.set(note.developer.name, note.developer);
    }
  });

  return Array.from(developerMap.values());
}

interface Profile {
  name: string;
  avatar?: string;
}
