import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function BlogFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<BlogFallback />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="blog"
          element={
            <Suspense fallback={<BlogFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="blog/:slug"
          element={
            <Suspense fallback={<BlogFallback />}>
              <BlogPostPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<BlogFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
