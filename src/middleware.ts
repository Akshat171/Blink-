// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//     async function middleware(req) {
//         const pathname = req.nextUrl.pathname

//         //Manage route protection

//         //we can use this to decrypt our json web token and see the value that are in there
//         const isAuth = await getToken({ req })
//         const isLoginPage = pathname.startsWith('/login')

//         //nobody should access this dashboard if they are not logged in
//         const sensitiveRoutes = ['/dashboard']
//         const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathname.startsWith(route))
        
//         //if login route is there in the path
//         if (isLoginPage) {
//             if (isAuth) {
//                 return NextResponse.redirect(new URL('/dashboard',req.url))
//             }
//         }

//         //else
//         //they can go to that page
//         return NextResponse.next()

//         if (!isAuth && isAccessingSensitiveRoute) {
//             return NextResponse.redirect(new URL('/login', req.url))

//         }
//         if (pathname === '/') {
//             return NextResponse.redirect(new URL('/dashboard', req.url))

//         }
//     }, {
//         // this is a work around for handling redirects on off pages we return true
//         // so that the middleware function above is always called if we did not have that callback
//         // we would get an infinite redirect and just an error in the browser
//         // telling us that this page is redirecting too aftern thats why including this call back right here
//         callbacks: {
//             async authorized() {
//                 return true
//             }
//         }
//     }
// )


// export const config = {
//     matcher:['/','/login','/dashboard/:path']
// }

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