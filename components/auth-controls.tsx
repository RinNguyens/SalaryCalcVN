"use client";

import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface AuthControlsProps {
  mobile?: boolean;
}

export function AuthControls({ mobile = false }: AuthControlsProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Check if it's a real Clerk key
  const isRealKey = publishableKey &&
    (publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_')) &&
    !publishableKey.includes('fake') &&
    !publishableKey.includes('placeholder') &&
    !publishableKey.includes('d2lzcG9uc2VzLWRlbW8');

  if (!isRealKey) {
    // Return null or placeholder when Clerk is not configured
    return null;
  }

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            className={mobile
              ? "w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium"
              : "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            }
          >
            <User className="h-4 w-4 mr-2" />
            Đăng nhập
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className={mobile ? "w-full" : ""}>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: mobile
                  ? "w-10 h-10 mx-auto rounded-full border-2 border-purple-400/30 hover:border-purple-400/50 transition-all"
                  : "w-10 h-10 rounded-full border-2 border-purple-400/30 hover:border-purple-400/50 transition-all",
                userButtonPopoverCard: "bg-white/95 backdrop-blur-sm border border-white/20",
                userButtonPopoverActionButton: "text-gray-700 hover:bg-gray-100",
                rootBox: mobile ? "w-full" : undefined,
              },
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}