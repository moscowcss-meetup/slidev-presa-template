<template>
  <div class="mcss-cover">
    <img class="logo" src="/logo.svg" alt="MoscowCSS" />
    <div class="title"><slot /></div>
    <div v-if="$frontmatter.subtitle" class="subtitle">{{ $frontmatter.subtitle }}</div>
  </div>
</template>

<style scoped>
.mcss-cover {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.2rem;
}
.logo { width: 8rem; height: auto; }
.title { font-size: 3rem; font-weight: 500; line-height: 1.1; }
/* число в заголовке выделяется жирным через **30** в markdown */
.title :deep(strong) { font-weight: 800; color: var(--mcss-fg); }
.subtitle { color: var(--mcss-muted); font-size: 1.4rem; }
</style>
