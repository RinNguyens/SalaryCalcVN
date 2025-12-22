import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tạo tài khoản mới
          </h1>
          <p className="text-gray-600">
            Đăng ký để bắt đầu sử dụng SalaryLens
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignInUrl="/"
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
}
