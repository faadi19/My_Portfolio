import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi'
import { site } from '../config/site'

const FORMSPREE_SETUP = (
  <>
    <strong>Form is hidden until you connect Formspree.</strong>
    <br />
    <span className="mt-2 block text-theme-muted">
      1. Go to <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-accent underline">formspree.io</a> and create a free form.
      <br />
      2. Copy your form endpoint (e.g. <code className="rounded bg-theme-subtle px-1">https://formspree.io/f/xxxxx</code>).
      <br />
      3. In your project root, create a <code className="rounded bg-theme-subtle px-1">.env</code> file and add:
      <br />
      <code className="mt-1 block rounded bg-theme-subtle p-2 text-xs">VITE_FORMSPREE_URL=https://formspree.io/f/yourid</code>
      <br />
      4. Restart the dev server. Submissions will be sent to the email you used to sign up at Formspree.
    </span>
  </>
)

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const hasFormspree = Boolean(site.formspreeUrl)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!site.formspreeUrl) return
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(site.formspreeUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      className="mt-6 w-full max-w-xl space-y-4 sm:mt-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {!hasFormspree && (
        <div
          className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200"
          role="alert"
        >
          {FORMSPREE_SETUP}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-theme-muted">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required={hasFormspree}
            disabled={!hasFormspree}
            className="input-theme w-full min-h-[44px] rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-theme-muted">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required={hasFormspree}
            disabled={!hasFormspree}
            className="input-theme w-full min-h-[44px] rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-theme-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required={hasFormspree}
            disabled={!hasFormspree}
            rows={4}
            className="input-theme w-full min-h-[120px] resize-y rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            placeholder="Your message..."
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="submit"
            disabled={!hasFormspree || status === 'sending'}
            className="btn-primary focus-ring min-h-[44px] disabled:opacity-60"
            whileHover={hasFormspree ? { scale: 1.02 } : {}}
            whileTap={hasFormspree ? { scale: 0.98 } : {}}
          >
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : hasFormspree ? 'Send message' : 'Set up Formspree to enable'}
          </motion.button>
          {status === 'sent' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="flex items-center gap-2 text-sm text-emerald-400"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
              >
                <HiCheckCircle className="h-5 w-5" />
              </motion.span>
              Received! I&apos;ll get back to you by email soon.
            </motion.span>
          )}
          {status === 'error' && (
            <span className="text-sm text-red-400">Something went wrong. Try emailing directly.</span>
          )}
        </div>
      </form>
      {hasFormspree && (
        <p className="text-xs text-theme-muted">
          Submissions are sent to your email via Formspree (the address you used when creating the form).
        </p>
      )}
    </motion.div>
  )
}
