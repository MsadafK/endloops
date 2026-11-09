import { useState, useEffect } from 'react'
import skyline from './art/skyline.svg'
import skylineNight from './art/skyline-night.svg'
import { Reveal } from './ui.jsx'

function DubaiClock() {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const i = setInterval(() => setT(fmt()), 20000)
    return () => clearInterval(i)
  }, [])
  return (
    <p className="inline-flex items-center gap-2 border border-[#ffffff]/30 px-3 py-1.5 font-mono text-sm">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" aria-hidden="true" />Dubai now {t.slice(0, 2)}<span className="blink">:</span>{t.slice(3)} GST
    </p>
  )
}

export default function Footer() {
  const img = 'mt-10 h-56 w-full object-cover object-center sm:h-auto'
  return (
    <footer className="bg-sea text-[#ffffff] dark:bg-gradient-to-b dark:from-[#0b1d3d] dark:via-sea dark:to-sea">
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-10 px-5 pt-16">
        <div>
          <span className="logo-always block w-fit leading-none"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Endloops" width="439" height="127" className="h-8 w-auto" /></span>
          <p className="mt-6 max-w-lg font-display text-3xl leading-snug sm:text-4xl">Built in Dubai, for finance teams across the GCC.</p>
          <p className="mt-3 max-w-md text-[#ffffff]/80">Endloops is the technology company from Alkazim, an accounting and audit firm based in Dubai.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4"><DubaiClock /><span lang="ar" dir="rtl" className="font-display text-2xl">دبي</span></div>
        </div>
        <div className="flex flex-col gap-3 text-[15px]">
          <a href="#contact" className="btn-tilt btn-shine bg-[#ffffff] px-6 py-3 text-center font-medium text-sea hover:bg-[#d9f3e8]">Request a demo</a>
          <a href="#ways" className="ulink w-fit underline underline-offset-4">Solutions and tools</a>
          <a href="#how" className="ulink w-fit underline underline-offset-4">How it works</a>
        </div>
      </Reveal>
      <img src={skyline} alt="" aria-hidden="true" loading="lazy" className={`${img} dark:hidden`} />
      <img src={skylineNight} alt="" aria-hidden="true" loading="lazy" className={`${img} hidden dark:block`} />
    </footer>
  )
}
