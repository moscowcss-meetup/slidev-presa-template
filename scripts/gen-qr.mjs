#!/usr/bin/env node
// Генератор QR-кодов в дизайне MoscowCSS: белые кружки-модули, кольцевые «глазки»,
// логотип-башенка по центру, тёмный фон. Выдаёт SVG.
//
// Использование:
//   node scripts/gen-qr.mjs <url> [имя] [--out путь.svg] [--bg #121212|none]
//                            [--fg #ffffff] [--no-logo] [--logo N] [--cell N]
// Примеры:
//   pnpm qr https://css.moscow site          → public/qr/site.svg
//   pnpm qr https://t.me/moscowcss chat --bg none

import QRCode from 'qrcode'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve, isAbsolute } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Токены дизайна — совпадают со style.css
const DEFAULTS = {
  fg: '#ffffff',   // модули и глазки
  bg: '#121212',   // фон (как --mcss-bg); 'none' → прозрачный
  cell: 10,        // px на модуль в SVG-координатах
  quiet: 4,        // тихая зона в модулях (требование стандарта, иначе не сканируется)
  dot: 0.48,       // радиус кружка-модуля в долях клетки (как в оригинале — полные, но раздельные)
  logoFrac: 0.24,  // доля стороны QR под очищенную зону логотипа
}

function parseArgs(argv) {
  const opts = { ...DEFAULTS, logo: true }
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--no-logo') opts.logo = false
    else if (a === '--out') opts.out = argv[++i]
    else if (a === '--bg') opts.bg = argv[++i]
    else if (a === '--fg') opts.fg = argv[++i]
    else if (a === '--logo') opts.logoFrac = Number(argv[++i])
    else if (a === '--cell') opts.cell = Number(argv[++i])
    else if (a.startsWith('--')) throw new Error(`неизвестный флаг: ${a}`)
    else positional.push(a)
  }
  opts.url = positional[0]
  opts.name = positional[1]
  return opts
}

// svg-нейтрализация имени файла, чтобы не улететь из public/qr/
function safeName(name, url) {
  const base = (name || url || 'qr').replace(/^https?:\/\//, '').replace(/[^\w.-]+/g, '-')
  return base.replace(/^-+|-+$/g, '').slice(0, 64) || 'qr'
}

// Вкладываем logo.svg как <svg> с его собственным viewBox — масштаб по центру зоны
function loadLogo() {
  const p = resolve(ROOT, 'public/logo.svg')
  if (!existsSync(p)) return null
  const raw = readFileSync(p, 'utf8')
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1]
  const inner = raw.replace(/<\?xml[^>]*\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  if (!viewBox) return null
  return { viewBox, inner }
}

export function generateSvg(url, options = {}) {
  const o = { ...DEFAULTS, logo: true, ...options }
  if (!url || typeof url !== 'string') throw new Error('нужен URL/текст первым аргументом')

  // ECC 'H' (30% восстановления) — чтобы логотип по центру не ломал сканирование
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const N = qr.modules.size
  const data = qr.modules.data
  const isDark = (r, c) => r >= 0 && c >= 0 && r < N && c < N && data[r * N + c]

  const { cell, quiet } = o
  const off = quiet * cell
  const totalPx = (N + quiet * 2) * cell

  // Три позиции глазков-финдеров (левый-верх, правый-верх, левый-низ) — рисуем их отдельно
  const finders = [[0, 0], [0, N - 7], [N - 7, 0]]
  const inFinder = (r, c) => finders.some(([fr, fc]) => r >= fr && r < fr + 7 && c >= fc && c < fc + 7)

  const logo = o.logo ? loadLogo() : null
  const cc = (N - 1) / 2
  const clearHalf = logo ? Math.round((N * o.logoFrac) / 2) : -1
  const inLogoZone = (r, c) => logo && Math.abs(r - cc) <= clearHalf && Math.abs(c - cc) <= clearHalf

  const parts = []
  if (o.bg && o.bg !== 'none') parts.push(`<rect width="${totalPx}" height="${totalPx}" fill="${o.bg}"/>`)

  // Модули-кружки (кроме зон финдеров и логотипа)
  const rr = (o.dot * cell).toFixed(2)
  const dots = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!isDark(r, c) || inFinder(r, c) || inLogoZone(r, c)) continue
      const cx = off + c * cell + cell / 2
      const cy = off + r * cell + cell / 2
      dots.push(`<circle cx="${cx}" cy="${cy}" r="${rr}"/>`)
    }
  }
  parts.push(`<g fill="${o.fg}">${dots.join('')}</g>`)

  // Глазки: толстое кольцо (внешний r 3.5 клетки, толщина 1) + сплошная точка (r 1.5)
  for (const [fr, fc] of finders) {
    const ex = off + (fc + 3.5) * cell
    const ey = off + (fr + 3.5) * cell
    parts.push(
      `<circle cx="${ex}" cy="${ey}" r="${(3.0 * cell).toFixed(2)}" fill="none" stroke="${o.fg}" stroke-width="${cell}"/>` +
      `<circle cx="${ex}" cy="${ey}" r="${(1.5 * cell).toFixed(2)}" fill="${o.fg}"/>`
    )
  }

  // Логотип по центру очищенной зоны
  if (logo) {
    const boxPx = (2 * clearHalf + 1) * cell * 1.18 // чуть крупнее зоны — как в оригинале
    const x = (totalPx - boxPx) / 2
    parts.push(
      `<svg x="${x.toFixed(2)}" y="${x.toFixed(2)}" width="${boxPx.toFixed(2)}" height="${boxPx.toFixed(2)}" ` +
      `viewBox="${logo.viewBox}" preserveAspectRatio="xMidYMid meet">${logo.inner}</svg>`
    )
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalPx} ${totalPx}" width="${totalPx}" height="${totalPx}">${parts.join('')}</svg>\n`
}

function main() {
  let opts
  try {
    opts = parseArgs(process.argv.slice(2))
  } catch (e) {
    console.error('Ошибка аргументов:', e.message)
    process.exit(2)
  }
  if (!opts.url) {
    console.error('Использование: node scripts/gen-qr.mjs <url> [имя] [--out f.svg] [--bg #121212|none] [--no-logo]')
    process.exit(2)
  }

  let svg
  try {
    svg = generateSvg(opts.url, opts)
  } catch (e) {
    console.error('Не удалось сгенерировать QR:', e.message)
    process.exit(1)
  }

  const out = opts.out
    ? (isAbsolute(opts.out) ? opts.out : resolve(ROOT, opts.out))
    : resolve(ROOT, 'public/qr', `${safeName(opts.name, opts.url)}.svg`)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, svg)
  console.log(`✓ QR → ${out}`)
  console.log(`  ссылка: ${opts.url}`)
}

// Запуск только как CLI (не при импорте из теста)
// pathToFileURL — иначе на Windows (file:///C:/… против C:\…) условие никогда не срабатывает
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main()
