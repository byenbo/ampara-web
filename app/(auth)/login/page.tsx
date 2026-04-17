import Link from 'next/link'
import { LoginForm } from '@/components/forms/LoginForm'

export const metadata = { title: 'Entrar — Ampara' }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="px-5 py-4 border-b border-neutral-200 bg-white">
        <Link href="/" className="font-display font-bold text-xl text-primary-700">
          Ampar<span className="text-primary-500">a</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-md p-8 md:p-10 w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
