<template>
  <div class="mcss-qrtrio">
    <div class="row">
      <figure v-for="(item, i) in $frontmatter.items" :key="i" class="cell">
        <figcaption class="cap">{{ item.label }}</figcaption>
        <img :src="item.img" :alt="item.label" />
      </figure>
    </div>
    <div v-if="$frontmatter.footer" class="footer">
      <div class="f1">{{ $frontmatter.footer }}</div>
      <div class="f2 muted">{{ $frontmatter.footerSub }}</div>
    </div>
  </div>
</template>

<style scoped>
.mcss-qrtrio {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
}
.row { display: flex; gap: 2.5rem; }
.cell { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
.cap { font-size: 1.4rem; color: var(--mcss-body); }
.cell img { width: 15rem; height: 15rem; object-fit: contain; }
.footer { text-align: center; }
.f1 { font-weight: 600; font-size: 1.5rem; }
.f2 { font-size: 1rem; }
</style>
