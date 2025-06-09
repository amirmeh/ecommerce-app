import { SignIn } from '@clerk/nextjs';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const { redirect_url } = await searchParams;
  const from = redirect_url ?? '/';
  const target = `/after-signin?redirect_url=${encodeURIComponent(from)}`;

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <SignIn forceRedirectUrl={target} fallbackRedirectUrl="/" />
    </div>
  );
}
