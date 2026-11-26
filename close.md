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

<!-- ГОТОВЫЕ (не меняются): 1, 3, 4, 5, 6, 8 · МЕНЯЮТСЯ: 2, 7 -->
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
layout: qr-trio
footer: Сайт = бот
footerSub: QR бота сразу открывает заявку на доклад
seed: 3
items:
  - { label: css.moscow/cfp,  img: /qr/talk.svg }
  - { label: '@MoscowCSS_bot', img: /qr/bot-cfp.svg }
---

<!-- 4. ЗАЯВКА: САЙТ = БОТ — ГОТОВО. Два равноценных пути: форма css.moscow/cfp и бот. QR бота ведёт на
     https://t.me/MoscowCSS_bot?start=cfp: бот по /start cfp сразу начинает заявку (moscowcss-bot: apps/bot/src/bot.ts) -->

---
layout: qr-side
qr: /qr/feedback.svg
title: Оцените митап
---

<!-- 5. ОЦЕНИТЕ МИТАП — ГОТОВО. QR ведёт на css.moscow/feedback: форма сама показывает текущий митап и его спикеров
     (отзывы принимаются с начала митапа и 4 дня после), отзывы приходят в бота. Перегенерировать к митапу не нужно -->

Мы хотим стать лучше для вас, а спикеры хотят узнать, как вам их доклад и подача.

Вся обратная связь анонимная и честная.

Давайте делать наш митап и доклады лучше.

---
layout: qr-trio
footer: Сайт = бот
footerSub: в боте нажмите «💬 Обратная связь», отзыв анонимный
seed: 4
items:
  - { label: css.moscow/feedback, img: /qr/feedback.svg }
  - { label: '@MoscowCSS_bot',      img: /qr/bot.svg }
---

<!-- 6. ОТЗЫВ: САЙТ = БОТ — ГОТОВО. Два равноценных пути: форма css.moscow/feedback и бот @MoscowCSS_bot
     («💬 Обратная связь» в меню). Окно отзывов одно на оба пути и задаётся в боте (moscowcss-bot:
     packages/core/src/core.ts, FEEDBACK_WINDOW): с начала митапа до 4 дней после. Спикеров митапа нужно
     заранее добавить в бота, иначе в отзыве не будет их оценок -->

---
layout: photo-grid
title: Наша редакция
images:
  - { src: /img/team/alyona-laskina.png, name: Алёна Ласкина }
  - { src: /img/team/darina-pairel.png,  name: Дарина Паирель }
  - { src: /img/team/egor-levchenko.png, name: Егор Левченко }
  - { src: /img/team/elena-virtanen.png, name: Елена Виртанен }
  - { src: /img/team/inna-chernyshova.png, name: Инна Чернышова }
  - { src: /img/team/katya-panova.png,   name: Катя Панова }
  - { name: Таинственный молодец }
  - { src: /img/team/roman-troitsky.png, name: Роман Троицкий }
---

<!-- 7. НАША РЕДАКЦИЯ — организаторы с css.moscow (website-2.0: packages/content/src/organizers, status: current,
     порядок как на сайте — по slug). Фото — копии organizers/assets в public/img/team/<slug>.png.
     Без src — восьмиугольник с «?», как у таинственных организаторов на сайте -->

---
layout: statement
---

<!-- 8. ФИНАЛ — ГОТОВО -->

Идём общаться<br>в неформальной<br>обстановке!)
