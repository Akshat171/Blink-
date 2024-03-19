

import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname

    // Manage route protection
    const isAuth = await getToken({ req })
    const isLoginPage = pathname.startsWith('/login')

    const sensitiveRoutes = ['/dashboard']
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      return NextResponse.next()
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
    {
       // this is a work around for handling redirects on off pages we return true
        // so that the middleware function above is always called if we did not have that callback
        // we would get an infinite redirect and just an error in the browser 
        // telling us that this page is redirecting too aftern thats why including this call back right here
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matchter: ['/', '/login', '/dashboard/:path*'],
}