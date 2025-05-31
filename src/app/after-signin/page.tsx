import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { auth } from '@clerk/nextjs/server';
import { mergeGuestCartToUser } from '@/lib/cart';

export default async function page({
  searchParams,
}: {
  searchParams: { redirect_url?: string };
}) {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const guestId = cookieStore.get('guestId')?.value;

  const redirectTo = searchParams.redirect_url || '/';

  if (!userId) {
    return redirect(redirectTo);
  }

  if (guestId) {
    await mergeGuestCartToUser(guestId, userId);

    await fetch('http://localhost:3000/api/auth/clear-guest-cookie', {
      method: 'POST',
      cache: 'no-store',
    });
  }

  return redirect(redirectTo);
}
