import { NextResponse } from 'next/server';

export function middleware() {
    // Fjerner cache header for alle routes
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Cache', 'no-store');

    return response;
}
