import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for admin session cookie
    const adminToken = request.cookies.get('admin-session')?.value

    if (!adminToken || adminToken === '') {
      // Redirect to login if no session
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Allow access if token exists
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/products/:path*',
    '/admin/orders/:path*',
    '/admin/inquiries/:path*'
  ]
}
