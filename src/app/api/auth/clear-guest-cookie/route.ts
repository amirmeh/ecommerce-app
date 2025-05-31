import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Clearing guest cookie
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('guestId', '', { path: '/', maxAge: 0 });
  return NextResponse.json({ success: true });
}
