import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('civilro_session');
  const { pathname } = request.nextUrl;

  // 1. Si está logueado e intenta ir a la Home o al Login -> Al Dashboard
  if (session && (pathname === '/' || pathname === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Si NO está logueado e intenta ir al Dashboard -> Al Login (o Home)
  if (!session && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Rutas que el middleware va a vigilar
  matcher: ['/', '/dashboard/:path*', '/login'],
};