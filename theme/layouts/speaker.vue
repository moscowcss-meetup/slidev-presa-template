<script setup lang="ts">
// Карточка спикера как программа на css.moscow: фото в восьмиугольной рамке,
// имя, роль, о чём доклад и название в «ёлочках» (кавычки добавляет шаблон).
import { asset } from '../utils/asset'

withDefaults(defineProps<{
  name?: string
  role?: string
  photo?: string
  pitch?: string
  talk?: string
  /** Цвет рамки фото: red | orange | yellow | sky | blue | green */
  tone?: string
}>(), { tone: 'red' })
</script>

<template>
  <div class="slidev-layout mc-speaker">
    <div class="mc-speaker__info">
      <h1 class="mc-speaker__name">{{ name }}</h1>
      <div class="mc-speaker__role">{{ role }}</div>
      <p class="mc-speaker__pitch">{{ pitch }}</p>
      <template v-if="talk">
        <div class="mc-speaker__label">/ в докладе</div>
        <p class="mc-speaker__talk">«{{ talk }}»</p>
      </template>
    </div>
    <Octagon v-if="photo" :src="asset(photo)" :alt="name" :tone="tone" size="19rem" />
    <!-- Спикер ещё секрет: без фото — восьмиугольник со знаком вопроса. -->
    <Octagon v-else :tone="tone" size="19rem"><span class="mc-speaker__secret">?</span></Octagon>
  </div>
</template>
