# Clerk Authentication Setup Guide

## Overview
This guide covers the complete setup of Clerk authentication for SalaryLens using Next.js App Router.

## Prerequisites
Your environment variables are already configured in `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Step 1: Install Clerk

```bash
pnpm add @clerk/nextjs
```

## Step 2: Wrap Your App with ClerkProvider

Update `app/layout.tsx` to include the ClerkProvider:

```tsx
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
// ... other imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="vi">
        {/* ... rest of your layout */}
      </html>
    </ClerkProvider>
  );
}
```

## Step 3: Add Proxy for Protected Routes

Create `proxy.ts` in the root directory (Next.js 16+ uses proxy instead of middleware):

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/blog(.*)',
  '/api/webhook(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

## Step 4: Create Authentication Pages

### Sign In Page
Create `app/sign-in/[[...sign-in]]/page.tsx`:

```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg"
          }
        }}
      />
    </div>
  )
}
```

### Sign Up Page
Create `app/sign-up/[[...sign-up]]/page.tsx`:

```tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg"
          }
        }}
      />
    </div>
  )
}
```

## Step 5: Add User Button to Header

Update `components/layout/header.tsx` to include authentication:

```tsx
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

export function Header() {
  return (
    <header>
      {/* Your existing header content */}

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>
      </div>
    </header>
  )
}
```

## Step 6: Protect Routes and Access User Data

### Server Components
```tsx
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function ProtectedPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return <div>Not authenticated</div>
  }

  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>
      <p>Email: {user?.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
```

### Client Components
```tsx
'use client'
import { useUser } from '@clerk/nextjs'

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Not signed in</div>

  return (
    <div>
      <h1>Hello {user.firstName}!</h1>
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
```

## Step 7: Customize Appearance (Optional)

You can customize Clerk's appearance to match your brand:

```tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#3b82f6', // Your brand color
          colorBackground: '#ffffff',
          colorText: '#1f2937',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          card: 'shadow-xl',
        },
      }}
    >
      {/* ... */}
    </ClerkProvider>
  )
}
```

## Common Use Cases

### 1. Protect API Routes
```typescript
// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return NextResponse.json({ data: 'Protected data' })
}
```

### 2. Conditional Rendering
```tsx
import { SignedIn, SignedOut } from '@clerk/nextjs'

export function Feature() {
  return (
    <>
      <SignedIn>
        <div>Premium Feature - Available for logged in users</div>
      </SignedIn>

      <SignedOut>
        <div>Please sign in to access this feature</div>
      </SignedOut>
    </>
  )
}
```

### 3. User Metadata
```tsx
const user = await currentUser()

// Public metadata (readable by everyone)
const publicData = user?.publicMetadata

// Private metadata (only user can read)
const privateData = user?.privateMetadata

// Unsafe metadata (only backend can write)
const unsafeData = user?.unsafeMetadata
```

## Environment Variables Reference

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Optional - Customize redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

## Useful Clerk Components

- `<SignInButton>` - Trigger sign in
- `<SignUpButton>` - Trigger sign up
- `<UserButton>` - User profile dropdown
- `<SignIn>` - Full sign in form
- `<SignUp>` - Full sign up form
- `<SignedIn>` - Show content only when signed in
- `<SignedOut>` - Show content only when signed out
- `<UserProfile>` - User profile management

## Hooks

- `useUser()` - Current user data
- `useAuth()` - Authentication state and helpers
- `useSignIn()` - Sign in state and methods
- `useSignUp()` - Sign up state and methods
- `useClerk()` - Access Clerk instance

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Customization Guide](https://clerk.com/docs/customization/overview)
