<template>
  <div class="mcss-statement">
    <div class="text"><slot /></div>
  </div>
</template>

<style scoped>
.mcss-statement {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
}
.text {
  font-weight: 800;
  font-size: 4.2rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.text :deep(p) { margin: 0; }
</style>
