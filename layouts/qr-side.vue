<template>
  <div class="mcss-qrside">
    <img class="qr" :src="$frontmatter.qr" alt="QR" />
    <div class="content">
      <h2 v-if="$frontmatter.title" class="heading">{{ $frontmatter.title }}</h2>
      <div class="body"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.mcss-qrside {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 3.5rem;
  padding: 0 6% 0 6%;
}
.qr { width: 22rem; height: 22rem; object-fit: contain; }
.heading { font-weight: 500; font-size: 2.2rem; margin: 0 0 1rem; line-height: 1.15; }
.body { color: var(--mcss-muted); font-size: 1.2rem; line-height: 1.5; }
.body :deep(p) { margin: 0 0 0.6rem; }
</style>
