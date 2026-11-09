import { useState, useEffect } from 'react'
import { ThemeToggle } from './ui.jsx'

const nav = [['Solutions and tools', '#ways', 'ways'], ['How it works', '#how', 'how']]

export default function Header() {
  const [p, setP] = useState(0)
  const [hide, setHide] = useState(false)
  const [act, setAct] = useState('')
  useEffect(() => {
    let last = 0, busy = false
    const on = () => {
      if (busy) return
      busy = true
      requestAnimationFrame(() => {
        const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight
        setP(h > 0 ? (y / h) * 100 : 0)
        setHide(y > last && y > 160)
        last = y
        busy = false
      })
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAct(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    ;['ways', 'how', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className={`sticky top-0 z-20 border-b border-rule bg-white/95 backdrop-blur transition-[transform,box-shadow] duration-300 focus-within:translate-y-0 ${hide ? '-translate-y-full' : ''} ${p > 0.5 ? 'shadow-[0_10px_30px_-20px_rgb(var(--ink)/0.5)]' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" aria-label="Endloops home" className="transition-transform duration-300 hover:scale-105">
          <span className="logo-plate block leading-none"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Endloops" width="439" height="127" className="h-8 w-auto" /></span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-3 md:gap-7">
          {nav.map(([l, h, id]) => (
            <a key={id} href={h} className={`ulink hidden text-sm font-medium md:block ${act === id ? 'active text-tick' : 'hover:text-tick'}`}>{l}</a>
          ))}
          <ThemeToggle />
          <a href="#contact" aria-label="Request a demo" className="btn-tilt whitespace-nowrap bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-tick dark:bg-tick dark:text-[#04130d] dark:hover:bg-[#6ee7b7]">
            <span className="sm:hidden">Demo</span><span className="hidden sm:inline">Request a demo</span>
          </a>
        </nav>
      </div>
      <div className="flex gap-6 border-t border-rule px-5 py-2 text-sm font-medium md:hidden"><a href="#ways">Solutions and tools</a><a href="#how">How it works</a></div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] bg-tick" style={{ width: `${p}%` }} />
    </header>
  )
}
