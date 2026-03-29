import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function NotFoundPage() {
  return (
    <motion.div
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold text-theme-heading sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-theme-muted">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to="/"
        className="btn-primary focus-ring mt-8 inline-flex min-h-[48px] items-center"
      >
        Back to home
      </Link>
    </motion.div>
  )
}
