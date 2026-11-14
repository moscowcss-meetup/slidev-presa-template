<script setup lang="ts">
// Подвал обычного слайда: логотип-надпись как в шапке сайта и номер «07 / 20».
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()
const pad = (n: number) => String(n).padStart(2, '0')
const counter = computed(() => `${pad(currentPage.value)} / ${pad(total.value)}`)
</script>

<template>
  <footer class="mc-footer">
    <span class="mc-logo">MOSCOW CSS</span>
    <span class="mc-footer__page">{{ counter }}</span>
  </footer>
</template>
