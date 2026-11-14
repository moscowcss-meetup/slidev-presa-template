<script setup lang="ts">
// Падающие снежинки как на css.moscow (FallingDecor): каждая бесконечно падает сверху вниз
// с постоянной скоростью и крутится вокруг своей оси. Колонки равной ширины — чтобы не
// сбивались в кучу; отрицательная задержка — с первого кадра они уже разбросаны по высоте.
// Декор: aria-hidden, под контентом, не ловит клики. В печати и при reduced motion
// снежинки стоят на случайной высоте и не двигаются.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { createRandom } from '../utils/pile'

const props = withDefaults(defineProps<{
  count?: number
  seed?: number
}>(), { count: 14, seed: 3 })

const { isPrintMode } = useNav()

// Тона те же, что у снежинок сайта (snowTones)
const tones = ['sky', 'blue', 'yellow', 'red', 'orange']
const between = (low: number, high: number, random: () => number) => low + random() * (high - low)

const flakes = computed(() => {
  const random = createRandom(props.seed)
  return Array.from({ length: props.count }, (_, index) => {
    // Слайд ниже окна сайта, поэтому падение короче (на сайте 20–40 с): скорость та же
    const fallMs = between(14000, 26000, random)
    return {
      left: `${(((index + random()) / props.count) * 96).toFixed(1)}%`,
      fall: `${fallMs.toFixed(0)}ms`,
      delay: `${(-random() * fallMs).toFixed(0)}ms`,
      spin: `${between(3000, 6000, random).toFixed(0)}ms`,
      rest: `${between(-10, 90, random).toFixed(1)}%`,
      size: `${(1.5 * between(0.7, 1.2, random)).toFixed(2)}rem`,
      color: `var(--mc-tone-${tones[Math.floor(random() * tones.length)]})`,
    }
  })
})

// Иконка snowflake из @moscowcss/icons (lucide, ISC) — та же, что на сайте.
const paths = [
  'm10 20-1.25-2.5L6 18', 'M10 4 8.75 6.5 6 6', 'm14 20 1.25-2.5L18 18', 'm14 4 1.25 2.5L18 6',
  'm17 21-3-6h-4', 'm17 3-3 6 1.5 3', 'M2 12h6.5L10 9', 'm20 10-1.5 2 1.5 2',
  'M22 12h-6.5L14 15', 'm4 10 1.5 2L4 14', 'm7 21 3-6-1.5-3', 'm7 3 3 6h4',
]
</script>

<template>
  <div class="mc-snow" :class="{ 'mc-snow--still': isPrintMode }" aria-hidden="true">
    <div
      v-for="(f, i) in flakes"
      :key="i"
      class="mc-snow__fall"
      :style="{ left: f.left, '--rest': f.rest, animationDuration: f.fall, animationDelay: f.delay }"
    >
      <svg
        class="mc-snow__flake"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :style="{ width: f.size, color: f.color, animationDuration: f.spin }"
      >
        <path v-for="d in paths" :key="d" :d="d" />
      </svg>
    </div>
  </div>
</template>

<style>
.mc-snow {
  position: absolute;
  z-index: -1; /* под контентом; .slidev-layout изолирован, так что над фоном */
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Колонка высотой со слайд: translateY в процентах — от её высоты, то есть от высоты слайда.
   Без анимации снежинка стоит на своей случайной высоте --rest. */
.mc-snow__fall {
  position: absolute;
  top: 0;
  height: 100%;
  transform: translateY(var(--rest));
}

.mc-snow__flake {
  display: block;
  aspect-ratio: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .mc-snow:not(.mc-snow--still) .mc-snow__fall {
    animation: mc-snow-fall linear infinite;
    will-change: transform;
  }

  .mc-snow:not(.mc-snow--still) .mc-snow__flake {
    animation: mc-snow-spin linear infinite;
  }
}

/* Как на сайте: от −25% над слайдом до 115% под ним — появляется и исчезает за краем */
@keyframes mc-snow-fall {
  from { transform: translateY(-25%); }
  to { transform: translateY(115%); }
}

@keyframes mc-snow-spin {
  to { transform: rotate(360deg); }
}
</style>
