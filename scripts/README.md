# scripts/

[← к README](../README.md)

| Скрипт | Команда | Что делает |
|--------|---------|------------|
| [`build.mjs`](build.mjs) | `pnpm build [N]` | собирает старт и финал митапа N в `dist/N/{open,close}` + лендинг `dist/index.html` |
| [`build-archive.mjs`](build-archive.mjs) | `pnpm build:archive [N]` | пересобирает прошлые митапы из их коммитов ([archive/README.md](../archive/README.md)) |
| [`gen-qr.mjs`](gen-qr.mjs) | `pnpm qr …` | фирменные QR-коды, парами для тёмной и светлой схемы |
| [`qr-theme.mjs`](qr-theme.mjs) | — | темы QR и перекраска; общий модуль генератора |
| [`gen-qr.test.mjs`](gen-qr.test.mjs) | `pnpm test:qr` | тесты генератора |

## Сборка

```bash
pnpm build             # митап из "meetup" в package.json
pnpm build 33          # явный номер
MEETUP=33 pnpm build   # то же через env
```

Каждый дек собирается с `--base ./` и hash-роутингом, поэтому `dist/N/open` работает из любого
пути: на GitHub Pages, локально и при открытии файла. Лендинг перечисляет все `dist/<N>/`,
которые есть на момент сборки, в том числе собранные `build:archive`.

## Архив прошлых митапов

```bash
pnpm build:archive       # все митапы из archive/meetups.json, кроме текущего
pnpm build:archive 31    # только 31
```

Для каждого митапа скрипт делает `git worktree` на его коммит, ставит зависимости по lockfile
того коммита, запускает `build.mjs` того коммита и копирует `dist/N` к себе. Нужна полная
история git; в CI это `fetch-depth: 0`. Запускать **до** `pnpm build`, чтобы лендинг увидел
архивные номера. Как добавить митап в архив — в [archive/README.md](../archive/README.md).

## Генератор QR-кодов

Фирменный стиль: кружки-модули, кольцевые «глазки», логотип по центру. Коррекция ошибок **H**
(30%), поэтому логотип не мешает сканированию. Поле вокруг кода — 4 модуля, по стандарту.

### Основные команды

```bash
# Пара для тёмной и светлой схемы → public/qr/site.svg + public/qr/site-light.svg
pnpm qr https://css.moscow site

# С логотипом партнёра вместо башенки
pnpm qr https://t.me/school21sber school21 --logo-svg public/logos/school21.svg

# Светлые пары к готовым тёмным QR (URL не нужен; уже светлые пропускаются)
pnpm qr --light-from public/qr/chat.svg public/qr/talk.svg
pnpm qr --light-from public/qr/*.svg

# Один файл: только одна схема или свой путь
pnpm qr https://css.moscow site --theme light          # → public/qr/site-light.svg
pnpm qr https://css.moscow --out tmp/site.svg          # dark, если --theme не задана
```

После генерации добавьте строку в [каталог QR](../public/README.md#qr-коды).

### Флаги

| Флаг | По умолчанию | Что делает |
|------|--------------|------------|
| `<url> [имя]` | имя из URL | ссылка и имя файла в `public/qr/` |
| `--theme dark\|light` | обе | только одна схема |
| `--logo-svg путь.svg` | башенка `public/logo.svg` | логотип партнёра в центре |
| `--no-logo` | — | без логотипа |
| `--out путь.svg` | — | один файл по своему пути |
| `--light-from файлы…` | — | светлая версия из тёмного SVG, рядом с ним |
| `--fg #цвет` / `--bg #цвет\|none` | из темы | свои цвета модулей и фона; `none` — прозрачный фон |
| `--logo 0.24` | `0.24` | доля стороны QR под логотип |
| `--cell 10` | `10` | px на модуль в SVG |

### Темы

| Тема | Модули | Фон | Логотип |
|------|--------|-----|---------|
| `dark` → `<имя>.svg` | `#ffffff` | `#121212` | как есть |
| `light` → `<имя>-light.svg` | `#121212` | `#ffffff` | белое → `#121212`, тёмная подложка → белый, цветное (красное «CSS») не трогаем |

`currentColor` в логотипе всегда становится цветом модулей. Логотип партнёра — любой SVG с
`viewBox`; удобнее всего белый на прозрачном, как логотипы в
`packages/content/src/partners/assets` репо css.moscow. Кладём их в [`public/logos/`](../public/logos/).

`--light-from` даёт **тот же** файл, что `--theme light` для той же ссылки (это проверяется в
тестах), поэтому светлую пару к старому QR можно сделать без URL.

### Проверка QR

```bash
pnpm test:qr
```

Проверяет структуру SVG, темы, перекраску логотипов, соответствие `--light-from` и
`--theme light`, а также ошибки аргументов. Если установлены `rsvg-convert`, `convert` и
`zbarimg`, ещё и декодирует коды; иначе пишет «декодинг пропущен». Перед митапом
отсканируйте каждый новый QR телефоном с экрана.
