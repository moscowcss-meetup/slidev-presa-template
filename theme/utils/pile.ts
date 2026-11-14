// Куча плашек в духе героя css.moscow (TagPile/pile.ts на сайте), упрощённая для слайдов:
// раскладку рядов делает flex `wrap-reverse` (первые плашки — нижний ряд), а здесь
// считаются только цвет, наклон и задержка падения. Всё детерминировано сидом,
// поэтому куча одинаковая в dev, в сборке и в PDF.

export type Random = () => number

export const tones = ['sky', 'blue', 'yellow', 'red', 'orange'] as const
export type Tone = (typeof tones)[number] | 'green'

/** mulberry32: одинаковый сид даёт одинаковую кучу. */
export function createRandom(seed: number): Random {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Цвет каждой плашки; соседние никогда не совпадают. */
export function colorsFor(count: number, random: Random): Tone[] {
  const result: number[] = []
  for (let i = 0; i < count; i += 1) {
    const previous = result[i - 1]
    if (previous === undefined) {
      result.push(Math.floor(random() * tones.length))
      continue
    }
    const pick = Math.floor(random() * (tones.length - 1))
    result.push(pick >= previous ? pick + 1 : pick)
  }
  return result.map(i => tones[i])
}

/**
 * Наклон плашки в градусах. index 0 — нижний ряд кучи, index count-1 — самая верхняя.
 *
 * TODO(you): характер кучи задаётся здесь. Сейчас — «чем выше, тем сильнее кренится»,
 * знак случайный. Варианты: на сайте короткие плашки клонятся круче длинных (до 68°),
 * можно чередовать знак, чтобы куча «держала равновесие», или класть нижний ряд ровно.
 */
export function tiltFor(index: number, count: number, random: Random): number {
  const height = count > 1 ? index / (count - 1) : 0
  const magnitude = 1.5 + 9 * height ** 1.4 + random() * 2.5
  return random() < 0.5 ? -magnitude : magnitude
}

export interface PilePill {
  text: string
  tone: Tone
  tilt: number
  /** Задержка падения, мс: нижние падают первыми. */
  delay: number
}

export function buildPile(tags: readonly string[], seed: number, stepMs = 110): PilePill[] {
  const random = createRandom(seed)
  const colors = colorsFor(tags.length, random)
  return tags.map((text, i) => ({
    text,
    tone: colors[i],
    tilt: Number(tiltFor(i, tags.length, random).toFixed(2)),
    delay: i * stepMs,
  }))
}
