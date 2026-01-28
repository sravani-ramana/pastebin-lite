import { NextRequest, NextResponse } from 'next/server';
import { getPaste, calculateExpiresAt, calculateRemainingViews } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Check for test mode time header
  let testNowMs: number | undefined;
  if (process.env.TEST_MODE === '1') {
    const testNowHeader = request.headers.get('x-test-now-ms');
    if (testNowHeader) {
      testNowMs = parseInt(testNowHeader, 10);
    }
  }

  const paste = await getPaste(id, true, testNowMs);

  if (!paste) {
    return NextResponse.json(
      { error: 'Paste not found or expired' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    content: paste.content,
    remaining_views: calculateRemainingViews(paste),
    expires_at: calculateExpiresAt(paste)
  }, { status: 200 });
}
