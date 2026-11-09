import Header from './Header.jsx'
import Hero from './Hero.jsx'
import { Marquee, Audience, Capabilities, Ways, Principle, How } from './Sections.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <Hero /><Marquee /><Audience /><Capabilities /><Ways /><Principle /><How /><Contact />
      </main>
      <Footer />
    </>
  )
}
