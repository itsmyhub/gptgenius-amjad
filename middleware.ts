import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// public routes in our case '/'
//const isPublicRoute = createRouteMatcher(['/']);
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};