import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Don't use middleware for auth - we'll handle it in the layout component
export function middleware(request: NextRequest) {
  // Just pass through all requests
  return NextResponse.next();
}

// Only run middleware on API routes if needed
export const config = {
  matcher: ['/api/:path*'],
}; 