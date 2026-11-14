<script setup lang="ts">
// Финал: слева призыв и контакты, справа карточка с QR (как у партнёрского
// блока сайта) и стикер поверх её угла.
import { asset } from '../utils/asset'

withDefaults(defineProps<{
  qr?: string
  qrCaption?: string
  sticker?: string
  snow?: boolean
}>(), { qrCaption: 'Наведите камеру, чтобы открыть Telegram', snow: true })
</script>

<template>
  <div class="slidev-layout mc-end">
    <Snowfall v-if="snow" :seed="42" />
    <div class="mc-end__body">
      <slot />
    </div>
    <div v-if="qr" class="mc-end__qr">
      <figure class="mc-qr">
        <img :src="asset(qr)" alt="QR-код">
        <figcaption>{{ qrCaption }}</figcaption>
      </figure>
      <Octagon v-if="sticker" class="mc-end__sticker" size="7.5rem" :tilt="10">{{ sticker }}</Octagon>
    </div>
  </div>
</template>
