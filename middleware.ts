import { NextResponse, NextRequest, userAgent } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, res: NextResponse) {
  // checklogedin to allow view order detail
  // if (!isAuthenticated) {
  //   // Respond with JSON indicating an error message
  //   return new NextResponse(
  //     JSON.stringify({ success: false, message: 'authentication failed' }),
  //     { status: 401, headers: { 'content-type': 'application/json' } }
  //   );
  // }

  const { device } = userAgent(req);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  req.nextUrl.searchParams.set('viewport', viewport);
  console.log({ middleware: true, viewport, urllll: req.nextUrl });
  NextResponse.rewrite(req.nextUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/payment']
};
