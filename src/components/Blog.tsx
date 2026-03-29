import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiDocumentText } from 'react-icons/hi'
import { getSectionNumber } from '../config/sections'
import { formatDate } from '../utils/date'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { blogPosts } from '../data/blog'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function Blog() {
  const posts = blogPosts.slice(0, 3)
  return (
    <Section id="blog">
      <SectionHeader title="Blog" number={getSectionNumber('blog')} subtitle="Notes on QA, testing, and quality assurance." />
      <motion.ul
        className="mt-12 space-y-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {posts.map((post) => (
          <motion.li key={post.id} variants={item}>
            <Link
              to={`/blog/${post.slug}`}
              className="card-glow group flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4 focus-ring"
            >
              <HiDocumentText className="h-5 w-5 shrink-0 text-accent sm:mt-0.5" />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-theme-heading transition group-hover:text-accent-light text-base">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-theme-muted">{post.excerpt}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <time className="text-xs text-theme-muted" dateTime={post.date}>
                    {formatDate(post.date)}
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
      </motion.ul>
      <p className="mt-6">
        <Link
          to="/blog"
          className="focus-ring inline-flex min-h-[44px] items-center rounded-lg px-1 text-accent hover:underline"
        >
          View all posts →
        </Link>
      </p>
    </Section>
  )
}
