import type { Metadata } from 'next';
import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Masuk',
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo/logo-icon-warungindomichigan.png"
            alt="Warung Indo Michigan"
            width={48}
            height={48}
            className="rounded-xl"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
