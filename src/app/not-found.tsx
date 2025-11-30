import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Item Not Found</h2>
      <p className="text-gray-600 mb-8">
        The item you're looking for doesn't exist in our database.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
      >
        Return Home
      </Link>
    </div>
  )
}

