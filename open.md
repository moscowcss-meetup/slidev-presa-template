---
# Deck-конфиг + frontmatter первого слайда (обложки).
# Тема (вёрстка, токены, шрифты css.moscow) — в ./theme, здесь только контент.
theme: ./theme
title: MoscowCSS Meetup
mdc: true
colorSchema: auto
transition: fade
# hash-роутинг — чтобы собранный дек работал под любым subpath (dist/<N>/open) без SPA-fallback
routerMode: hash
layout: cover
meetup: в Школе 21
badge: 32 митап
date: 26 ноября 2026
time: в 19:00
seed: 32
tags: ["ai-агенты", "accessibility tree", "дофамин", "механики вовлечения", "история дизайна", "музыка", "#вопрос_спикеру", "css"]
sticker: "position:\nв зале"
---

<!-- ГОТОВЫЕ (не меняются): 1, 3, 5, 6, 11, 12, 13, 14 · МЕНЯЮТСЯ: 2, 4, 7-10 -->
<!-- 1. ОБЛОЖКА — меняются badge / date / tags во frontmatter и номер (**32**) -->

.MoscowCSS:ntn-child(**32**)

/ оффлайн / онлайн / бесплатно

---
layout: statement
---

<!-- 2. ПРИВЕТСТВИЕ — меняется номер -->

Приветствуем<br>на 32 митапе

---
layout: default
---

<!-- 3. РЕГИСТРАЦИЯ — просьба регистрироваться внимательно, без фейковых данных; лого Networkly (public/logos/).
     Путь к картинке — через asset(): статичный src Slidev превращает в import, а под subpath нужен BASE_URL -->

<script setup>
import { asset } from './theme/utils/asset'
</script>

# Регистрируйтесь внимательно

<div class="text-[1.5rem] leading-snug max-w-[46rem]">

Пожалуйста, указывайте настоящие данные, без фейковых имён и контактов. На площадку проходят по паспорту, а по списку регистраций мы считаем места и пишем вам о митапе.

</div>

<div class="mt-10 flex items-center gap-8">
  <img :src="asset('/logos/networkly.png')" alt="Networkly.app" class="w-[22rem]">
  <span class="text-[1.25rem] opacity-80 max-w-[22rem]">С этим сервисом организаторам оказалось удобнее всего работать</span>
</div>

---
layout: qr-side
qr: /qr/school21.svg
title: Спасибо Школе 21 за это
---

<!-- 4. СПОНСОР/ПЛОЩАДКА — меняется под партнёра (pnpm qr <url> <имя>) -->

Бесплатная школа цифровых технологий от Сбера. Подписывайтесь на телеграм-канал **@school21sber**!

---
layout: qr-trio
footer: css.moscow
footerSub: наш сайт
items:
  - { label: Анонсы,        img: /qr/announce.svg }
  - { label: Общение,       img: /qr/chat.svg }
  - { label: Подать доклад, img: /qr/talk.svg }
---

<!-- 5. ТРИ QR — ГОТОВО. Контент задаётся во frontmatter (items) -->

---
layout: statement
---

<!-- 6. ПЕРЕХОД К СПИКЕРАМ — ГОТОВО -->

Спасибо<br>замечательным<br>спикерам

---
layout: speaker
name: Анастасия Мальцева
role: Frontend-разработчица
photo: /img/speakers/anastasiya-maltseva.jpg
tone: red
pitch: Соберёт одинаковые на вид интерфейсы с разной реализацией и проверит, как с ними справляются AI-агенты — по скриншоту и через accessibility tree
talk: 'Нажми кнопку, если сможешь: 10 интерфейсов против AI-агентов'
---

<!-- 7. СПИКЕР 1 — name / role / photo / pitch / talk во frontmatter -->

---
layout: speaker
name: Катя Панова
role: Дизайн-лид СберИнвестиций, академрук магистратуры ИТМО
photo: /img/speakers/katya-panova.jpg
tone: orange
pitch: Пройдёт по истории творческих профессий от античного архитектора до AI-дизайнера и попробует понять, куда движется дизайн сегодня
talk: 'От Витрувия до design-engineer: 2000 лет эволюции профессии'
---

<!-- 8. СПИКЕР 2 -->

---
layout: speaker
name: Дарья Егорова
role: Дизайн-директор UI/UX ЦЕХ, партнёр RDMI, руководитель программы «Дизайн и проектирование цифровых сервисов (UI/UX)» B&D
photo: /img/speakers/daria-egorova.jpg
tone: yellow
pitch: На примерах знакомых приложений разберёт механики вовлечения и покажет, как фронту и дизайну вместе делать сценарии, которыми приятно пользоваться
talk: 'Дофамин в интерфейсах: как устроено желание вернуться'
---

<!-- 9. СПИКЕР 3 -->

---
layout: speaker
name: Павел Алексеев
role: Композитор и дирижёр, член Союза композиторов
photo: /img/speakers/pavel-alekseev.jpg
tone: sky
pitch: Со старым патефоном разберёт, как Бах, Моцарт и Чайковский вставляли в музыку чужие и свои темы и почему цитата — не всегда плагиат
talk: 'Гиперссылка — не всегда плагиат, а иногда окно в другие миры и смыслы'
---

<!-- 10. СПИКЕР 4 -->

---
layout: qr-side
qr: /qr/questions.svg
title: Вопросы в наш чат в телеграме
---

<!-- 11. ВОПРОСЫ В ЧАТ — ГОТОВО -->

Добавьте хэштег **#вопрос_спикеру** и можно тегнуть спикера — ответит позже

---
layout: qr-trio
footer: Чат = бот = сайт
footerSub: на css.moscow появится кнопка «Вопрос спикеру», пользуйтесь
seed: 12
items:
  - { label: '#вопрос_спикеру',     img: /qr/questions.svg }
  - { label: '@MoscowCSS_bot',      img: /qr/bot.svg }
  - { label: css.moscow/question, img: /qr/question-form.svg }
---

<!-- 12. КАК ЗАДАТЬ ВОПРОС — ГОТОВО. Три равноценных пути: чат с #вопрос_спикеру, бот @MoscowCSS_bot («🎤 Вопрос спикеру» в меню),
     форма css.moscow/question. Бот и форма приходят организаторам в админского бота, модератор передаёт
     вопрос спикеру; спикеров митапа нужно заранее добавить в бота. Кнопка «Вопрос спикеру» на главной сайта
     видна с часа до начала до трёх часов после (website-2.0: apps/website/src/content/cta.ts) -->

---
layout: statement
---

<!-- 13. ГОТОВНОСТЬ — ГОТОВО -->

Вы готовы?

---
layout: statement
tags: ["оффлайн", "онлайн", "бесплатно"]
---

<!-- 14. СТАРТ — ГОТОВО -->

Мы начинаем
