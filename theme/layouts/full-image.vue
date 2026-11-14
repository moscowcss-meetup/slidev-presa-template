<script setup lang="ts">
// Фото в край слайда (`image:` во frontmatter), подпись из тела — плашкой снизу.
import { useSlots } from 'vue'
import { asset } from '../utils/asset'

const props = defineProps<{ image?: string }>()
const hasCaption = !!useSlots().default
</script>

<template>
  <div class="slidev-layout mc-fullimg" :style="{ backgroundImage: `url(${asset(props.image)})` }">
    <div v-if="hasCaption" class="mc-fullimg__caption"><slot /></div>
  </div>
</template>
