<script setup lang="ts">
// Три QR в ряд, над каждым — плашка-подпись. `items: [{ label, img }]`,
// внизу `footer` (адрес сайта) и `footerSub`.
import { asset } from '../utils/asset'
import { colorsFor, createRandom } from '../utils/pile'

const props = withDefaults(defineProps<{
  items?: { label: string, img: string }[]
  footer?: string
  footerSub?: string
  seed?: number
}>(), { items: () => [], seed: 6 })

const tones = colorsFor(props.items.length, createRandom(props.seed))
const tilts = [-4, 3, -2, 4]
</script>

<template>
  <div class="slidev-layout mc-qrtrio">
    <div class="mc-qrtrio__row">
      <figure v-for="(item, i) in items" :key="item.label" class="mc-qrtrio__cell">
        <Pill :tone="tones[i]" :tilt="tilts[i % tilts.length]">{{ item.label }}</Pill>
        <div class="mc-qrcard"><img :src="asset(item.img)" :alt="item.label"></div>
      </figure>
    </div>
    <div v-if="footer" class="mc-qrtrio__footer">
      <span class="mc-qrtrio__site">{{ footer }}</span>
      <span v-if="footerSub" class="mc-qrtrio__sub">/ {{ footerSub }}</span>
    </div>
  </div>
</template>
