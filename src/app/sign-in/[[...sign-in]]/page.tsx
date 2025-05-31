import { SignIn } from '@clerk/nextjs';

export default function SignInPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const from = searchParams.redirect_url ?? '/';
  const target = `/after-signin?redirect_url=${encodeURIComponent(from)}`;

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <SignIn forceRedirectUrl={target} fallbackRedirectUrl="/" />
    </div>
  );
}
