import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { auth } from '@clerk/nextjs/server';
import { mergeGuestCartToUser } from '@/lib/cart';
import { getRuntimeConfig } from '@/lib/config';

type PageProps = {
  searchParams?: {
    redirect_url?: string;
  };
};

export default async function Page(props: PageProps) {
  const searchParams = props.searchParams || {};
  const { redirect_url } = searchParams;

  const { userId } = await auth();
  const cookieStore = await cookies();
  const guestId = cookieStore.get('guestId')?.value;
  const { baseUrl } = getRuntimeConfig();

  const redirectTo = redirect_url || '/';

  if (!userId) {
    return redirect(redirectTo);
  }

  if (guestId) {
    await mergeGuestCartToUser(guestId, userId);

    await fetch(`${baseUrl}/api/auth/clear-guest-cookie`, {
      method: 'POST',
      cache: 'no-store',
    });
  }

  return redirect(redirectTo);
}
