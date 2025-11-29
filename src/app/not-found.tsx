import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">404</h1>
      <h2 className="text-3xl font-semibold mb-4 text-zinc-100">Page Not Found</h2>
      <p className="text-zinc-400 mb-8 text-lg">
        The page you&apos;re looking for doesn&apos;t exist in our wiki.
      </p>
      <Link href="/">
        <Button size="lg">
          Return Home
        </Button>
      </Link>
    </div>
  )
}
