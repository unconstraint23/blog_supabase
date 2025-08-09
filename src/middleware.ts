
import { NextRequest, NextResponse } from 'next/server'

const CHECK_PATHS = ['/edit',"/categories","/articleDetail"]



export async function middleware(request: NextRequest) {
    // console.log('Middleware triggered for:', request)
  const { pathname } = request.nextUrl
  const token = request.cookies.get('sb-mjfzvdyjljmxssbnqzcs-auth-token')?.value

  const isCheck = CHECK_PATHS.some(path => pathname.startsWith(path))

  if (!token && isCheck) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()

}

export const config = {
  matcher: ['/((?!_next|favicon.ico|static|images).*)']
}
