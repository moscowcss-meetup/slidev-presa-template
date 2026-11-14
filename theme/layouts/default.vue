<script setup lang="ts">
// Обычный слайд: первый h1 становится пунктирным «заголовком блока» сайта,
// справа от него — моно-пометка `kicker`, внизу подвал с номером.
withDefaults(defineProps<{
  kicker?: string
  snow?: boolean
}>(), { snow: false })
</script>

<template>
  <div class="slidev-layout mc-default">
    <Snowfall v-if="snow" :count="8" />
    <span v-if="kicker" class="mc-kicker">{{ kicker }}</span>
    <div class="mc-default__body">
      <slot />
    </div>
    <McFooter />
  </div>
</template>
