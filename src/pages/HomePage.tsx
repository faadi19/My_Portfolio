import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Blog } from '../components/Blog'
import { Testimonials } from '../components/Testimonials'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <Blog />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </>
  )
}
