<script setup lang="ts">
// Сетка фото в восьмиугольных рамках (команда, гости). `title`, `images: [...]`, `cols` (4).
// Элемент `images` — путь к фото или `{ src, name }`: тогда под фото подпись с именем.
// Без `src` — восьмиугольник с «?» (человек пока секрет, фото не подставляем).
import { computed } from 'vue'
import { asset } from '../utils/asset'
import { colorsFor, createRandom } from '../utils/pile'

type Photo = string | { src?: string, name?: string }

const props = withDefaults(defineProps<{
  images?: Photo[]
  cols?: number
  seed?: number
}>(), { images: () => [], cols: 4, seed: 8 })

const photos = computed(() => props.images.map(p => (typeof p === 'string' ? { src: p, name: undefined } : p)))
const tones = colorsFor(props.images.length, createRandom(props.seed))
</script>

<template>
  <div class="slidev-layout mc-photogrid">
    <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    <div class="mc-photogrid__grid" :style="{ gridTemplateColumns: `repeat(${cols}, auto)` }">
      <figure v-for="(p, i) in photos" :key="p.src ?? p.name ?? i" class="mc-photogrid__cell">
        <Octagon :src="asset(p.src)" :alt="p.name" :tone="tones[i]" size="8.5rem"><span class="mc-photogrid__secret">?</span></Octagon>
        <figcaption v-if="p.name" class="mc-photogrid__name">{{ p.name }}</figcaption>
      </figure>
    </div>
  </div>
</template>
