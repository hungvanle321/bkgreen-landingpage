import { getMessages, getLocale } from 'next-intl/server'
import { LoginForm } from './components/login-form'
import Image from 'next/image'

export default async function LoginPage() {
  const messages = await getMessages()
  const _locale = await getLocale()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue/10 to-primary-green/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-transparent-square.svg"
              alt="BK Green Logo"
              width={64}
              height={64}
              className="w-16 h-16"
              priority
            />
          </div>
          <h2 className="text-3xl font-extrabold text-primary-blue">
            {messages.admin?.login?.title || 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {messages.admin?.login?.subtitle || 'Enter your credentials to access the admin panel'}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}