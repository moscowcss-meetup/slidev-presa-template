<script setup lang="ts">
// Анонс/активность: слева звезда Moscow CSS, справа заголовок и текст.
withDefaults(defineProps<{
  snow?: boolean
}>(), { snow: true })
</script>

<template>
  <div class="slidev-layout mc-logoside">
    <Snowfall v-if="snow" :count="8" :seed="51" />
    <StarMark class="mc-logoside__star" size="15rem" :tilt="-12" />
    <div class="mc-logoside__content">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <div class="mc-logoside__body"><slot /></div>
    </div>
  </div>
</template>
