import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
          Go Home
        </Link>
        <Link href="/search" className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
          Search Data
        </Link>
      </div>
    </div>
  )
}
