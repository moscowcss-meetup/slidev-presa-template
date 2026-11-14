<script setup lang="ts">
// Куча плашек: при входе на слайд они падают сверху с отскоком (кривая fall сайта).
// В режиме печати/экспорта и при reduced motion плашки сразу лежат на месте.
import { computed } from 'vue'
import { useIsSlideActive, useNav } from '@slidev/client'
import { buildPile } from '../utils/pile'

const props = withDefaults(defineProps<{
  tags?: string[]
  seed?: number
}>(), { tags: () => [], seed: 1 })

const pills = computed(() => buildPile(props.tags, props.seed))
const isActive = useIsSlideActive()
const { isPrintMode } = useNav()
const falling = computed(() => isActive.value && !isPrintMode.value)
</script>

<template>
  <ul :key="String(falling)" class="mc-pile" :class="{ 'mc-pile--falling': falling }" aria-label="Теги">
    <li
      v-for="pill in pills"
      :key="pill.text"
      class="mc-pill"
      :style="{
        '--tilt': `${pill.tilt}deg`,
        '--delay': `${pill.delay}ms`,
        background: `var(--mc-tone-${pill.tone})`,
        color: `var(--mc-on-tone-${pill.tone})`,
      }"
    >{{ pill.text }}</li>
  </ul>
</template>

<style>
.mc-pile {
  display: flex;
  flex-wrap: wrap-reverse;
  align-content: flex-start;
  justify-content: center;
  /* Отрицательный зазор рядов: верхние плашки «лежат» на нижних, а не висят над ними. */
  gap: 0 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mc-pile > .mc-pill {
  margin-block: -0.15rem;
  font-size: 1.375rem;
}

@media (prefers-reduced-motion: no-preference) {
  .mc-pile--falling > .mc-pill {
    animation: mc-fall 900ms var(--mc-ease-fall) var(--delay) both;
  }
}

@keyframes mc-fall {
  from {
    opacity: 0;
    transform: translateY(-14rem) rotate(calc(var(--tilt) * -3));
  }
  35% {
    opacity: 1;
  }
  to {
    transform: rotate(var(--tilt));
  }
}
</style>
