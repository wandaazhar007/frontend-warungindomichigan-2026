'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle } from 'lucide-react';
import { resetPassword } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().min(1, 'Wajib diisi').email('Format email tidak valid'),
});
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setServerError('');
    try {
      await resetPassword(data.email);
      setSuccess(data.email);
    } catch {
      setServerError('Terjadi kesalahan. Periksa email kamu dan coba lagi.');
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h2 className="font-display text-xl font-700 text-gray-900 mb-2">Email Terkirim!</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Link reset password telah dikirim ke{' '}
          <strong className="text-gray-700">{success}</strong>. Cek inbox atau folder spam kamu.
        </p>
        <Button variant="outline" asChild>
          <Link href="/login">Kembali ke halaman masuk</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display text-2xl font-700 text-gray-900 mb-1">Lupa Password?</h1>
        <p className="text-sm text-gray-500">
          Masukkan emailmu dan kami akan kirimkan link untuk reset password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <Input type="email" placeholder="kamu@email.com" {...register('email')} />
          {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Kirim Link Reset
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/login" className="text-red-500 hover:underline">
          Kembali ke halaman masuk
        </Link>
      </p>
    </div>
  );
}
