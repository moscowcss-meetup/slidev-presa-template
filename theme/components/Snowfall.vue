<script setup lang="ts">
// Падающие снежинки сайта (зимний декор). Чисто декоративный слой: aria-hidden,
// не ловит клики, в печати и при reduced motion стоит на месте.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { createRandom } from '../utils/pile'

const { isPrintMode } = useNav()

const props = withDefaults(defineProps<{
  count?: number
  seed?: number
}>(), { count: 14, seed: 3 })

const colors = ['sky', 'blue', 'yellow', 'red', 'orange'].map(t => `var(--mc-tone-${t})`).concat('var(--mc-divider)')

const flakes = computed(() => {
  const random = createRandom(props.seed)
  return Array.from({ length: props.count }, () => ({
    left: `${(random() * 96).toFixed(1)}%`,
    top: `${(random() * 92).toFixed(1)}%`,
    size: `${(1 + random() * 0.9).toFixed(2)}rem`,
    color: colors[Math.floor(random() * colors.length)],
    duration: `${(9 + random() * 8).toFixed(1)}s`,
    delay: `${(-random() * 12).toFixed(1)}s`,
  }))
})

// Иконка snowflake из @moscowcss/icons (lucide, ISC).
const paths = [
  'm10 20-1.25-2.5L6 18', 'M10 4 8.75 6.5 6 6', 'm14 20 1.25-2.5L18 18', 'm14 4 1.25 2.5L18 6',
  'm17 21-3-6h-4', 'm17 3-3 6 1.5 3', 'M2 12h6.5L10 9', 'm20 10-1.5 2 1.5 2',
  'M22 12h-6.5L14 15', 'm4 10 1.5 2L4 14', 'm7 21 3-6-1.5-3', 'm7 3 3 6h4',
]
</script>

<template>
  <div class="mc-snow" :class="{ 'mc-snow--still': isPrintMode }" aria-hidden="true">
    <svg
      v-for="(f, i) in flakes"
      :key="i"
      class="mc-snow__flake"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="{ left: f.left, top: f.top, width: f.size, color: f.color, animationDuration: f.duration, animationDelay: f.delay }"
    >
      <path v-for="d in paths" :key="d" :d="d" />
    </svg>
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

.mc-snow__flake {
  position: absolute;
  aspect-ratio: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .mc-snow:not(.mc-snow--still) .mc-snow__flake {
    animation: mc-drift linear infinite;
  }
}

@keyframes mc-drift {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(0.75rem, 1.5rem) rotate(90deg); }
}
</style>
