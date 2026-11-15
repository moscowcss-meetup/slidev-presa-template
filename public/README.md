# public/

[← к README](../README.md)

Всё отсюда доступно в деке по пути от корня: `public/qr/chat.svg` → `/qr/chat.svg`.

```
logo.svg          ← башенка MoscowCSS: центр QR по умолчанию
logos/            ← логотипы партнёров для QR (--logo-svg)
qr/               ← QR-коды парами: <имя>.svg (тёмная схема) + <имя>-light.svg (светлая)
img/speakers/     ← фото спикеров: <slug-с-сайта>.jpg
img/team/         ← фото редакции для photo-grid
img/              ← прочее: фото со стенда и т.п.
```

## QR-коды

Генерируются только через `pnpm qr` — команды в [scripts/README.md](../scripts/README.md#генератор-qr-кодов).
Во frontmatter указываем тёмный файл, светлую пару тема подставит сама
([theme/README.md](../theme/README.md#qr-в-двух-схемах)).

| Файл (+ `-light.svg`) | Ведёт на | Где | Перегенерировать |
|------|----------|-----|------------------|
| `announce.svg` | https://t.me/moscowcss | старт: «Анонсы» | `pnpm qr https://t.me/moscowcss announce` |
| `chat.svg` | https://t.me/moscowcss_chat | старт: «Общение» | `pnpm qr https://t.me/moscowcss_chat chat` |
| `questions.svg` | https://t.me/moscowcss_chat | старт: «Вопросы в чат» | `pnpm qr https://t.me/moscowcss_chat questions` |
| `question-form.svg` | https://css.moscow/question/ | старт: «Нет телеграма? Спросите через сайт» (форма вопроса спикеру, приходит в бота) | `pnpm qr https://css.moscow/question/ question-form` |
| `talk.svg` | https://css.moscow/cfp/ | старт и финал: «Подать доклад» (форма заявки на сайте, заявки приходят в бота) | `pnpm qr https://css.moscow/cfp/ talk` |
| `school21.svg` | https://t.me/school21sber | партнёр 32, логотип «21» | `pnpm qr https://t.me/school21sber school21 --logo-svg public/logos/school21.svg` |
| `forms.yandex.ru-u-6a4eae811f1eb545dd30bd09.svg` | https://forms.yandex.ru/u/6a4eae811f1eb545dd30bd09 | финал: «Оцените митап» (форма 31) | `pnpm qr <ссылка формы> rate-<N>` |
| `beerjs.svg` | https://t.me/beerjs_moscow | финал: BeerJS Moscow | `pnpm qr https://t.me/beerjs_moscow beerjs` |
| `zvuk.svg` | https://t.me/+vMFpP57vgRQzMmFi | партнёр 31 (Звук Tech) | `pnpm qr <ссылка> zvuk` |
| `rate.svg` | https://forms.yandex.ru/u/6a1210eef47e73ed24b39927/ | не используется | — |

Ссылки в таблице получены декодированием самих файлов, так что это фактический адрес, а не
задуманный. Не используются и в деках не нужны: `__qrtest.svg` (остался от теста) и `*.png`
(растровые версии старых QR).

## Логотипы партнёров

Берём из репо css.moscow: `packages/content/src/partners/assets/<партнёр>.svg`, лучше белый
на прозрачном. Для светлой схемы генератор перекрасит белое в тёмное сам.

| Файл | Партнёр |
|------|---------|
| `logos/school21.svg` | Школа 21 |

## Фото

- **Спикеры** — `img/speakers/<slug>.jpg`, файл из `packages/content/src/speakers/assets` репо
  css.moscow, slug как на сайте. Фото обрезается восьмиугольником, лицо держите по центру.
- **Редакция** — `img/team/*.jpg`, квадратные.
- `img/speaker-*.{jpg,png}` и `img/speaker-placeholder.png` — фото спикеров 31-го митапа.
  Текущие деки их не используют; архивная сборка берёт файлы из своего коммита, поэтому их
  можно удалить. **Не используйте `speaker-placeholder.png` как заглушку** — это фото реального
  человека. Для спикера-секрета уберите `photo`.
