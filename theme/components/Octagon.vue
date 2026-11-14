<script setup lang="ts">
// Восьмиугольник css.moscow: стикер «position: в зале» и рамка аватара спикера.
// С `src` — фото в цветной рамке, без — стикер с текстом из слота.
withDefaults(defineProps<{
  size?: string
  /** sticker | sky | blue | yellow | red | orange | green */
  tone?: string
  src?: string
  alt?: string
  /** Наклон в градусах. */
  tilt?: number
}>(), { size: '9rem', tone: 'sticker', alt: '', tilt: 0 })
</script>

<template>
  <div
    class="mc-octagon"
    :class="{ 'mc-octagon--photo': src }"
    :style="{
      '--size': size,
      '--tilt': `${tilt}deg`,
      '--fill': tone === 'sticker' ? 'var(--mc-sticker-bg)' : `var(--mc-tone-${tone})`,
      '--on-fill': tone === 'sticker' ? 'var(--mc-on-sticker)' : `var(--mc-on-tone-${tone})`,
    }"
  >
    <img v-if="src" :src="src" :alt="alt">
    <span v-else class="mc-octagon__text"><slot /></span>
  </div>
</template>

<style>
.mc-octagon {
  display: grid;
  place-items: center;
  width: var(--size);
  aspect-ratio: 1;
  clip-path: var(--mc-octagon);
  background: var(--fill);
  color: var(--on-fill);
  transform: rotate(var(--tilt));
}

.mc-octagon__text {
  padding: 1rem;
  font: 700 1.125rem/1.35 var(--mc-font-mono);
  text-align: center;
  white-space: pre-line;
}

.mc-octagon--photo > img {
  width: calc(100% - 0.5rem);
  aspect-ratio: 1;
  object-fit: cover;
  clip-path: var(--mc-octagon);
}
</style>
