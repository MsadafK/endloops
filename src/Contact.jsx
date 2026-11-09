import { useState } from 'react'
import { btn } from './data.js'
import { Reveal, Tick } from './ui.jsx'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-e`} className="fade mt-1 text-sm font-medium text-violet">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', interest: '', msg: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [shake, setShake] = useState(false)
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) x.email = 'Enter a valid work email, like name@company.com.'
    if (!v.interest) x.interest = 'Choose one option.'
    if (v.msg.trim().length < 10) x.msg = 'Describe the task in at least 10 characters.'
    setErr(x)
    if (Object.keys(x).length) { setShake(true); setTimeout(() => setShake(false), 500); return }
    setBusy(true)
    setTimeout(() => { setBusy(false); setSent(true) }, 900) // demo only: connect a backend or form service here
  }
  const inp = (k) => `field mt-1 w-full border-0 border-b-2 bg-transparent px-0 py-2 text-base focus:ring-0 ${err[k] ? 'border-violet' : 'border-ink'}`
  const a = (k) => ({ 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `${k}-e` : undefined })
  return (
    <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
      <Reveal>
        <h2 className="font-display text-4xl font-medium leading-tight sm:text-6xl">Bring us the task that eats your week.</h2>
        <p className="mt-5 max-w-md text-lg text-ink/80">Tell us what you do by hand today. We will show you how Endloops handles it, using documents like yours.</p>
      </Reveal>
      {sent ? (
        <div role="status" className="fade self-start border-2 border-ink p-8">
          <Tick d={0.1} size="h-14 w-14" />
          <p className="mt-3 font-display text-3xl font-medium">Request sent.</p>
          <p className="mt-2 text-ink/80">Thanks, {v.name.split(' ')[0]}. We will write to {v.email} to set up your demo.</p>
        </div>
      ) : (
        <Reveal delay={120}>
          <form onSubmit={submit} noValidate className={`space-y-6 ${shake ? 'shake' : ''}`}>
            <Field id="name" label="Full name" error={err.name}><input id="name" autoComplete="name" className={inp('name')} value={v.name} onChange={set('name')} {...a('name')} /></Field>
            <Field id="email" label="Work email" error={err.email}><input id="email" type="email" autoComplete="email" className={inp('email')} value={v.email} onChange={set('email')} {...a('email')} /></Field>
            <Field id="interest" label="I am looking for" error={err.interest}>
              <select id="interest" className={inp('interest')} value={v.interest} onChange={set('interest')} {...a('interest')}>
                <option value="">Select one</option><option>A whole process, end to end</option><option>One standalone tool</option><option>Not sure yet</option>
              </select>
            </Field>
            <Field id="msg" label="What do you do by hand today?" error={err.msg}><textarea id="msg" rows="3" className={inp('msg')} value={v.msg} onChange={set('msg')} {...a('msg')} /></Field>
            <button disabled={busy} className={btn}>{busy ? 'Sending' : 'Request a demo'}</button>
          </form>
        </Reveal>
      )}
    </section>
  )
}
