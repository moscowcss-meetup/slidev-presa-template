<script setup lang="ts">
// Крупная цифра с подписью: «108 / докладов». Плашка цвета tone подчёркивает число снизу.
withDefaults(defineProps<{
  value: string | number
  label: string
  tone?: 'sky' | 'blue' | 'yellow' | 'red' | 'orange' | 'green'
  tilt?: number
}>(), { tone: 'yellow', tilt: -2 })
</script>

<template>
  <div class="mc-stat">
    <span class="mc-stat__value">
      <span class="mc-stat__mark" :style="{ background: `var(--mc-tone-${tone})`, transform: `rotate(${tilt}deg)` }" />
      {{ value }}
    </span>
    <span class="mc-stat__label">/ {{ label }}</span>
  </div>
</template>

<style>
.mc-stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

/* Маркер — толстое подчёркивание в своём нижнем отступе, а не заливка под цифрами:
   под светлыми цифрами тёмной схемы (и тёмными — светлой) любой тон съедал контраст. */
.mc-stat__value {
  position: relative;
  isolation: isolate;
  width: fit-content;
  padding-bottom: 0.3em;
  font: 400 3.75rem/1 var(--mc-font-display);
  letter-spacing: -0.01em;
}

.mc-stat__mark {
  position: absolute;
  z-index: -1;
  right: -0.4rem;
  bottom: 0;
  left: -0.4rem;
  height: 0.26em;
  border-radius: 999px;
}

.mc-stat__label {
  font: 400 1rem/1.4 var(--mc-font-mono);
  color: var(--mc-muted);
}
</style>
