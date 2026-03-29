import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { getPostBySlug, getNextPrev, getReadingTimeMinutes } from '../data/blog'
import { formatDate } from '../utils/date'

function BlogPostNav({ slug }: { slug: string }) {
  const { prev, next } = getNextPrev(slug)
  if (!prev && !next) return null
  return (
    <nav
      className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-theme pt-10"
      aria-label="Post navigation"
    >
      {prev ? (
        <Link
          to={`/blog/${prev.slug}`}
          className="link-muted inline-flex items-center gap-2 rounded-lg"
        >
          <HiArrowLeft className="h-5 w-5" />
          <span className="max-w-[200px] truncate sm:max-w-[280px]">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/blog/${next.slug}`}
          className={`link-muted inline-flex items-center gap-2 rounded-lg ${!prev ? 'ml-auto' : ''}`}
        >
          <span className="max-w-[200px] truncate sm:max-w-[280px]">{next.title}</span>
          <HiArrowRight className="h-5 w-5 shrink-0" />
        </Link>
      ) : null}
    </nav>
  )
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
        <p className="text-theme-muted">Post not found.</p>
        <Link to="/blog" className="link-muted mt-4 inline-flex items-center gap-2 rounded-lg">
          <HiArrowLeft className="h-5 w-5" />
          Back to blog
        </Link>
      </div>
    )
  }

  return (
    <motion.article
      className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/blog" className="link-muted mb-10 inline-flex items-center gap-2 rounded-lg">
        <HiArrowLeft className="h-5 w-5" />
        Back to blog
      </Link>
      <header className="mb-10">
        <h1 className="section-heading section-heading-3d">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <time className="text-sm text-theme-muted" dateTime={post.date}>
            {formatDate(post.date, true)}
          </time>
          <span className="text-theme-muted">·</span>
          <span className="text-sm text-theme-muted">
            {getReadingTimeMinutes(post.content)} min read
          </span>
          {post.tag && (
            <>
              <span className="text-theme-muted">·</span>
              <span className="rounded border border-theme bg-theme-subtle px-2 py-0.5 text-xs text-theme-muted">
                {post.tag}
              </span>
            </>
          )}
        </div>
      </header>
      <div className="blog-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <BlogPostNav slug={post.slug} />
    </motion.article>
  )
}
