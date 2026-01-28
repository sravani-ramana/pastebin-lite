import { kv } from '@vercel/kv';

export interface Paste {
  id: string;
  content: string;
  createdAt: number;
  ttlSeconds?: number;
  maxViews?: number;
  viewCount: number;
}

function getCurrentTime(): number {
  if (process.env.TEST_MODE === '1') {
    // In test mode, we'll get the time from request headers
    // This will be set by the API route handlers
    return Date.now();
  }
  return Date.now();
}

export async function createPaste(
  content: string,
  ttlSeconds?: number,
  maxViews?: number
): Promise<Paste> {
  const id = generateId();
  const paste: Paste = {
    id,
    content,
    createdAt: Date.now(),
    ttlSeconds,
    maxViews,
    viewCount: 0,
  };

  await kv.set(`paste:${id}`, JSON.stringify(paste));

  return paste;
}

export async function getPaste(id: string, incrementView = false, testNowMs?: number): Promise<Paste | null> {
  const data = await kv.get<string>(`paste:${id}`);
  
  if (!data) {
    return null;
  }

  const paste: Paste = JSON.parse(data);
  const currentTime = testNowMs || Date.now();

  // Check if expired by time
  if (paste.ttlSeconds) {
    const expiresAt = paste.createdAt + paste.ttlSeconds * 1000;
    if (currentTime >= expiresAt) {
      return null;
    }
  }

  // Check if expired by views
  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return null;
  }

  // Increment view count if requested
  if (incrementView) {
    paste.viewCount += 1;
    await kv.set(`paste:${id}`, JSON.stringify(paste));
  }

  return paste;
}

export function calculateExpiresAt(paste: Paste): string | null {
  if (!paste.ttlSeconds) {
    return null;
  }
  const expiresAt = new Date(paste.createdAt + paste.ttlSeconds * 1000);
  return expiresAt.toISOString();
}

export function calculateRemainingViews(paste: Paste): number | null {
  if (!paste.maxViews) {
    return null;
  }
  return Math.max(0, paste.maxViews - paste.viewCount);
}

function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
