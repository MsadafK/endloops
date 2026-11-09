import { useState, useEffect } from 'react'
import desk from './art/desk.svg?raw'
import { btn, caps, aud, full, tools } from './data.js'
import { Reveal, Tick, useInView } from './ui.jsx'

const names = [...full, ...tools].map(([n]) => n)

export function Marquee() {
  return (
    <section aria-label="Products" className="group overflow-hidden border-y border-rule bg-paper py-4">
      <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center pr-10">
            {names.map((n) => <li key={n} className="flex items-center whitespace-nowrap font-display text-xl"><span aria-hidden="true" className="mx-5 text-tick">✓</span>{n}</li>)}
          </ul>
        ))}
      </div>
    </section>
  )
}

export function Audience() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Reveal><h2 className="max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">Made for the people who sign off.</h2></Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {aud.map(([t, d, p], i) => (
          <Reveal key={t} delay={i * 100}>
            <div className="group h-full border border-rule bg-card p-5 transition duration-300 hover:-translate-y-1.5 hover:border-tick hover:shadow-[0_18px_40px_-24px_rgb(var(--tick)/0.7)]">
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-tick transition duration-300 group-hover:-rotate-6 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p} /></svg>
              <h3 className="mt-4 font-display text-2xl font-medium">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Capabilities() {
  return (
    <section className="border-y border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Reveal><h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">The tedious part of the job, done before you sit down.</h2></Reveal>
          <Reveal delay={150}><div role="img" aria-label="Illustration: an accountant at a desk reviewing a checked working paper" className="mt-8 max-w-md" dangerouslySetInnerHTML={{ __html: desk }} /></Reveal>
        </div>
        <ul className="divide-y divide-rule border-y border-rule">
          {caps.map((c, i) => (
            <Reveal as="li" key={c} delay={i * 90} className="flex gap-4 py-5 text-lg leading-snug"><span className="mt-0.5"><Tick d={0.15 + i * 0.1} /></span>{c}</Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function List({ items }) {
  return (
    <ul className="mt-6 border-t-2 border-ink">
      {items.map(([n, d], i) => (
        <Reveal as="li" key={n} delay={i * 70} className="border-b border-rule">
          <div className="group -mx-2 flex flex-wrap items-baseline justify-between gap-x-4 px-2 py-3.5 transition-colors hover:bg-paper">
            <span className="font-display text-xl font-medium transition-transform duration-300 group-hover:translate-x-1.5">{n}</span>
            <span className="text-sm text-ink/70">{d}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}

export function Ways() {
  return (
    <section id="ways" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal><h2 className="max-w-3xl font-display text-4xl font-medium leading-tight sm:text-5xl">Hand over a whole process, or just one task.</h2></Reveal>
      <Reveal delay={100}><p className="mt-4 max-w-2xl text-lg text-ink/80">Some of this is in daily use. The rest is in development, and the list keeps growing.</p></Reveal>
      <div className="mt-12 grid gap-14 lg:grid-cols-2">
        <div>
          <Reveal><h3 className="text-sm font-semibold text-royal">End-to-end solutions</h3>
            <p className="mt-2 text-lg">Complete software that runs an entire process from start to finish. Your team reviews at each sign-off.</p></Reveal>
          <List items={full} />
        </div>
        <div>
          <Reveal delay={120}><h3 className="text-sm font-semibold text-teal">Standalone tools</h3>
            <p className="mt-2 text-lg">One focused tool for one specific need. Use it on its own, next to the way you already work.</p></Reveal>
          <List items={tools} />
        </div>
      </div>
    </section>
  )
}

export function Principle() {
  const [ref, seen] = useInView(0.6)
  return (
    <section className="band-glow border-y border-rule bg-band text-[#ffffff]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.5fr_1fr]">
        <Reveal><p className="font-display text-4xl font-medium leading-[1.1] sm:text-6xl">Every number we prepare ends with a name beside it. Yours.</p></Reveal>
        <div className="justify-self-center lg:justify-self-end">
          <div ref={ref} className="border-4 border-double border-tick px-8 py-6 text-center text-tick"
            style={{ transform: 'rotate(-6deg)', opacity: seen ? 1 : 0, animation: seen ? 'stamp .55s cubic-bezier(.2,1.5,.4,1) both' : 'none' }}>
            <p className="font-display text-4xl font-semibold">Reviewed</p>
            <p className="mt-1 font-mono text-xs">Prepared by Endloops. Signed by you.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Batch() {
  const [n, setN] = useState(0)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!on) return
    const t = setInterval(() => setN((v) => { if (v >= 218) { clearInterval(t); setOn(false); return 218 } return Math.min(218, v + 7) }), 40)
    return () => clearInterval(t)
  }, [on])
  const done = n === 218
  const stat = (k, v, c = '') => <div><dt className="text-sm text-ink/70">{k}</dt><dd className={`font-mono text-3xl ${c} ${done ? 'pop' : ''}`}>{v}</dd></div>
  return (
    <Reveal className="mt-16 border-t-2 border-ink pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl font-medium">Now do 218 of them.</h3>
          <p className="mt-1 text-ink/70">Bulk work is where checking by hand falls apart.</p>
        </div>
        <button className={btn} disabled={on} onClick={() => { setN(0); setOn(true) }}>{on ? 'Reading documents' : done ? 'Run it again' : 'Run the batch'}</button>
      </div>
      <div className="mt-6 h-2 overflow-hidden bg-rule"><div className={`h-2 bg-tick transition-all dark:shadow-[0_0_14px_rgb(var(--tick)/0.9)] ${on ? 'shimmer' : ''}`} style={{ width: `${(n / 218) * 100}%` }} /></div>
      <dl className="mt-6 grid grid-cols-3 gap-4">{stat('Read', n)}{stat('Matched', Math.floor((n * 215) / 218))}{stat('For your review', done ? 3 : 0, 'text-violet')}</dl>
      <p role="status" className="mt-4 min-h-6 text-ink/80">{done ? 'Three items are listed first in your schedule: two totals that differ and one possible duplicate.' : ''}</p>
    </Reveal>
  )
}

export function How() {
  const [read, setRead] = useState(false)
  const [scan, setScan] = useState(false)
  const go = () => {
    if (read) { setRead(false); return }
    setScan(true)
    setTimeout(() => { setScan(false); setRead(true) }, 1400)
  }
  const hl = (t) => <span className={`transition-colors duration-500 ${read ? 'bg-royal/15 px-1' : ''}`}>{t}</span>
  const out = [['Supplier', 'Palm Electrical'], ['Date', '14 Oct 2026'], ['Lines', '6'], ['Total', 'AED 9,850.00']]
  return (
    <section id="how" className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal><h2 className="max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">What happens to a purchase order.</h2></Reveal>
        <Reveal delay={100}><p className="mt-4 max-w-xl text-lg text-ink/80">Purchase-order extraction reads each document, checks it against your ledger and flags what does not agree.</p></Reveal>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative -rotate-[0.8deg] overflow-hidden border border-rule bg-card p-6 shadow-[6px_6px_0_0_rgb(var(--rule))] transition-transform duration-500 hover:rotate-0 dark:shadow-[0_0_0_1px_rgb(var(--rule)),0_24px_60px_-28px_rgb(var(--royal)/0.5)]">
              {scan && <span aria-hidden="true" className="scanline" />}
              <p className="font-mono text-xs text-ink/70">PURCHASE ORDER PO-7783</p>
              <dl className="mt-4 space-y-2 text-[15px]">
                <div className="flex justify-between"><dt>Supplier</dt><dd>{hl('Palm Electrical')}</dd></div>
                <div className="flex justify-between"><dt>Date</dt><dd>{hl('14 Oct 2026')}</dd></div>
                <div className="flex justify-between"><dt>Items</dt><dd>{hl('6 lines')}</dd></div>
                <div className="flex justify-between border-t border-rule pt-2 font-semibold"><dt>Total</dt><dd>{hl('AED 9,850.00')}</dd></div>
              </dl>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div aria-live="polite">
              <button onClick={go} disabled={scan} className={btn}>{scan ? 'Reading' : read ? 'Reset' : 'Read this document'}</button>
              {read ? (
                <div className="mt-6">
                  <ul className="divide-y divide-rule border-y border-rule">
                    {out.map(([k, v], i) => (
                      <li key={k} style={{ animationDelay: `${i * 0.12}s` }} className="fade flex justify-between py-2.5"><span className="text-ink/70">{k}</span><span className="font-mono text-sm">{v}</span></li>
                    ))}
                  </ul>
                  <p style={{ animationDelay: '.6s' }} className="fade mt-4 text-violet">Ledger shows AED 8,950.00. The total is 900.00 higher. Flagged for you to review.</p>
                </div>
              ) : <p className="mt-6 text-ink/70">{scan ? 'Scanning the document…' : 'Press the button to see what Endloops extracts and flags.'}</p>}
            </div>
          </Reveal>
        </div>
        <Batch />
      </div>
    </section>
  )
}
