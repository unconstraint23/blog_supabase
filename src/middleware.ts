
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login']

export async function middleware(request: NextRequest) {
    // console.log('Middleware triggered for:', request)
  const { pathname } = request.nextUrl
  const token = request.cookies.get('sb-mjfzvdyjljmxssbnqzcs-auth-token')?.value

  const isPublic = PUBLIC_PATHS.some(path => pathname.startsWith(path))

  if (!token && !isPublic) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()

}

export const config = {
  matcher: ['/((?!_next|favicon.ico|static|images).*)']
}
