import { NextResponse } from "next/server";

// TODO: authorization
export default async function middleware() {
  return NextResponse.next();
}
