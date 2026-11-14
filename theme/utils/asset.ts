// Путь к ассету из public/ относительно base сборки (import.meta.env.BASE_URL).
// Нужен, чтобы дек работал и в корне, и под subpath (GitHub Pages: /<repo>/<N>/<deck>/):
// динамические :src и url() Vite сам не переписывает.
export function asset(path?: string): string | undefined {
  if (!path) return path
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
