// Резолвит путь ассета относительно base сборки (import.meta.env.BASE_URL).
// Нужно, чтобы деки работали и в корне, и под subpath (GitHub Pages: /<repo>/<N>/<deck>/).
// Динамические :src/url() Vite не переписывает сам — поэтому префиксуем вручную.
export const asset = (p) => {
  if (!p) return p
  const s = String(p)
  if (/^(https?:)?\/\//.test(s) || s.startsWith('data:')) return s // внешние URL не трогаем
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + '/' + s.replace(/^\//, '')
}
