<template>
  <div class="mcss-logoside">
    <img class="logo" :src="asset('/logo.svg')" alt="MoscowCSS" />
    <div class="content">
      <h2 v-if="$frontmatter.title" class="heading">{{ $frontmatter.title }}</h2>
      <div class="body"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { asset } from '../composables/asset.js'
</script>

<style scoped>
.mcss-logoside {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  align-items: center;
  gap: 3rem;
  padding: 0 5% 0 8%;
}
.logo { width: 9rem; height: auto; justify-self: center; }
.heading { font-weight: 700; font-size: 1.9rem; margin: 0 0 1.2rem; }
.body { color: var(--mcss-body); font-size: 1.25rem; line-height: 1.5; }
.body :deep(p) { margin: 0 0 0.6rem; }
</style>
