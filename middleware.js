import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  // checklogedin to allow view order detail
  // if (!isAuthenticated) {
  //   // Respond with JSON indicating an error message
  //   return new NextResponse(
  //     JSON.stringify({ success: false, message: 'authentication failed' }),
  //     { status: 401, headers: { 'content-type': 'application/json' } }
  //   );
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:order*'
};
