import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import { blogPosts } from '../data/blog'
import { formatDate } from '../utils/date'

export function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-24">
      <Link
        to="/"
        className="link-muted mb-10 inline-flex items-center gap-2 rounded-lg"
      >
        <HiArrowLeft className="h-5 w-5" />
        Back to home
      </Link>
      <h1 className="section-heading section-heading-3d">Blog</h1>
      <p className="mt-4 text-theme-muted">
        Notes on backend development, APIs, and building systems.
      </p>
      <ul className="mt-12 space-y-6">
        {blogPosts.map((post) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="card-glow group flex gap-4 rounded-2xl p-6 transition"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-theme-heading transition group-hover:text-accent-light">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-theme-muted">{post.excerpt}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <time className="text-xs text-theme-muted" dateTime={post.date}>
                    {formatDate(post.date, true)}
                  </time>
                  {post.tag && (
                    <span className="rounded bg-theme-subtle border border-theme px-2 py-0.5 text-xs text-theme-muted">
                      {post.tag}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
