<script setup lang="ts">
// Сетка фото в восьмиугольных рамках (команда, гости). `title`, `images: [...]`, `cols` (4).
import { asset } from '../utils/asset'
import { colorsFor, createRandom } from '../utils/pile'

const props = withDefaults(defineProps<{
  images?: string[]
  cols?: number
  seed?: number
}>(), { images: () => [], cols: 4, seed: 8 })

const tones = colorsFor(props.images.length, createRandom(props.seed))
</script>

<template>
  <div class="slidev-layout mc-photogrid">
    <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    <div class="mc-photogrid__grid" :style="{ gridTemplateColumns: `repeat(${cols}, auto)` }">
      <Octagon v-for="(src, i) in images" :key="src" :src="asset(src)" :tone="tones[i]" size="8.5rem" />
    </div>
  </div>
</template>
