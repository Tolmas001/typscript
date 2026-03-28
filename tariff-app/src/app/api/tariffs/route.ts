import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Disable caching to always fetch the latest tariffs, or use revalidate
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch tariffs: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tariffs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
