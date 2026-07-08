<template>
  <div class="mcss-photogrid">
    <h2 v-if="$frontmatter.title" class="heading">{{ $frontmatter.title }}</h2>
    <div class="grid" :style="{ gridTemplateColumns: `repeat(${$frontmatter.cols || 4}, 1fr)` }">
      <div
        v-for="(src, i) in ($frontmatter.images || [])"
        :key="i"
        class="cell"
        :style="{ backgroundImage: `url(${asset(src)})` }"
      />
    </div>
  </div>
</template>

<script setup>
import { asset } from '../composables/asset.js'
</script>

<style scoped>
.mcss-photogrid {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 4% 5%;
}
.heading { font-weight: 500; font-size: 2rem; margin: 0; }
.grid { display: grid; gap: 0.9rem; }
.cell {
  aspect-ratio: 1;
  border-radius: 0.5rem;
  background-size: cover;
  background-position: center;
}
</style>
