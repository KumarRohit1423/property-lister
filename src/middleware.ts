import NextAuth from "next-auth";
// import type { Session } from 'next-auth';
import { authConfig } from "@/auth.config";
// import { NextRequest } from 'next/server';

export default NextAuth(authConfig).auth;

/** alternative you can do authorize logic in the middleware.ts file */
// type NextAuthRequest = NextRequest & { auth: Session | null };

// const auth = NextAuth(authConfig).auth;

// export default auth((request: NextAuthRequest) => {
//   const { auth, nextUrl } = request;

//   const isLoggedIn = !!auth?.user;
//   const isOnProfile = nextUrl.pathname.startsWith('/profile');
//   const isOnAuth = nextUrl.pathname.startsWith('/auth');

//   if (isOnProfile) {
//     if (isLoggedIn) return;
//     return Response.redirect(new URL('/auth', nextUrl));
//   }

//   if (isOnAuth) {
//     if (!isLoggedIn) return;
//     return Response.redirect(new URL('/profile', nextUrl));
//   }

//   return;
// });

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import NextAuth from 'next-auth'; //  { type Session }
// import { authConfig } from '@/auth.config';
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   // apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from '@/route';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   // if (isApiAuthRoute) {
//   // 	return null;
//   // }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     // return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);
//     return Response.redirect(
//       new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
//     );
//   }
//   // return null;
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
