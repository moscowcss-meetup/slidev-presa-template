<template>
  <div class="mcss-fullimg" :style="{ backgroundImage: `url(${asset($frontmatter.image)})` }">
    <!-- опциональная подпись поверх фото (тело слайда) -->
    <div v-if="hasCaption" class="caption"><slot /></div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue'
import { asset } from '../composables/asset.js'
const hasCaption = !!useSlots().default
</script>

<style scoped>
.mcss-fullimg {
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
}
.caption {
  width: 100%;
  padding: 2rem 8%;
  font-size: 1.4rem;
  color: #fff;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
}
</style>
