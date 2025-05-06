import { auth } from "../auth.config";
import { NextResponse } from "next/server";

export default auth(function middleware(req){
  if (req.auth) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/sign-in';
  return NextResponse.redirect(url)
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)'],
}