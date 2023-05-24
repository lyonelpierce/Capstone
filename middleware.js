// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("__Secure-next-auth.session-token")?.value;
  console.log(request.cookies);
  if (cookie) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/profile", "/create-tattoo"],
};
