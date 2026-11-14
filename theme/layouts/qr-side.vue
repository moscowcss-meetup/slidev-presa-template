<script setup lang="ts">
// QR слева в наклонённой карточке, справа заголовок и описание.
// `qr` — путь к SVG из public/, `sticker` — опциональный восьмиугольник на углу карточки.
import { asset } from '../utils/asset'

withDefaults(defineProps<{
  qr?: string
  sticker?: string
}>(), {})
</script>

<template>
  <div class="slidev-layout mc-qrside">
    <div class="mc-qrside__qr">
      <div class="mc-qrcard"><img :src="asset(qr)" alt="QR-код"></div>
      <Octagon v-if="sticker" class="mc-qrside__sticker" size="7rem" :tilt="8">{{ sticker }}</Octagon>
    </div>
    <div class="mc-qrside__content">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <div class="mc-qrside__body"><slot /></div>
    </div>
  </div>
</template>
