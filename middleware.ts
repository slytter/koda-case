import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    // Log the requested path to see if it's matching correctly
    console.log(`Request Path: ${req.nextUrl.pathname}`);

    // Apply middleware to the /members path
    if (req.nextUrl.pathname.startsWith('/members')) {
    }
    const response = NextResponse.next();
    console.log('Cache-Control header set for /members');
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Cache', 'no-store');

    return response;
      
    // For other paths, just proceed
    return NextResponse.next();
}
