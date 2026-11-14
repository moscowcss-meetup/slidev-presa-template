<script setup lang="ts">
// Крупная фраза на весь слайд («Спасибо», «Мы начинаем»). Перенос — <br>,
// акцент — [текст]{.accent}, сноска — `note:` во frontmatter.
withDefaults(defineProps<{
  note?: string
  tags?: string[]
  seed?: number
  snow?: boolean
}>(), { tags: () => [], seed: 4, snow: true })
</script>

<template>
  <div class="slidev-layout mc-statement">
    <Snowfall v-if="snow" :count="9" :seed="seed + 30" />
    <div class="mc-statement__text"><slot /></div>
    <div v-if="note" class="mc-statement__note">{{ note }}</div>
    <PillPile v-if="tags.length" class="mc-statement__pile" :tags="tags" :seed="seed" />
  </div>
</template>
