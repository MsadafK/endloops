import { useState, useEffect, useRef } from 'react'

export function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

export function useTilt(max = 5) {
  const ref = useRef(null)
  const onMouseMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg)`
  }
  const onMouseLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return { ref, onMouseMove, onMouseLeave }
}

export function Reveal({ as: T = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView(0.15)
  return <T ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${seen ? 'in' : ''} ${className}`} {...rest}>{children}</T>
}

export function Tick({ c = 'tick', d = 0, size = 'h-5 w-5' }) {
  const [ref, seen] = useInView(0.6)
  return (
    <svg ref={ref} viewBox="0 0 20 20" className={`${size} shrink-0`} aria-hidden="true">
      <path className="tick" d="M3 11l4.5 5L17 4" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength="1"
        style={{ stroke: `rgb(var(--${c}))`, strokeDasharray: 1, strokeDashoffset: 1, animation: seen ? `draw .45s ease-out ${d}s forwards` : 'none' }} />
    </svg>
  )
}

export function Burst() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const r = 130 + (i % 3) * 40
        return <span key={i} className="burst" style={{ '--dx': `${Math.cos(a) * r}px`, '--dy': `${Math.sin(a) * r}px`, animationDelay: `${(i % 4) * 40}ms`, color: i % 2 ? 'rgb(var(--tick))' : 'rgb(var(--royal))' }}>✓</span>
      })}
    </div>
  )
}

export function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
  const flip = () => {
    const d = !dark
    setDark(d)
    const el = document.documentElement
    el.classList.add('theme-anim')
    el.classList.toggle('dark', d)
    setTimeout(() => el.classList.remove('theme-anim'), 450)
    try { localStorage.setItem('theme', d ? 'dark' : 'light') } catch (e) { /* storage unavailable */ }
  }
  return (
    <button onClick={flip} aria-pressed={dark} aria-label="Dark mode" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="btn-tilt grid h-9 w-9 shrink-0 place-items-center border border-rule hover:border-ink">
      <svg key={String(dark)} viewBox="0 0 24 24" className="spin-in h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />}
      </svg>
    </button>
  )
}
