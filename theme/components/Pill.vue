<script setup lang="ts">
// Цветная плашка-пилюля из героя css.moscow. Годится и в куче, и как инлайн-тег.
withDefaults(defineProps<{
  tone?: 'sky' | 'blue' | 'yellow' | 'red' | 'orange' | 'green'
  /** Наклон в градусах. */
  tilt?: number
}>(), { tone: 'blue', tilt: 0 })
</script>

<template>
  <span
    class="mc-pill"
    :style="{
      '--tilt': `${tilt}deg`,
      background: `var(--mc-tone-${tone})`,
      color: `var(--mc-on-tone-${tone})`,
    }"
  ><slot /></span>
</template>
