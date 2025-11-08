import { NextResponse } from 'next/server';
import { getAllSlugs } from '@/lib/notes';

export async function GET(request: Request) {
  const slugs = getAllSlugs();

  // Get the base URL from the request
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Return array of URLs to individual notes (with .md extension)
  const noteUrls = slugs.map(slug => `${baseUrl}/api/notes/${slug}.md`);

  return NextResponse.json(noteUrls, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
