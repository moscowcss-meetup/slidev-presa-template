---
# Закрывающий дек митапа MoscowCSS. Тема (вёрстка, токены, шрифты css.moscow) — та же ./theme.
theme: ./theme
title: MoscowCSS Meetup — закрытие
mdc: true
colorSchema: auto
transition: fade
# hash-роутинг — чтобы собранный дек работал под любым subpath (dist/<N>/close) без SPA-fallback
routerMode: hash
layout: statement
---

<!-- ГОТОВЫЕ (не меняются): 1, 3, 4, 7, 8, 9 · МЕНЯЮТСЯ: 2, 5, 6 -->
<!-- 1. СПАСИБО — ГОТОВО -->

Спасибо

---
layout: qr-side
qr: /qr/school21.svg
title: Спасибо Школе 21 за это
---

<!-- 2. СПОНСОР/ПЛОЩАДКА — меняется под партнёра -->

Бесплатная школа цифровых технологий от Сбера. Подписывайтесь на телеграм-канал **@school21sber**!

---
layout: qr-side
qr: /qr/talk.svg
title: Подавайте доклад
---

<!-- 3. ПОДАТЬ ДОКЛАД — ГОТОВО. QR ведёт на форму заявки на сайте: css.moscow/cfp -->

Форма заявки на **css.moscow/cfp**. Выступаете впервые — поможем с темой, структурой и прогоном

---
layout: qr-side
qr: /qr/feedback.svg
title: Оцените митап
---

<!-- 4. ОЦЕНИТЕ МИТАП — ГОТОВО. QR ведёт на css.moscow/feedback: форма сама показывает текущий митап и его спикеров
     (митап текущий с начала и 7 дней после), отзывы приходят в бота. Перегенерировать к митапу не нужно -->

Мы хотим стать лучше для вас, а спикеры хотят узнать, как вам их доклад и подача.

Вся обратная связь анонимная и честная.

Давайте делать наш митап и доклады лучше.

---
layout: qr-side
qr: /qr/beerjs.svg
title: BeerJS Moscow
---

<!-- ПОСЛЕ ОБРАТНОЙ СВЯЗИ — QR на телеграм BeerJS Moscow -->

Собираемся после митапов пообщаться поближе!)

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
