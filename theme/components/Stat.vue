<script setup lang="ts">
// Крупная цифра со подписью: «108 / докладов». Плашка цвета tone подчёркивает число.
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

.mc-stat__value {
  position: relative;
  isolation: isolate;
  width: fit-content;
  font: 400 3.75rem/1 var(--mc-font-display);
  letter-spacing: -0.01em;
}

.mc-stat__mark {
  position: absolute;
  z-index: -1;
  inset: 55% -0.4rem -0.1rem -0.4rem;
  border-radius: 999px;
}

.mc-stat__label {
  font: 400 1rem/1.4 var(--mc-font-mono);
  color: var(--mc-muted);
}
</style>
