import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured, allow all requests (dev mode without DB)
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_')) {
    // Still protect admin routes even without Supabase
    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh the session
  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin routes (except login page)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
