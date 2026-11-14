#!/usr/bin/env node
// Генератор QR-кодов в дизайне MoscowCSS: кружки-модули, кольцевые «глазки», логотип по
// центру. Две темы: dark (белое на тёмном, как в оригинальных слайдах) и light (тёмное на
// белом). Логотип — башенка MoscowCSS или логотип партнёра (--logo-svg). Выдаёт SVG.
//
// Использование:
//   node scripts/gen-qr.mjs <url> [имя] [--out путь.svg] [--theme dark|light]
//                            [--bg #121212|none] [--fg #ffffff] [--no-logo]
//                            [--logo-svg путь.svg] [--logo N] [--cell N]
// Примеры:
//   pnpm qr https://css.moscow site                         → public/qr/site.svg
//   pnpm qr https://css.moscow site-light --theme light     → светлый вариант
//   pnpm qr https://t.me/school21sber school21 --logo-svg public/logos/school21.svg
//   pnpm qr https://t.me/moscowcss chat --bg none

import QRCode from 'qrcode'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve, isAbsolute } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Темы: цвет модулей (fg) и фона (bg). --fg/--bg переопределяют тему.
export const THEMES = {
  dark: { fg: '#ffffff', bg: '#121212' },  // как оригинальные слайды и .mc-qrcard темы
  light: { fg: '#121212', bg: '#ffffff' },
}

// Цвета в логотипах, которые светлая тема меняет местами: белые штрихи → цвет модулей,
// тёмная подложка башенки → цвет фона. Остальное (красное «CSS») не трогаем.
// (?![0-9a-f]) — чтобы #fff не съел начало цвета вроде #fffe00
const WHITE = /#fff(?:fff)?(?![0-9a-f])|rgb\(100%, 100%, 100%\)|\bwhite\b/gi
const PLATE = /#121212(?![0-9a-f])|rgb\(7\.058716%, 7\.058716%, 7\.058716%\)/gi

const DEFAULTS = {
  theme: 'dark',
  cell: 10,        // px на модуль в SVG-координатах
  quiet: 4,        // тихая зона в модулях (требование стандарта, иначе не сканируется)
  dot: 0.48,       // радиус кружка-модуля в долях клетки (как в оригинале — полные, но раздельные)
  logoFrac: 0.24,  // доля стороны QR под очищенную зону логотипа
}

function parseArgs(argv) {
  const opts = { logo: true }
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--no-logo') opts.logo = false
    else if (a === '--out') opts.out = argv[++i]
    else if (a === '--theme') opts.theme = argv[++i]
    else if (a === '--logo-svg') opts.logoSvg = argv[++i]
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

// Вкладываем логотип как <svg> с его собственным viewBox — масштаб по центру зоны.
// file — свой логотип (партнёр); без него — башенка public/logo.svg.
function loadLogo(file) {
  const p = file ? (isAbsolute(file) ? file : resolve(ROOT, file)) : resolve(ROOT, 'public/logo.svg')
  if (!existsSync(p)) {
    if (file) throw new Error(`нет файла логотипа: ${file}`)
    return null
  }
  const raw = readFileSync(p, 'utf8')
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1]
  if (!viewBox) throw new Error(`у логотипа нет viewBox: ${p}`)
  const inner = raw.replace(/<\?xml[^>]*\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  return { viewBox, inner }
}

// Перекраска логотипа под тему: currentColor всегда = цвет модулей; в light белое и
// тёмная подложка меняются местами (через маркер, чтобы замены не наложились).
function themeLogo(inner, theme, fg, bg) {
  let out = inner.replace(/currentColor/g, fg)
  if (theme === 'light') {
    out = out.replace(PLATE, '__QR_BG__').replace(WHITE, fg).replace(/__QR_BG__/g, bg === 'none' ? 'none' : bg)
  }
  return out
}

export function generateSvg(url, options = {}) {
  const o = { ...DEFAULTS, logo: true, ...options }
  if (!url || typeof url !== 'string') throw new Error('нужен URL/текст первым аргументом')
  const palette = THEMES[o.theme]
  if (!palette) throw new Error(`неизвестная тема: ${o.theme} (есть: ${Object.keys(THEMES).join(', ')})`)
  // undefined в options не должен затирать цвета темы
  const fg = o.fg ?? palette.fg
  const bg = o.bg ?? palette.bg

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

  const logo = o.logo ? loadLogo(o.logoSvg) : null
  const cc = (N - 1) / 2
  const clearHalf = logo ? Math.round((N * o.logoFrac) / 2) : -1
  const inLogoZone = (r, c) => logo && Math.abs(r - cc) <= clearHalf && Math.abs(c - cc) <= clearHalf

  const parts = []
  if (bg && bg !== 'none') parts.push(`<rect width="${totalPx}" height="${totalPx}" fill="${bg}"/>`)

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
  parts.push(`<g fill="${fg}">${dots.join('')}</g>`)

  // Глазки: толстое кольцо (внешний r 3.5 клетки, толщина 1) + сплошная точка (r 1.5)
  for (const [fr, fc] of finders) {
    const ex = off + (fc + 3.5) * cell
    const ey = off + (fr + 3.5) * cell
    parts.push(
      `<circle cx="${ex}" cy="${ey}" r="${(3.0 * cell).toFixed(2)}" fill="none" stroke="${fg}" stroke-width="${cell}"/>` +
      `<circle cx="${ex}" cy="${ey}" r="${(1.5 * cell).toFixed(2)}" fill="${fg}"/>`
    )
  }

  // Логотип по центру очищенной зоны
  if (logo) {
    const boxPx = (2 * clearHalf + 1) * cell * 1.18 // чуть крупнее зоны — как в оригинале
    const x = (totalPx - boxPx) / 2
    parts.push(
      `<svg x="${x.toFixed(2)}" y="${x.toFixed(2)}" width="${boxPx.toFixed(2)}" height="${boxPx.toFixed(2)}" ` +
      `viewBox="${logo.viewBox}" preserveAspectRatio="xMidYMid meet">${themeLogo(logo.inner, o.theme, fg, bg)}</svg>`
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
    console.error('Использование: node scripts/gen-qr.mjs <url> [имя] [--out f.svg] [--theme dark|light] [--logo-svg f.svg] [--bg #121212|none] [--no-logo]')
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
