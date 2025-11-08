import { NextResponse } from 'next/server';
import { fetchAllNotes } from '@/lib/aggregator';
import developers from '@/data/developers.json';

export async function GET() {
  const notes = await fetchAllNotes(developers);

  return NextResponse.json(notes, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
