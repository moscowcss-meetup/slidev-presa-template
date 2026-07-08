<template>
  <div class="mcss-statement">
    <div class="text"><slot /></div>
    <!-- опциональная сноска (frontmatter note:) — мелким серым под фразой -->
    <div v-if="$frontmatter.note" class="note muted">{{ $frontmatter.note }}</div>
  </div>
</template>

<style scoped>
.mcss-statement {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  gap: 0.6rem;
}
.note { font-size: 1.1rem; font-weight: 500; }
.text {
  font-weight: 800;
  font-size: 4.2rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.text :deep(p) { margin: 0; }
</style>
