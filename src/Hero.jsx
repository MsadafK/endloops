import { useState } from 'react'
import { rows, btn, link } from './data.js'
import { Tick, Burst, useTilt } from './ui.jsx'

function WorkingPaper() {
  const tilt = useTilt(5)
  const [rev, setRev] = useState({})
  const [ini, setIni] = useState('')
  const [signed, setSigned] = useState(false)
  const open = rows.filter((r) => r[3]).length - Object.values(rev).filter(Boolean).length
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  return (
    <div {...tilt} className="tilt relative border border-rule bg-card shadow-[6px_6px_0_0_rgb(var(--rule))] dark:shadow-[0_0_0_1px_rgb(var(--rule)),0_30px_80px_-30px_rgb(var(--tick)/0.45)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-4 sm:px-5">
        <p className="font-display text-xl font-semibold">Bank reconciliation, October 2026</p>
        <p className="font-mono text-xs text-ink/70">Prepared by Endloops in 41 seconds</p>
      </div>
      <div aria-hidden="true" className="hidden grid-cols-[1.5fr_1fr_1fr_6rem] gap-x-4 border-t border-rule bg-paper px-5 py-2 text-xs font-medium text-ink/70 sm:grid">
        <span>Description</span><span className="text-right">Ledger</span><span className="text-right">Statement</span><span className="text-right">Status</span>
      </div>
      <ul>
        {rows.map(([n, a, b, why], i) => (
          <li key={n} className="grid grid-cols-2 items-center gap-x-4 gap-y-2 border-t border-rule px-4 py-3.5 text-sm transition-colors hover:bg-paper sm:grid-cols-[1.5fr_1fr_1fr_6rem] sm:px-5">
            <div className="col-span-2 min-w-0 sm:col-span-1">
              <p className="font-medium">{n}</p>
              {why && <p className="mt-0.5 text-xs leading-snug text-violet">{why}</p>}
            </div>
            <div><p className="text-xs text-ink/60 sm:sr-only">Ledger</p><p className="font-mono sm:text-right">{a}</p></div>
            <div>
              <p className="text-xs text-ink/60 sm:sr-only">Statement</p>
              <p className="font-mono sm:text-right">{why ? <span className="rounded-full border border-violet px-2 py-0.5 text-violet">{b}</span> : b}</p>
            </div>
            <div className="col-span-2 flex sm:col-span-1 sm:justify-end">
              {!why ? <Tick d={0.5 + i * 0.35} /> : rev[n] ? <span className="flex items-center gap-1 text-xs font-medium text-royal"><Tick c="royal" /> Reviewed</span> : (
                <button onClick={() => setRev({ ...rev, [n]: true })} className="pulse-ring border border-violet px-3 py-1.5 text-xs font-medium text-violet transition hover:-translate-y-0.5 hover:bg-violet hover:text-white active:scale-95">Review</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {signed && <Burst />}
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-rule px-4 py-4 sm:px-5">
        {signed ? (
          <p role="status" className="fade font-display text-xl italic text-royal">Reviewed by {ini.toUpperCase()}, {today}</p>
        ) : (
          <>
            <label className="text-xs text-ink/70">Reviewer initials
              <input value={ini} maxLength={3} onChange={(e) => setIni(e.target.value)} disabled={open > 0}
                className="ml-2 w-16 border-b-2 border-ink bg-transparent text-center font-mono text-base uppercase transition-colors disabled:border-rule" />
            </label>
            <button disabled={open > 0 || ini.trim().length < 2} onClick={() => setSigned(true)}
              className="btn-tilt bg-ink px-4 py-2 text-sm font-medium text-white enabled:hover:bg-tick disabled:bg-rule disabled:text-ink/60 dark:enabled:bg-tick dark:enabled:text-[#04130d] dark:enabled:hover:bg-[#6ee7b7]">
              {open > 0 ? `${open} to review before sign-off` : 'Sign off'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  const move = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect()
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width).toFixed(3))
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height).toFixed(3))
  }
  const line = 'block overflow-hidden pb-[.14em] -mb-[.14em]'
  return (
    <section id="top" onMouseMove={move} className="hero-grid relative isolate mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pt-20">
      <div aria-hidden="true" style={{ '--k': '-60px' }} className="blob pointer-events-none absolute -left-20 top-4 -z-10 h-72 w-72 rounded-[58%_42%_61%_39%/48%_55%_45%_52%] bg-tick/10 dark:bg-tick/25 dark:blur-3xl" />
      <div aria-hidden="true" style={{ '--k': '70px', animationDelay: '-6s' }} className="blob pointer-events-none absolute -right-16 bottom-0 -z-10 h-80 w-96 rounded-[42%_58%_39%_61%/55%_45%_52%_48%] bg-royal/10 dark:bg-royal/30 dark:blur-3xl" />
      <div aria-hidden="true" style={{ '--k': '-90px', animationDelay: '-3s' }} className="blob pointer-events-none absolute bottom-6 left-1/3 -z-10 h-32 w-32 rounded-full bg-violet/10 dark:bg-violet/30 dark:blur-3xl" />
      <div className="min-w-0 self-center">
        <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[3.5rem] xl:text-[3.9rem] dark:bg-gradient-to-br dark:from-[#ffffff] dark:to-[#8fe8c8] dark:bg-clip-text dark:text-transparent">
          <span className={line}><span className="lineup block">Numbers prepared.</span></span>
          <span className={line}><span className="lineup block" style={{ animationDelay: '.12s' }}>Judgement yours.</span></span>
        </h1>
        <p className="enter mt-6 max-w-md text-lg leading-relaxed text-ink/80" style={{ animationDelay: '.45s' }}>Endloops builds automation for accountants, auditors, finance teams and property management companies. The software does the repetitive work. You review, decide and sign.</p>
        <div className="enter mt-8 flex flex-wrap items-center gap-6" style={{ animationDelay: '.6s' }}>
          <a href="#contact" className={btn}>Request a demo</a>
          <a href="#ways" className={link}>Solutions and tools <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span></a>
        </div>
        <p className="enter mt-10 max-w-sm text-sm text-ink/70" style={{ animationDelay: '.75s' }}>Built by the technology team at Alkazim, an accounting and audit firm in Dubai.</p>
      </div>
      <div className="enter-r min-w-0" style={{ animationDelay: '.3s' }}>
        <WorkingPaper />
        <p className="mt-5 text-sm text-ink/70">Try it: review the two exceptions, then sign. Sample data. Endloops never signs for you.</p>
      </div>
    </section>
  )
}
