<script setup lang="ts">
// QR слева в наклонённой карточке, справа заголовок и описание. `qr` — тёмный SVG из public/,
// в светлой схеме тема возьмёт пару <имя>-light.svg (см. utils/asset.ts → qrAsset).
// Поверх карточки ничего не кладём: любой декор на углу закрывает маркер, и QR не читается.
import { useDarkMode } from '@slidev/client'
import { qrAsset } from '../utils/asset'

defineProps<{ qr?: string }>()
const { isDark } = useDarkMode()
</script>

<template>
  <div class="slidev-layout mc-qrside">
    <div class="mc-qrcard"><img :src="qrAsset(qr, isDark)" alt="QR-код"></div>
    <div class="mc-qrside__content">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <div class="mc-qrside__body"><slot /></div>
    </div>
  </div>
</template>
