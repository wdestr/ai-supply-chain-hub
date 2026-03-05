import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Verify the request comes from an authenticated admin user.
 * Returns the user if authenticated, or a 401 response.
 */
export async function requireAdmin(request: NextRequest): Promise<{ user: any } | NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 503 });
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll() {},
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  return { user };
}

/**
 * Simple in-memory rate limiter.
 * Limits requests per IP per window (default: 10 requests per 60 seconds).
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  request: NextRequest,
  { maxRequests = 10, windowMs = 60_000 }: { maxRequests?: number; windowMs?: number } = {}
): NextResponse | null {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (entry && now < entry.resetAt) {
    entry.count++;
    if (entry.count > maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } }
      );
    }
  } else {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
  }

  // Cleanup old entries every 100 calls
  if (rateLimitStore.size > 10_000) {
    for (const [k, v] of rateLimitStore) {
      if (now > v.resetAt) rateLimitStore.delete(k);
    }
  }

  return null; // Not rate limited
}

/**
 * Validate that required string fields exist and are within length limits.
 */
export function validateFields(
  body: Record<string, any>,
  rules: { field: string; required?: boolean; maxLength?: number; type?: 'string' | 'array' | 'url' }[]
): string | null {
  for (const rule of rules) {
    const value = body[rule.field];

    if (rule.required && (value === undefined || value === null || value === '')) {
      return `${rule.field} is required`;
    }

    if (value !== undefined && value !== null) {
      if (rule.type === 'string' && typeof value !== 'string') {
        return `${rule.field} must be a string`;
      }

      if (rule.type === 'array' && !Array.isArray(value)) {
        return `${rule.field} must be an array`;
      }

      if (rule.type === 'url' && typeof value === 'string' && value.length > 0) {
        try {
          new URL(value);
        } catch {
          return `${rule.field} must be a valid URL`;
        }
      }

      if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        return `${rule.field} must be at most ${rule.maxLength} characters`;
      }
    }
  }

  return null; // Valid
}

/** Generic safe error response — never leaks internal details */
export function safeError(status: number = 500) {
  return NextResponse.json({ error: 'An error occurred' }, { status });
}
