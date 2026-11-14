<script setup lang="ts">
// Разделитель актов: номер «/ 02», огромный заголовок Jost и куча плашек справа внизу.
withDefaults(defineProps<{
  num?: string
  tags?: string[]
  seed?: number
  snow?: boolean
}>(), { tags: () => [], seed: 2, snow: false })
</script>

<template>
  <div class="slidev-layout mc-section">
    <Snowfall v-if="snow" :count="10" :seed="seed + 20" />
    <span v-if="num" class="mc-section__num">/ {{ num }}</span>
    <div class="mc-section__body">
      <slot />
    </div>
    <PillPile v-if="tags.length" class="mc-section__pile" :tags="tags" :seed="seed" />
    <McFooter />
  </div>
</template>
