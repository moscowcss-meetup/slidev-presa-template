<script setup lang="ts">
// Финал: слева призыв и контакты, справа фирменный QR митапа (scripts/gen-qr.mjs из
// slidev-presa-template: точки, кольцевые маркеры, башенка) и стикер слева снизу от него.
import { useDarkMode } from '@slidev/client'
import { qrAsset } from '../utils/asset'

const { isDark } = useDarkMode()
withDefaults(defineProps<{
  qr?: string
  qrCaption?: string
  sticker?: string
  snow?: boolean
}>(), { qrCaption: 'Наведите камеру телефона', snow: true })
</script>

<template>
  <div class="slidev-layout mc-end">
    <Snowfall v-if="snow" :seed="42" />
    <div class="mc-end__body">
      <slot />
    </div>
    <div v-if="qr" class="mc-end__qr">
      <figure class="mc-qr">
        <div class="mc-qrcard"><img :src="qrAsset(qr, isDark)" alt="QR-код"></div>
        <figcaption>{{ qrCaption }}</figcaption>
      </figure>
      <Octagon v-if="sticker" class="mc-end__sticker" size="7.5rem" :tilt="10">{{ sticker }}</Octagon>
    </div>
  </div>
</template>
