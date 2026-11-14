<script setup lang="ts">
// Титул по мотивам героя css.moscow: шапка, куча плашек, пунктирный бейдж,
// дата, огромный вордмарк и восьмиугольный стикер поверх него.
withDefaults(defineProps<{
  wordmark?: string
  meetup?: string
  badge?: string
  date?: string
  time?: string
  tags?: string[]
  seed?: number
  /** Текст стикера; перенос строки — `\n`. */
  sticker?: string
  snow?: boolean
}>(), { wordmark: 'MOSCOW CSS', tags: () => [], seed: 1, snow: true })
</script>

<template>
  <div class="slidev-layout mc-cover">
    <Snowfall v-if="snow" :count="10" :seed="seed + 10" />
    <header class="mc-topbar">
      <span class="mc-logo">MOSCOW CSS</span>
      <span v-if="meetup" class="mc-topbar__meta">{{ meetup }}</span>
    </header>

    <div class="mc-cover__stage">
      <span v-if="badge" class="mc-badge">{{ badge }}</span>
      <PillPile class="mc-cover__pile" :tags="tags" :seed="seed" />
      <div v-if="date" class="mc-cover__date">
        <b>{{ date }}</b>
        <span v-if="time">{{ time }}</span>
      </div>
    </div>

    <div class="mc-cover__wordmark" aria-hidden="true">{{ wordmark }}</div>
    <div class="mc-cover__slot"><slot /></div>

    <Octagon v-if="sticker" class="mc-cover__sticker" size="8.5rem" :tilt="-8">{{ sticker }}</Octagon>
  </div>
</template>
