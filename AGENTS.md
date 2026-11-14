# AGENTS.md — шаблон презентаций MoscowCSS

Ориентир для агента. Человеческая документация: [README.md](README.md) и README в каждой папке.

## Что это

Старт ([`open.md`](open.md)) и финал ([`close.md`](close.md)) каждого митапа MoscowCSS на Slidev.
Тема — в [`theme/`](theme/README.md). Пуш в `master` публикует сайт на GitHub Pages:
https://moscowcss-meetup.github.io/slidev-presa-template/. Язык контента и документации — русский.

## Где что

| Задача | Куда смотреть |
|--------|---------------|
| Поменять контент митапа | `open.md`, `close.md`; поля layout'ов — [theme/README.md](theme/README.md#layoutы) |
| Новый митап | [README.md → Подготовка нового митапа](README.md#подготовка-нового-митапа) |
| QR-код | [scripts/README.md → Генератор QR](scripts/README.md#генератор-qr-кодов), каталог ссылок — [public/README.md](public/README.md#qr-коды) |
| Вёрстка, цвета, схемы | [theme/README.md](theme/README.md) |
| Сборка, архив, деплой | [scripts/README.md](scripts/README.md), [archive/README.md](archive/README.md) |
| Данные митапа (даты, доклады, спикеры, партнёры) | репо css.moscow: `packages/content/src/{events,talks,speakers,partners}` |

## Правила

1. **Тема — копия.** Источник `slidev-theme-moscowcss` живёт в репо докладов
   (`speech-and-reports/slidev-theme-moscowcss`). Правку темы делаем в обоих местах так, чтобы
   `diff -r` показал только `package.json` и `README.md`.
2. **QR всегда парой.** `<имя>.svg` для тёмной схемы и `<имя>-light.svg` для светлой. Генерировать
   только через `pnpm qr`, вручную не рисовать. Во frontmatter пишем тёмный файл.
3. **Поверх QR ничего не кладём:** стикер или декор на углу закрывает маркер, и код не читается.
   Вокруг кода должно оставаться поле не меньше 4 модулей; генератор его уже закладывает.
4. **История не переписывается.** Прошлые митапы собираются из коммитов в
   [`archive/meetups.json`](archive/meetups.json). Старые коммиты не трогаем, на `master` не
   делаем force-push.
5. **Фото реальных людей не используем как заглушку.** Если спикер ещё секрет, оставляем слайд
   `speaker` без `photo`: тема покажет восьмиугольник с «?».
6. Текст на слайде не мельче `1rem`. Если не влезает — сокращаем, а не уменьшаем шрифт.

## Проверка перед пушем

```bash
pnpm test:qr                 # структура QR (+ декод, если стоит zbarimg)
pnpm build                   # оба дека текущего митапа собираются
pnpm build:archive           # прошлые митапы собираются из своих коммитов (долго)
```

Затем `pnpm dev`: каждый слайд влезает в 980×551 и каждый новый QR читается. Без телефона
распознаём декодером, например `zxing-cpp` по скриншоту слайда. После пуша убедиться, что
workflow «Deploy to GitHub Pages» зелёный, а `/<N>/open/` и `/<N>/close/` отвечают 200.
