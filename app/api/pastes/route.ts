import { NextRequest, NextResponse } from 'next/server';
import { createPaste } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate content
    if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate ttl_seconds if present
    if (body.ttl_seconds !== undefined) {
      if (typeof body.ttl_seconds !== 'number' || !Number.isInteger(body.ttl_seconds) || body.ttl_seconds < 1) {
        return NextResponse.json(
          { error: 'ttl_seconds must be an integer >= 1' },
          { status: 400 }
        );
      }
    }

    // Validate max_views if present
    if (body.max_views !== undefined) {
      if (typeof body.max_views !== 'number' || !Number.isInteger(body.max_views) || body.max_views < 1) {
        return NextResponse.json(
          { error: 'max_views must be an integer >= 1' },
          { status: 400 }
        );
      }
    }

    const paste = await createPaste(
      body.content,
      body.ttl_seconds,
      body.max_views
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    request.headers.get('host') ? 
                    `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host')}` :
                    'http://localhost:3000';

    return NextResponse.json({
      id: paste.id,
      url: `${baseUrl}/p/${paste.id}`
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
