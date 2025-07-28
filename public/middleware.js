import { auth } from "../auth.config";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await auth(req);

  // Optional: redirect unauthenticated users
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
// Match routes (everything except static/assets/api)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
