import NextAuth from "next-auth";
// import type { Session } from 'next-auth';
import { authConfig } from "@/auth.config";
// import { NextRequest } from 'next/server';

export default NextAuth(authConfig).auth;

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
