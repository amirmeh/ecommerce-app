import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function getOrCreateGuestProfile(req: NextRequest) {
  const cookieStore = await cookies();
  const guestId = cookieStore.get('guestId')?.value;

  if (guestId) {
    const existingGuest = await prisma.guest.findUnique({
      where: { id: guestId },
    });
    if (existingGuest) {
      return existingGuest;
    }
  }

  const newGuestId = crypto.randomUUID();
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const ipAddress =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'unknown';

  const newGuest = await prisma.guest.create({
    data: {
      id: newGuestId,
      userAgent,
      ipAddress,
    },
  });

  cookieStore.set('guestId', newGuestId, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 Days
  });

  return newGuest;
}
