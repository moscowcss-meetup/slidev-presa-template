<template>
  <div class="mcss-speaker">
    <div class="info">
      <h1 class="name">{{ $frontmatter.name }}</h1>
      <div class="role muted">{{ $frontmatter.role }}</div>
      <p class="pitch">{{ $frontmatter.pitch }}</p>
      <div class="label muted">в докладе</div>
      <p class="talk">«{{ $frontmatter.talk }}»</p>
    </div>
    <div class="photo" :style="{ backgroundImage: `url(${asset($frontmatter.photo || '/img/speaker-placeholder.png')})` }" />
  </div>
</template>

<script setup>
import { asset } from '../composables/asset.js'
</script>

<style scoped>
.mcss-speaker {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3rem 0 8%;
  gap: 0.5rem;
}
.name { font-weight: 500; font-size: 2.6rem; margin: 0; }
.role { font-size: 1.1rem; margin-bottom: 0.8rem; }
.pitch { font-size: 1.2rem; line-height: 1.45; color: var(--mcss-body); margin: 0.4rem 0 0.8rem; }
.label { font-size: 1rem; }
.talk { font-weight: 700; font-size: 1.25rem; line-height: 1.4; margin: 0.3rem 0 0; }
.photo { background-size: cover; background-position: center; }
</style>
