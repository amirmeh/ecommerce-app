import { currentUser } from '@clerk/nextjs/server';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import AdminMenu from './AdminMenu';
import { Button } from '../ui';
import { LogIn, SquareUserRound } from 'lucide-react';

async function Auth() {
  const user = await currentUser();
  // console.log(user);
  const isAdmin = user?.privateMetadata?.isAdmin;

  return (
    <div>
      <SignedIn>
        {isAdmin ? (
          <div className="flex items-center">
            <AdminMenu />
          </div>
        ) : (
          <div className="flex items-center">
            <UserButton />
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="inline-flex items-center justify-center gap-2">
          <Button variant="outline" className="cursor-pointer" asChild>
            <SignInButton mode="modal">
              <span>
                <LogIn />
                Sign in
              </span>
            </SignInButton>
          </Button>
          <Button variant="outline" className="cursor-pointer" asChild>
            <SignUpButton mode="modal">
              <span>
                <SquareUserRound />
                Sign up
              </span>
            </SignUpButton>
          </Button>
        </div>
      </SignedOut>
    </div>
  );
}

export default Auth;
