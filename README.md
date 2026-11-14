# Шаблон презентаций митапа MoscowCSS

Старт и финал каждого митапа [MoscowCSS](https://css.moscow) на [Slidev](https://sli.dev):

- **старт** — [`open.md`](open.md): приветствие, партнёр, QR, спикеры, «Мы начинаем»;
- **финал** — [`close.md`](close.md): спасибо, партнёр, «Оцените митап», редакция.

Вёрстка живёт в теме [`theme/`](theme/README.md) в стиле сайта [css.moscow](https://css.moscow). На каждый митап меняется
только контент в `open.md` и `close.md`.

**Сайт со всеми митапами:** https://moscowcss-meetup.github.io/slidev-presa-template/

> Агенту — начни с [AGENTS.md](AGENTS.md): правила, порядок работы и проверки.

## Быстрый старт

```bash
pnpm install
pnpm dev            # старт (open.md) → http://localhost:3030
pnpm dev:close      # финал (close.md)
pnpm build          # сборка → dist/<номер>/{open,close} + лендинг dist/index.html
pnpm test:qr        # проверка генератора QR
```

## Карта репозитория

| Где | Что | Документация |
|-----|-----|--------------|
| [`open.md`](open.md), [`close.md`](close.md) | контент текущего митапа | [Слайды старта и финала](#слайды-старта-и-финала) |
| [`theme/`](theme/) | тема: layout'ы, компоненты, токены, шрифты, светлая/тёмная схема | [theme/README.md](theme/README.md) |
| [`scripts/`](scripts/) | сборка, архив прошлых митапов, генератор QR | [scripts/README.md](scripts/README.md) |
| [`public/`](public/) | QR-коды (пары тёмный/светлый), логотипы, фото | [public/README.md](public/README.md) |
| [`archive/`](archive/) | прошлые митапы: презентации и коммиты для сайта | [archive/README.md](archive/README.md) |
| [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | деплой на GitHub Pages при пуше в `master` | [Деплой и история](#деплой-и-история) |

## Подготовка нового митапа

На примере перехода с 32 на 33:

1. **Сохранить историю.** Добавьте в [`archive/meetups.json`](archive/meetups.json) строку
   `"32": "<sha последнего коммита 32-го>"` (`git rev-parse HEAD`), скопируйте `open.md` →
   `archive/32.md` и `close.md` → `archive/32-close.md`. Подробнее — в [archive/README.md](archive/README.md).
2. **Сменить номер:** `"meetup": "33"` в [`package.json`](package.json).
3. **Собрать данные с сайта.** Митап, доклады, спикеры и партнёры лежат в репо css.moscow:
   `packages/content/src/{events,talks,speakers,partners}`.
4. **Обновить контент** по таблицам ниже: обложку, партнёра, спикеров, форму «Оцените митап».
5. **Сгенерировать QR** партнёра и формы обратной связи. Генератор сразу пишет пару для тёмной
   и светлой схемы:
   ```bash
   pnpm qr https://t.me/partner partner --logo-svg public/logos/partner.svg
   pnpm qr https://forms.yandex.ru/u/<id>/ rate-33
   ```
   Подробнее — в [scripts/README.md → QR](scripts/README.md#генератор-qr-кодов).
6. **Проверить:** `pnpm dev` и `pnpm dev:close` — каждый слайд влезает, QR читается телефоном.
7. **Запушить в `master`** — сайт обновится сам.

## Слайды старта и финала

Всё редактируется во frontmatter слайда (между `---`). Поля каждого layout'а с примерами —
в [theme/README.md](theme/README.md#layoutы).

### Старт — `open.md`

| # | Layout | Слайд | Что менять |
|---|--------|-------|-----------|
| 1 | [`cover`](theme/README.md#cover) | Обложка | `badge`, `date`, `time`, `tags`, `meetup` и номер `**33**` |
| 2 | [`statement`](theme/README.md#statement) | «Приветствуем на N митапе» | номер |
| 3 | [`qr-side`](theme/README.md#qr-side) | Спасибо партнёру | `qr`, `title`, текст |
| 4 | [`qr-trio`](theme/README.md#qr-trio) | Анонсы / общение / подать доклад | не меняется |
| 5 | `statement` | «Спасибо замечательным спикерам» | не меняется |
| 6+ | [`speaker`](theme/README.md#speaker) | Спикер, по слайду на доклад | `name`, `role`, `photo`, `pitch`, `talk`, `tone` |
| | [`logo-side`](theme/README.md#logo-side) | Активность | `title` и текст |
| | `qr-side` | Вопросы в чат `#вопрос_спикеру` | не меняется |
| | `statement` ×2 | «Вы готовы?» / «Мы начинаем» | не меняется |

### Финал — `close.md`

| # | Layout | Слайд | Что менять |
|---|--------|-------|-----------|
| 1 | `statement` | «Спасибо» | не меняется |
| 2 | `qr-side` | Спасибо партнёру | `qr`, `title`, текст |
| 3 | `qr-side` | «Подавайте доклад» | не меняется |
| 4 | `qr-side` | «Оцените митап» | **QR формы — каждый митап** |
| 5 | `qr-side` | BeerJS Moscow | не меняется |
| 6 | [`photo-grid`](theme/README.md#photo-grid) | «Наша редакция» | `images` из `public/img/team/` |
| 7 | `statement` + `note` | «Go пить ПИВО¹» | не меняется |

Ещё есть [`full-image`](theme/README.md#full-image): фото в край слайда, например со стенда на
конференции.

## Светлая и тёмная схема

Старт и финал стоят в `colorSchema: auto` (headmatter `open.md`/`close.md`): дек открывается в
схеме системы, а кнопкой Slidev её можно переключить, если в зале светлее или темнее, чем
ожидали. Чтобы закрепить одну схему, поставьте `dark` или `light`. Для QR ничего делать не
нужно: во frontmatter указывается тёмный файл, а в светлой схеме тема сама берёт его пару
`-light.svg`, поэтому каждый QR в `public/qr/` должен быть парой. Подробнее — в
[theme/README.md → Светлая и тёмная схема](theme/README.md#светлая-и-тёмная-схема).

## Деплой и история

При пуше в `master` [workflow](.github/workflows/pages.yml) собирает сайт и публикует его на
GitHub Pages:

1. `pnpm build:archive` пересобирает прошлые митапы из **их собственных коммитов** по
   [`archive/meetups.json`](archive/meetups.json), поэтому история выглядит ровно как тогда;
2. `pnpm build` собирает текущий митап и лендинг со списком всех митапов.

```
dist/index.html      ← лендинг: все митапы со ссылками
dist/32/open/        ← старт митапа 32 (самодостаточный сайт, hash-роутинг)
dist/32/close/       ← финал
dist/31/...          ← прошлые митапы из archive/meetups.json
```

Номер текущего митапа берётся из `"meetup"` в `package.json`, из аргумента (`pnpm build 33`)
или из env (`MEETUP=33 pnpm build`). Каждая папка `dist/<N>/<deck>` открывается из любого пути и
даже как файл:

```bash
cd dist/32/open && python3 -m http.server   # → http://localhost:8000
```

## Экспорт в PDF

```bash
pnpm add -D playwright-chromium && pnpm exec playwright install chromium
pnpm export          # open.pdf
pnpm export:close    # close.pdf
```

Без Playwright: `pnpm dev` → `http://localhost:3030/export/` и печать в PDF из браузера.
