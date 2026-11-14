<script setup lang="ts">
// QR слева в наклонённой карточке, справа заголовок и описание. `qr` — путь к SVG из public/.
// Поверх карточки ничего не кладём: любой декор на углу закрывает маркер, и QR не читается.
import { asset } from '../utils/asset'

defineProps<{ qr?: string }>()
</script>

<template>
  <div class="slidev-layout mc-qrside">
    <div class="mc-qrcard"><img :src="asset(qr)" alt="QR-код"></div>
    <div class="mc-qrside__content">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <div class="mc-qrside__body"><slot /></div>
    </div>
  </div>
</template>
