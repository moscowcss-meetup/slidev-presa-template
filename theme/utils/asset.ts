// Путь к ассету из public/ относительно base сборки (import.meta.env.BASE_URL).
// Нужен, чтобы дек работал и в корне, и под subpath (GitHub Pages: /<repo>/<N>/<deck>/):
// динамические :src и url() Vite сам не переписывает.
export function asset(path?: string): string | undefined {
  if (!path) return path
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

// QR лежат парой: <имя>.svg (тёмная схема) и <имя>-light.svg (светлая) — так их пишет
// генератор шаблона (`pnpm qr`). Во frontmatter указываем тёмный файл, светлый тема
// подставит сама. Внешние ссылки и не-SVG не трогаем.
export function qrAsset(path: string | undefined, isDark: boolean): string | undefined {
  if (!path || isDark || !/\.svg$/i.test(path) || /-light\.svg$/i.test(path) || /^(https?:)?\/\//.test(path))
    return asset(path)
  return asset(path.replace(/\.svg$/i, '-light.svg'))
}
