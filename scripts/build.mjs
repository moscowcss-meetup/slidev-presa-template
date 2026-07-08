#!/usr/bin/env node
// Сборка презентаций митапа в dist/<номер>/<деку>: open и close.
// Номер берётся из аргумента, либо env MEETUP, либо поля "meetup" в package.json.
//
//   pnpm build          → dist/31/open, dist/31/close (номер из package.json)
//   pnpm build 32       → dist/32/open, dist/32/close
//   MEETUP=33 pnpm build → dist/33/...

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
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
  // base '/' — каждый дек самодостаточен и отдаётся из корня своей папки dist/<N>/<deck>
  // (абсолютные пути ассетов /qr/,/img/ так резолвятся корректно; hash-роутинг снимает нужду в SPA-fallback)
  console.log(`\n▶ Сборка ${deck} → dist/${meetup}/${deck}`)
  try {
    execFileSync('node', [slidevBin, 'build', entry, '--base', '/', '--out', out], {
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
console.log(`\n✓ Готово (митап ${meetup}):\n  ${built.join('\n  ')}`)
