import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile", "/create-tattoo"] };

export async function middleware(request) {
  return NextResponse.redirect(new URL("/", request.url));
}
