export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: Object.fromEntries(['ink', 'white', 'paper', 'rule', 'tick', 'teal', 'royal', 'violet', 'band', 'sea', 'card'].map((k) => [k, `rgb(var(--${k}) / <alpha-value>)`])),
    fontFamily: { display: ['Newsreader', 'Georgia', 'serif'], sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'], mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'] }
  } }
}
