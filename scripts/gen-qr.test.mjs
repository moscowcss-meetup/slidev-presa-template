#!/usr/bin/env node
// Проверка генератора QR: (1) структура SVG, (2) реальная сканируемость — рендерим SVG,
// инвертируем цвета (наш QR светлый-на-тёмном, декодеры ждут тёмный-на-светлом — как и
// оригиналы; телефоны инверсию читают) и декодируем через zbarimg, сверяя с исходной ссылкой.

import { generateSvg } from './gen-qr.mjs'
import { execFileSync, execSync } from 'node:child_process'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

let failures = 0
const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) failures++ }

function have(bin) {
  try { execSync(`command -v ${bin}`, { stdio: 'ignore' }); return true } catch { return false }
}

// Рендерим и декодируем; тёмную тему инвертируем (декодеры ждут тёмное на светлом).
// Вернёт распознанный текст или ''
function decode(svg, dir, tag, invert = true) {
  const svgP = join(dir, `${tag}.svg`), pngP = join(dir, `${tag}.png`), invP = join(dir, `${tag}-inv.png`)
  writeFileSync(svgP, svg)
  execFileSync('rsvg-convert', ['-w', '700', svgP, '-o', pngP], { stdio: 'ignore' })
  execFileSync('convert', invert ? [pngP, '-negate', invP] : [pngP, invP], { stdio: 'ignore' })
  try { return execFileSync('zbarimg', ['--raw', '-q', invP], { encoding: 'utf8' }).trim() } catch { return '' }
}

const dir = mkdtempSync(join(tmpdir(), 'qrtest-'))
const canDecode = have('rsvg-convert') && have('convert') && have('zbarimg')
if (!canDecode) console.log('⚠ rsvg-convert/convert/zbarimg не все доступны — декодинг пропущен, только структура')

// --- Структура ---
const svg = generateSvg('https://css.moscow', {})
ok(svg.startsWith('<svg') && svg.includes('viewBox'), 'валидный корневой <svg>')
ok(svg.includes('<circle'), 'модули отрисованы кружками')
ok(/stroke-width/.test(svg), 'глазки-финдеры с кольцом (stroke)')
ok(svg.includes('<svg x='), 'логотип вложен по умолчанию')
ok(!generateSvg('https://x.io', { logo: false }).includes('<svg x='), '--no-logo убирает логотип')
ok(generateSvg('https://x.io', { bg: 'none' }).indexOf('<rect') === -1, 'bg=none → без фонового rect')

// --- Темы и логотип партнёра ---
const light = generateSvg('https://css.moscow', { theme: 'light' })
ok(light.includes('fill="#ffffff"/>') && light.includes('<g fill="#121212"'), 'light: тёмные модули на белом')
ok(!/rgb\(100%, 100%, 100%\)/.test(light), 'light: белая башенка перекрашена в цвет модулей')
ok(/79\.219055%/.test(light), 'light: красное «CSS» не тронуто')
ok(generateSvg('https://x.io', { theme: 'light', fg: '#3845cf' }).includes('<g fill="#3845cf"'), '--fg перекрывает тему')
const partner = generateSvg('https://t.me/school21sber', { logoSvg: 'public/logos/school21.svg' })
ok(partner.includes('<svg x=') && partner.includes('viewBox="0 0 101 101"'), '--logo-svg вкладывает логотип партнёра')
const partnerLight = generateSvg('https://t.me/school21sber', { logoSvg: 'public/logos/school21.svg', theme: 'light' })
ok(!/#ffffff/i.test(partnerLight.split('<svg x=')[1]), 'light: белый логотип партнёра перекрашен')

// --- Boundary ---
let threw = false
try { generateSvg('') } catch { threw = true }
ok(threw, 'пустой url → ошибка')
threw = false
try { generateSvg('https://x.io', { theme: 'pink' }) } catch { threw = true }
ok(threw, 'неизвестная тема → ошибка')
threw = false
try { generateSvg('https://x.io', { logoSvg: 'нет-такого.svg' }) } catch { threw = true }
ok(threw, 'нет файла логотипа → ошибка')

// --- Сканируемость (реальные ссылки разной длины/содержания) ---
if (canDecode) {
  // Только ASCII/percent-encoded — как non-ASCII реально выглядит в URL; zbarimg --raw
  // отдаёт UTF-8 байты в своей кодировке, поэтому кириллицу-литерал им не сверить (сам QR ок).
  const cases = [
    'https://css.moscow',
    'https://t.me/moscowcss',
    'https://css.moscow/cfp?talk=CSS%20%D0%BA%D0%B0%D0%BA%20API&year=2026', // плотный QR (v≈41 модуль)
    'HTTPS://EXAMPLE.ORG/A/B/C/D/E/F/G/H/LONG-PATH-1234567890',
  ]
  for (const url of cases) {
    const got = decode(generateSvg(url, {}), dir, 'c' + cases.indexOf(url))
    ok(got === url, `декодируется: ${url.slice(0, 42)}${url.length > 42 ? '…' : ''}`)
  }
  // без логотипа тоже валиден
  ok(decode(generateSvg('https://no.logo/test', { logo: false }), dir, 'nl') === 'https://no.logo/test', 'без логотипа сканируется')
  ok(decode(light, dir, 'lt', false) === 'https://css.moscow', 'light сканируется')
  ok(decode(partner, dir, 'p21') === 'https://t.me/school21sber', 'с логотипом партнёра сканируется')
  ok(decode(partnerLight, dir, 'p21l', false) === 'https://t.me/school21sber', 'light + партнёр сканируется')
}

console.log(failures === 0 ? '\nВСЕ ПРОВЕРКИ ПРОЙДЕНЫ' : `\nПРОВАЛЕНО: ${failures}`)
process.exit(failures === 0 ? 0 : 1)
