---
# Закрывающий дек митапа MoscowCSS. Тема/вёрстка — те же style.css + layouts/*.vue.
theme: default
title: MoscowCSS Meetup — закрытие
fonts:
  sans: Montserrat
  weights: '400,500,600,700,800'
  fallbacks: true
mdc: true
colorSchema: dark
transition: fade
# hash-роутинг — чтобы собранный дек работал под любым subpath (dist/<N>/close) без SPA-fallback
routerMode: hash
layout: statement
---

<!-- ГОТОВЫЕ (не меняются): 1, 3, 7, 8, 9 · МЕНЯЮТСЯ: 2, 4, 5, 6 -->
<!-- 1. СПАСИБО — ГОТОВО -->

Спасибо

---
layout: qr-side
qr: /qr/zvuk.svg
title: Спасибо Звуку за это
---

<!-- 2. СПОНСОР/ПЛОЩАДКА — меняется под партнёра -->

Подпишитесь на телеграм-канал Звук Tech, чтобы узнать больше о внутрянке разработки,
карьерных треках и вакансиях!

---
layout: qr-side
qr: /qr/talk.svg
title: Подавайте доклад
---

<!-- 3. ПОДАТЬ ДОКЛАД — ГОТОВО -->

Заполняйте форму, делитесь знаниями

---
layout: qr-side
qr: /qr/forms.yandex.ru-u-6a4eae811f1eb545dd30bd09.svg
title: Оцените митап
---

<!-- 4. ОЦЕНИТЕ МИТАП — QR формы обратной связи меняется каждый митап (pnpm qr <url> rate) -->

Мы хотим стать лучше для вас, а спикеры хотят узнать, как вам их доклад и подача.

Вся обратная связь анонимная и честная.

Давайте делать наш митап и доклады лучше.

---
layout: photo-grid
title: Наша редакция
images:
  - /img/team/1.jpg
  - /img/team/2.jpg
  - /img/team/3.jpg
  - /img/team/4.jpg
  - /img/team/5.jpg
  - /img/team/6.jpg
  - /img/team/7.jpg
  - /img/team/8.jpg
---

<!-- 8. НАША РЕДАКЦИЯ — сетка фото команды (public/img/team/) -->

---
layout: statement
note: ¹ сноска про вредность алкоголя
---

<!-- 9. ФИНАЛ — ГОТОВО -->

Go пить ПИВО¹
