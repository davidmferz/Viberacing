import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Remove .md extension if present
  const cleanSlug = slug.replace(/\.md$/, '');

  try {
    const notesDirectory = path.join(process.cwd(), 'notes');
    const fullPath = path.join(notesDirectory, `${cleanSlug}.md`);

    // Read the raw markdown file
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    return new NextResponse(fileContents, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new NextResponse('Note not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
