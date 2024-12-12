import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(req: NextRequest) {
    const response = NextResponse.next();
    console.log('HIT MIDDLEWARE')
    response.headers.set('Cache-Control', 'no-cache');
    return response;
}
