# Шаблон презентаций митапа MoscowCSS

Две презентации митапа на [Slidev](https://sli.dev), выделенные из `Moscow_open.pdf` /
`Moscow_close.pdf`:

- **старт** — `open.md` (открытие: приветствие, спикеры, QR);
- **финал** — `close.md` (закрытие: спасибо, оцените митап, редакция).

Вся вёрстка — в теме `./theme` (slidev-theme-moscowcss: токены, шрифты и фирменные формы
[css.moscow](https://css.moscow)); на каждый митап меняется только контент в `open.md` /
`close.md`, дизайн остаётся неизменным.

## Запуск

```bash
pnpm install
pnpm dev            # старт (open.md), live-reload → http://localhost:3030
pnpm dev:close      # финал (close.md)
pnpm build          # сборка старта и финала в dist/<номер>/{open,close}
pnpm build 32       # то же для митапа 32
```

## Сборка митапов

`pnpm build` собирает оба дека в папки по номеру митапа:

```
dist/31/open/     ← старт митапа №31 (самодостаточный сайт)
dist/31/close/    ← финал митапа №31
```

Номер берётся из поля `"meetup"` в `package.json` (сейчас `32`), либо из аргумента
(`pnpm build 32`), либо из env (`MEETUP=33 pnpm build`). Для следующего митапа: правите
контент в `open.md`/`close.md`, меняете `meetup` на 32 — и `pnpm build` кладёт всё в `dist/32/…`.

**История на сайте.** Прошлые митапы не пропадают с GitHub Pages: `pnpm build:archive`
пересобирает каждый из своего коммита по `archive/meetups.json` (`"номер": "sha"`) — со своими
layout'ами и темой, ровно как тогда. CI запускает его перед `pnpm build`. **Перед переходом к
следующему митапу** допишите в `archive/meetups.json` номер текущего и sha его последнего
коммита (`git rev-parse HEAD`), скопируйте `open.md`/`close.md` в `archive/` — и правьте контент.

**Показ/деплой:** каждая папка `dist/<N>/<deck>` — самодостаточный сайт, отдаётся **из своего
корня** (hash-роутинг, работает под любым путём и даже при открытии файла). Локально:

```bash
cd dist/31/open && python3 -m http.server   # → http://localhost:8000
```

## Структура

```
open.md           ← старт: открывающий дек (правят на каждый митап)
close.md          ← финал: закрывающий дек
archive/<N>.md    ← деки прошлых митапов (перед новым митапом копируем сюда open/close)
theme/            ← тема: layouts/, components/, styles/ (токены), fonts/, utils/
scripts/          ← build.mjs (сборка), gen-qr.mjs (генератор QR)
public/
  logo.svg        ← логотип-башенка (вектор)
  qr/             ← QR-коды (SVG)
  img/            ← фото стенда; img/speakers/ — спикеры; img/team/ — фото редакции
```

### Layouts

`cover` (герой css.moscow: куча плашек, вордмарк, стикер) · `statement` (+ опц. `note:`
сноска, `tags:` куча плашек) · `qr-side` · `qr-trio` · `speaker` · `logo-side` (звезда
Moscow CSS) · `full-image` (фото в край) · `photo-grid` (сетка фото в восьмиугольниках).
Плюс общие `default`, `section`, `end`.

Компоненты темы, доступные прямо в markdown: `<Pill>`, `<PillPile>` (падающая куча плашек),
`<Octagon>` (стикер или фото в рамке), `<Stat>`, `<Snowfall>`, `<StarMark>`.

## Старт — открывающий дек (`open.md`)

| Layout | Слайд | Правка |
|--------|-------|--------|
| `cover` | Обложка | `badge`, `date`, `time`, `tags` во frontmatter + номер `**32**` |
| `statement` | Приветствие | номер |
| `qr-side` | Спонсор/площадка | под партнёра |
| `qr-trio` | Три QR (анонсы/чат/доклад) | не меняется |
| `statement` | «Спасибо спикерам» | не меняется |
| `speaker` ×N | Спикеры | заполнить каждого |
| `logo-side` | Активность/анонс | текст |
| `qr-side` | Вопросы в чат | не меняется |
| `statement` ×2 | «Вы готовы?» / «Мы начинаем» | не меняется |

## Финал — закрывающий дек (`close.md`)

| Layout | Слайд | Правка |
|--------|-------|--------|
| `statement` | «Спасибо» | не меняется |
| `qr-side` | Спонсор | под партнёра |
| `qr-side` | «Подавайте доклад» | не меняется |
| `qr-side` | «Оцените митап» | QR формы обратной связи — каждый митап |
| `statement` | «Стендил на …» | конференция |
| `full-image` | Фото со стенда | `public/img/holyjs.jpg` |
| `statement` | «Знакомиться заново» | не меняется |
| `photo-grid` | «Наша редакция» | сетка `public/img/team/` |
| `statement` + note | «Go пить ПИВО¹» | не меняется |

## Как менять контент

Всё редактируется во frontmatter слайда (между `---`).

**Спикер** (`speaker`): `name`, `role`, `photo` (в `public/img/speakers/`), `pitch`, `talk`
(без кавычек — «ёлочки» добавит шаблон), `tone` — цвет рамки (`red`/`orange`/`yellow`/`sky`/
`blue`/`green`). Без `photo` — восьмиугольник с «?» (спикер ещё секрет). Данные берём из
контента сайта: `packages/content/src/{events,talks,speakers}` репо css.moscow.

**Крупная фраза** (`statement`): текст в теле слайда, перенос `<br>`, красный акцент
`[текст]{.accent}`, опциональная сноска — `note:`, куча плашек в углу — `tags:`.

**QR сбоку** (`qr-side`): `qr:` — путь к SVG, `title:` — заголовок, тело — описание.

**Сетка фото** (`photo-grid`): `title:` + `images:` (список путей), `cols:` (по умолчанию 4).

## Генератор QR-кодов

QR в фирменном стиле (белые кружки, кольцевые «глазки», логотип-башенка, тёмный фон) — в SVG:

```bash
pnpm qr <url> [имя]
pnpm qr https://css.moscow site        # → public/qr/site.svg
```

Флаги: `--out путь.svg`, `--bg none` (прозрачный), `--no-logo`, `--fg #ffffff`, `--logo 0.24`.
Коррекция ошибок **H** (30%) — логотип по центру не мешает сканированию. QR светлый-на-тёмном
(как оригиналы), телефоны читают. Проверка: `pnpm test:qr` (декод через zbarimg).

## Дизайн-токены (`theme/styles/tokens.css`)

Токены и шрифты — из дизайн-системы css.moscow (`@moscowcss/design-system`, `@moscowcss/fonts`).
Дек в тёмной схеме (`colorSchema: dark`), тема поддерживает и светлую.

| Токен | Тёмная | Назначение |
|-------|--------|------------|
| `--mc-bg` | `#23252b` графит | фон |
| `--mc-text` | `#ecebe6` paper | текст |
| `--mc-muted` | `#a6a8b0` | подписи, роли |
| `--mc-accent` | `#9aa5ff` | дата, логотип, ссылки |
| `--mc-red` | `#f05133` | акцент `.accent`, `**32**` в обложке |
| `--mc-tone-*` | sky / blue / yellow / red / orange / green | плашки и рамки |

Шрифты лежат в `theme/fonts`, без CDN: **Jost** — вордмарк и крупные фразы, **Montserrat** —
заголовки, **Golos Text** — текст, **JetBrains Mono** — плашки и подписи.

## Экспорт в PDF

```bash
pnpm add -D playwright-chromium && pnpm exec playwright install chromium
pnpm export          # open.pdf
pnpm export:close    # close.pdf
```

Без Playwright: `pnpm dev` → `http://localhost:3030/export/` и печать в PDF из браузера.
