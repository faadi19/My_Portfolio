import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiExternalLink, HiDownload } from 'react-icons/hi'
import { SiLinkedin, SiGithub } from 'react-icons/si'
import { profile } from '../data/portfolio'
import { getSectionNumber } from '../config/sections'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ContactForm } from './ContactForm'
import { GlobeScene } from './GlobeScene'

const links = [
  { href: `mailto:${profile.email}`, label: profile.email, Icon: HiMail },
  { href: `tel:${profile.phone.replace(/\s/g, '')}`, label: profile.phone, Icon: HiPhone },
  { href: profile.linkedin, label: 'LinkedIn', Icon: SiLinkedin, external: true },
  ...(profile.github ? [{ href: profile.github, label: 'GitHub', Icon: SiGithub, external: true }] : []),
]

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeader title="Let's work together" number={getSectionNumber('contact')} />
      <p className="mt-6 max-w-xl text-theme-muted">
        Open to QA and SQA roles. I focus on test automation, manual testing, and defect-free releases—reach out for full-time or contract opportunities.
      </p>

      <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-12">
        {/* Left: rotating globe */}
        <motion.div
          className="order-2 flex items-center justify-center lg:order-1"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlobeScene className="h-[240px] w-full sm:h-[280px] lg:h-[320px]" />
        </motion.div>
        {/* Right: form + quick links */}
        <motion.div
          className="order-1 space-y-6 lg:order-2"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-theme-muted">
            Use the form below—when you submit, I receive it by email and will get back to you.
          </p>
          <ContactForm />
          <div className="flex flex-wrap gap-3">
            {links.map(({ href, label, Icon, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex min-h-[48px] min-w-0 items-center gap-2 rounded-xl border border-theme bg-theme-subtle px-4 py-3 text-sm text-theme-heading transition-colors hover:border-accent/30 hover:text-accent focus-ring"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0 truncate font-mono" title={label}>{label}</span>
                {external && <HiExternalLink className="h-3.5 w-3.5 opacity-60" />}
              </motion.a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href={`mailto:${profile.email}`} className="btn-primary focus-ring inline-flex min-h-[44px] items-center">
              Email me directly
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeDownloadName}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-theme bg-theme-subtle px-5 py-2.5 text-sm font-medium text-theme-heading transition-colors hover:border-accent/30 hover:text-accent focus-ring"
            >
              <HiDownload className="h-4 w-4" />
              Download resume (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
