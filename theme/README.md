# slidev-theme-moscowcss

Тема [Slidev](https://sli.dev) в стиле [css.moscow](https://css.moscow): токены и шрифты из
дизайн-системы сайта (`@moscowcss/design-system`, `@moscowcss/fonts`), фирменные формы — куча
наклонённых плашек, восьмиугольники, пунктирные заголовки, звезда, снежинки.

**Где живёт:** источник — `speech-and-reports/slidev-theme-moscowcss`, копия — `theme/` в
[slidev-presa-template](https://github.com/moscowcss-meetup/slidev-presa-template) (старт и финал
митапов). Правку вносим в обе копии; отличаться могут только `package.json` и этот README.

## Подключение

```md
---
theme: ./theme                # в шаблоне митапов
# theme: ../slidev-theme-moscowcss   # в репо докладов
colorSchema: dark             # dark | light | auto — см. «Светлая и тёмная схема»
---
```

## Содержимое

```
layouts/      ← вёрстки слайдов (таблица ниже)
components/   ← Pill, PillPile, Octagon, Stat, Snowfall, StarMark (+ McFooter, внутренний)
styles/       ← tokens.css (цвета обеих схем), base.css, layouts.css, meetup.css, fonts.css
utils/        ← asset.ts (пути под base и пары QR), pile.ts (раскладка кучи плашек)
fonts/        ← Jost, Montserrat, Golos Text, JetBrains Mono — локально, без CDN
```

## Layout'ы

Поля задаются во frontmatter слайда. Тело слайда (markdown) — это слот.

| Layout | Для чего | Поля |
|--------|----------|------|
| [`cover`](#cover) | обложка | `meetup`, `badge`, `date`, `time`, `tags`, `seed`, `sticker`, `wordmark`, `snow` |
| `default` | обычный слайд | `kicker` (моно-пометка справа сверху), `snow` |
| `section` | разделитель актов | `num`, `tags`, `seed`, `snow` |
| [`statement`](#statement) | крупная фраза | `note`, `tags`, `seed`, `snow` |
| [`qr-side`](#qr-side) | QR + заголовок и текст | `qr`, `title` |
| [`qr-trio`](#qr-trio) | три QR в ряд | `items`, `footer`, `footerSub`, `seed` |
| [`speaker`](#speaker) | спикер | `name`, `role`, `photo`, `pitch`, `talk`, `tone` |
| [`logo-side`](#logo-side) | анонс со звездой | `title`, `snow` |
| [`full-image`](#full-image) | фото в край | `image` |
| [`photo-grid`](#photo-grid) | сетка фото | `title`, `images`, `cols`, `seed` |
| `end` | финал доклада с QR | `qr`, `qrCaption`, `sticker`, `snow` |

`seed` — число, от которого зависят цвета и наклоны плашек: одна и та же куча выглядит
одинаково в dev, сборке и PDF. Поменяйте `seed`, если раскладка не нравится.

### cover

```md
---
layout: cover
meetup: в Школе 21            # правый верхний угол
badge: 32 митап               # пунктирный бейдж слева
date: 26 ноября 2026
time: в 19:00
tags: ["css", "ai-агенты", "#вопрос_спикеру"]   # куча плашек, падает при входе на слайд
sticker: "position:\nв зале"  # восьмиугольник; \n — перенос
---

.MoscowCSS:ntn-child(**32**)

/ оффлайн / онлайн / бесплатно
```

### statement

```md
---
layout: statement
note: ¹ сноска мелким шрифтом      # необязательно
tags: ["оффлайн", "онлайн"]        # необязательно: куча плашек в углу
---

Приветствуем<br>на 32 [митапе]{.accent}
```

### qr-side

```md
---
layout: qr-side
qr: /qr/school21.svg          # тёмный файл; в светлой схеме тема возьмёт school21-light.svg
title: Спасибо Школе 21 за это
---

Подписывайтесь на телеграм-канал **@school21sber**!   <!-- **…** — жёлтая подсветка -->
```

### qr-trio

```md
---
layout: qr-trio
footer: css.moscow
footerSub: наш сайт
items:
  - { label: Анонсы,  img: /qr/announce.svg }
  - { label: Общение, img: /qr/chat.svg }
  - { label: Подать доклад, img: /qr/talk.svg }
---
```

### speaker

```md
---
layout: speaker
name: Дарья Егорова
role: Дизайн-директор UI/UX
photo: /img/speakers/daria-egorova.jpg   # без photo — восьмиугольник с «?» (спикер — секрет)
tone: orange                             # рамка: red | orange | yellow | sky | blue | green
pitch: О чём доклад, одним-двумя предложениями
talk: 'Дофамин в интерфейсах'            # без кавычек-ёлочек, их добавит тема
---
```

### logo-side

```md
---
layout: logo-side
title: Секретная активность
---

В **20:50** — подробности в перерыве
```

### full-image

```md
---
layout: full-image
image: /img/holyjs.jpg
---

Подпись плашкой снизу (необязательно)
```

### photo-grid

```md
---
layout: photo-grid
title: Наша редакция
cols: 4
images:
  - /img/team/1.jpg
  - /img/team/2.jpg
---
```

## Компоненты

Доступны прямо в markdown любого слайда.

| Компонент | Пропсы | Пример |
|-----------|--------|--------|
| `Pill` | `tone`, `tilt` | `<Pill tone="yellow" :tilt="-3">19:00</Pill>` |
| `PillPile` | `tags`, `seed` | `<PillPile :seed="3" :tags="['html', 'css', 'a11y']" />` |
| `Octagon` | `size`, `tone`, `src`, `alt`, `tilt` | `<Octagon size="9rem">display:<br>community;</Octagon>` |
| `Stat` | `value`, `label`, `tone`, `tilt` | `<Stat value="108" label="докладов" tone="sky" />` |
| `Snowfall` | `count`, `seed` | `<Snowfall :count="8" />` |
| `StarMark` | `size`, `tilt` | `<StarMark size="10rem" :tilt="-12" />` |

Тона: `sky`, `blue`, `yellow`, `red`, `orange`, `green`. Классы для разметки: `.mc-card` —
карточка, `.accent` — красный акцент, `.mc-qrcard` — карточка под QR.

## Светлая и тёмная схема

Тема поддерживает обе схемы. Выбор — `colorSchema` в headmatter дека:

| `colorSchema` | Что будет |
|---------------|-----------|
| `dark` | графит `#23252b`, текст paper `#ecebe6` |
| `light` | белый фон, текст ink `#0b0400` |
| `auto` | схема как в системе, переключается кнопкой Slidev — так стоят старт и финал митапов и доклад `moscowcss-about` |

Цвета обеих схем — в [`styles/tokens.css`](styles/tokens.css): `:root` описывает светлую,
`html.dark` — тёмную. Компоненты берут только токены `--mc-*`, поэтому новые цвета
добавляйте туда же.

| Токен | Светлая | Тёмная | Назначение |
|-------|---------|--------|------------|
| `--mc-bg` | `#ffffff` | `#23252b` | фон |
| `--mc-text` | `#0b0400` | `#ecebe6` | текст |
| `--mc-muted` | `#494949` | `#a6a8b0` | подписи, роли |
| `--mc-accent` | `#3845cf` | `#9aa5ff` | дата, логотип, ссылки |
| `--mc-red` | `#f05133` | `#f05133` | `.accent`, `**N**` на обложке |
| `--mc-qr-bg` | `#ffffff` | `#121212` | карточка QR, в тон фону QR |
| `--mc-tone-*` | 6 тонов | 6 тонов | плашки, рамки, восьмиугольники |

### QR в двух схемах

QR лежат **парой**: `<имя>.svg` — светлые точки на тёмном для тёмной схемы, `<имя>-light.svg` —
тёмные на белом для светлой. Во frontmatter (`qr`, `items[].img`) всегда пишем **тёмный** файл;
в светлой схеме `qr-side`, `qr-trio` и `end` сами подставят `-light.svg` (`utils/asset.ts` →
`qrAsset`). Значит, для каждого QR нужны оба файла. В шаблоне митапов их генерирует
`pnpm qr <url> <имя>`, светлую пару к готовому тёмному QR делает
`pnpm qr --light-from <файл.svg>` (подробнее — `scripts/README.md` шаблона).

Поверх карточки QR ничего не кладём: декор на углу закрывает маркер, и код не читается.

## Шрифты

| Роль | Шрифт | Где |
|------|-------|-----|
| вордмарк, крупные фразы | Jost 400 | `cover`, `statement`, `section`, имя спикера |
| заголовки | Montserrat 400/600/700 | пунктирный `h1`, `h2`, `h3` |
| текст | Golos Text 400 | основной текст |
| плашки, подписи, мета | JetBrains Mono 300–700 | `Pill`, бейдж, дата, роли |

Мельче `1rem` (16px) текст не делаем. Канвас слайда — 980×551.
