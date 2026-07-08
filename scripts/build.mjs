#!/usr/bin/env node
// Сборка презентаций митапа в dist/<номер>/<деку>: open и close.
// Номер берётся из аргумента, либо env MEETUP, либо поля "meetup" в package.json.
//
//   pnpm build          → dist/31/open, dist/31/close (номер из package.json)
//   pnpm build 32       → dist/32/open, dist/32/close
//   MEETUP=33 pnpm build → dist/33/...

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DECKS = ['open', 'close'] // порядок = порядок сборки

const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'))
const meetup = String(process.argv[2] || process.env.MEETUP || pkg.meetup || '').trim()
if (!/^\d+$/.test(meetup)) {
  console.error(`Нужен номер митапа (число). Передайте аргументом (pnpm build 32), через MEETUP=32 или полем "meetup" в package.json. Получено: "${meetup}"`)
  process.exit(2)
}

// Локальный бинарь slidev — обходит pnpm-гейт, который иначе падает на dev-проверке зависимостей
const slidevBin = resolve(ROOT, 'node_modules/@slidev/cli/bin/slidev.mjs')
if (!existsSync(slidevBin)) {
  console.error('Не найден @slidev/cli — выполните pnpm install')
  process.exit(1)
}

const built = []
for (const deck of DECKS) {
  const entry = resolve(ROOT, `${deck}.md`)
  if (!existsSync(entry)) {
    console.warn(`⚠ ${deck}.md не найден — пропускаю`)
    continue
  }
  const out = resolve(ROOT, 'dist', meetup, deck)
  // base './' + base-относительные ассеты (lib/asset.js) + hash-роутинг → дек работает и в
  // корне, и под любым subpath (GitHub Pages: /<repo>/<N>/<deck>/) без правки под конкретный путь
  console.log(`\n▶ Сборка ${deck} → dist/${meetup}/${deck}`)
  try {
    execFileSync('node', [slidevBin, 'build', entry, '--base', './', '--out', out], {
      cwd: ROOT,
      stdio: 'inherit',
    })
    built.push(`dist/${meetup}/${deck}`)
  } catch (e) {
    console.error(`✗ Сборка ${deck} упала (код ${e.status ?? '?'})`)
    process.exit(1)
  }
}

if (built.length === 0) {
  console.error('Нечего собирать: не найдено ни open.md, ни close.md')
  process.exit(1)
}

// Лендинг в корне dist — иначе корень GitHub Pages отдаёт 404.
// Сканируем все собранные <N>/<deck> (в т.ч. от прошлых митапов, если dist накопился).
writeIndex(resolve(ROOT, 'dist'))

console.log(`\n✓ Готово (митап ${meetup}):\n  ${built.join('\n  ')}`)

function writeIndex(distDir) {
  const label = { open: 'Старт', close: 'Финал' }
  const rows = []
  for (const n of readdirSync(distDir).filter((d) => /^\d+$/.test(d)).sort((a, b) => b - a)) {
    const links = ['open', 'close']
      .filter((d) => existsSync(resolve(distDir, n, d, 'index.html')))
      .map((d) => `<a href="./${n}/${d}/">${label[d]}</a>`)
    if (links.length) rows.push(`<li><b>Митап ${n}</b>${links.join('')}</li>`)
  }
  const html = `<!doctype html><html lang="ru"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MoscowCSS — презентации</title>
<style>
  body{margin:0;min-height:100vh;display:flex;flex-direction:column;justify-content:center;
    align-items:center;gap:2rem;background:#121212;color:#fff;font-family:Montserrat,system-ui,sans-serif}
  h1{font-weight:800;font-size:2rem;margin:0 0 1.5rem}
  ul{list-style:none;padding:0;display:grid;gap:.8rem}
  li{display:flex;gap:1rem;align-items:center;font-size:1.1rem}
  li b{min-width:7rem}
  a{color:#ca3035;text-decoration:none;padding:.3rem .8rem;border:1px solid #ca3035;border-radius:.4rem}
  a:hover{background:#ca3035;color:#fff}
</style>
<h1>MoscowCSS — презентации</h1>
<ul>${rows.join('')}</ul>`
  writeFileSync(resolve(distDir, 'index.html'), html)
  console.log('▶ Лендинг → dist/index.html')
}
