// Темы фирменного QR и перекраска между ними. Общий модуль для gen-qr.mjs (генерация)
// и `pnpm qr --light-from` (светлая версия из уже готового тёмного SVG без URL).

// Цвета модулей (fg) и фона (bg). dark — как оригинальные слайды и тёмная .mc-qrcard темы.
export const THEMES = {
  dark: { fg: '#ffffff', bg: '#121212' },
  light: { fg: '#121212', bg: '#ffffff' },
}

// Пара файлов на одну ссылку: <имя>.svg — для тёмной схемы слайдов, <имя>-light.svg — для
// светлой. Тема (theme/utils/asset.ts → qrAsset) сама выбирает файл по схеме дека.
export const LIGHT_SUFFIX = '-light'
export const lightPath = (path) => path.replace(/\.svg$/i, `${LIGHT_SUFFIX}.svg`)
export const isLightPath = (path) => new RegExp(`${LIGHT_SUFFIX}\\.svg$`, 'i').test(path)

// Белое и тёмная подложка — то, что светлая тема меняет местами. Цветное (красное «CSS»,
// фирменные цвета партнёров) не трогаем. (?![0-9a-f]) — чтобы #fff не съел начало #fffe00.
const WHITE = /#fff(?:fff)?(?![0-9a-f])|rgb\(100%, 100%, 100%\)|\bwhite\b/gi
const PLATE = /#121212(?![0-9a-f])|rgb\(7\.058716%, 7\.058716%, 7\.058716%\)/gi

/**
 * Тёмное ↔ светлое: белое → fg, тёмная подложка → bg (через маркер, чтобы замены не
 * наложились). На логотипе — перекраска под светлую тему; на целом тёмном QR — его
 * светлая версия: фон, модули, глазки и логотип разом.
 */
export function swapToLight(svg, fg = THEMES.light.fg, bg = THEMES.light.bg) {
  return svg
    .replace(PLATE, '__QR_BG__')
    .replace(WHITE, fg)
    .replace(/__QR_BG__/g, bg)
}
