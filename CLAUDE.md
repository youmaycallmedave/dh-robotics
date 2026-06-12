# DH Robotics — Project Reference

## Stack
- **Framework:** Astro
- **Styling:** Tailwind CSS v4 (конфиг через CSS, не JS)
- **CMS:** Sanity (подключаем позже, точечно)
- **Animations:** GSAP + ScrollTrigger (добавляем после вёрстки)
- **Deployment:** Vercel (auto-deploy на каждый пуш в main)
- **Repo:** github.com/youmaycallmedave/dh-robotics
- **Live:** dh-robotics.vercel.app

## Правила разработки
- **Pixel-perfect** — жёсткое требование, всё по Figma
- **Каждая секция = отдельный компонент** в `src/components/sections/` — изоляция стилей и скриптов Astro
- **Переиспользуемые UI элементы** — в `src/components/ui/`
- **Хардкод сначала** — Sanity подключаем в конце точечно
- **Один коммит = одна завершённая секция или страница**
- **CLAUDE.md обновлять** после каждого нового паттерна или решения

## Структура компонентов
```
src/
  components/
    ui/          ← Button, Card, Hero, FAQ, Subscribe, MediaGallery...
    sections/    ← секции страниц (HomeHero, HomeEquipment, NewsGrid...)
  layouts/
    Layout.astro ← Header + main slot + Footer
  pages/         ← роутинг
  styles/
    global.css   ← Tailwind + CSS переменные токенов
```

## Figma
- **Файл:** https://www.figma.com/design/BLmr3qTpLezUsATyOJpkNQ/DH-Robotics
- **Рабочая страница:** 04. UI design (node-id=9864-2163)
- **Секции в Figma:**
  - `9874:8712` — 01. Home page
  - `9959:13712` — 02. Products
  - `10144:29293` — 03. Applications
  - `10103:21444` — 04. Service
  - `10084:20063` — 05. Resources
  - `10076:19721` — 06. About
  - `10069:11460` — 07. Other pages

## Sitemap — все страницы
| URL | Файл | Описание |
|-----|------|----------|
| `/` | `pages/index.astro` | Главная |
| `/sitemap` | `pages/sitemap.astro` | Навигация по страницам (dev only) |
| `/products` | `pages/products/index.astro` | Все категории — левый сайдбар иконок, правая часть со слайдерами серий по категории |
| `/products/[category]` | `pages/products/category.astro` | Страница категории — сетка карточек серий |
| `/products/[category]/[series]` | `pages/products/series.astro` | Страница серии — hero анимация + секции |
| `/products/[category]/[series]/specifications` | *(встроено в series.astro или отдельная страница)* | Таблица сравнения моделей в серии |
| `/products/[category]/[series]/downloads` | *(отдельная страница)* | Загрузки для серии — каталоги, мануалы |
| `/applications` | `pages/applications/index.astro` | Все applications |
| `/applications/industry/[slug]` | `pages/applications/industry/[slug].astro` | Industry detail |
| `/applications/action/[slug]` | `pages/applications/action/[slug].astro` | Process/action detail |
| `/services` | `pages/services.astro` | Разводящая страница |
| `/services/technology` | `pages/services/technology.astro` | Technology |
| `/services/software` | `pages/services/software.astro` | User Control Software |
| `/news` | `pages/news/index.astro` | Листинг новостей |
| `/news/[slug]` | `pages/news/[slug].astro` | Статья (→ CMS) |
| `/events` | `pages/events/index.astro` | Листинг событий |
| `/events/[slug]` | `pages/events/[slug].astro` | Событие (→ CMS) |
| `/cases` | `pages/cases/index.astro` | Листинг кейсов |
| `/cases/[slug]` | `pages/cases/[slug].astro` | Кейс (→ CMS) |
| `/resources/downloads` | `pages/resources/downloads.astro` | Download Center |
| `/resources/faq` | `pages/resources/faq.astro` | FAQ |
| `/contact` | `pages/contact.astro` | Контакты |
| `/privacy-policy` | `pages/privacy-policy.astro` | Privacy Policy |
| `/404` | `pages/404.astro` | 404 |

## Структура раздела Products

```
/products                          — все категории с горизонтальными слайдерами серий
  └── /[category]                  — страница категории (все серии этой категории в сетке)
        └── /[series]              — страница серии (Overview)
              ├── sticky scroll hero (анимация: bg→white card→image+text transition)
              ├── text+video секция
              ├── gallery продуктов серии
              ├── Product Features
              ├── More Features (иконки)
              ├── Applications
              ├── Main Specifications (таблица моделей)
              ├── Gallery (слайдер)
              └── CTA
              /specifications       — таблица сравнения всех моделей (горизонт. скролл)
              /downloads            — загрузки для серии (каталоги, мануалы, фильтры)
```

### Sticky nav для серии (appears в hero и фиксирован при скролле)
```
| [Series Name] | Overview (underline) | Specifications | Downloads | [GET IN TOUCH btn] |
```
Синяя линия снизу = active indicator.

## CMS — Sanity типы документов (планируется)
```
Category        → Products index слайдер
  └── Series    → Products category, series страница
        └── Product → Products product страница
              └── Download → Downloads, Software, series страницы

Application     → Applications, Industry template, главная, series страницы
Process         → Processes template, главная
Case            → Cases index, cases template (связан с Series)
News/Insight    → News index, news template, главная
Event           → Events index, events template, главная
FaqItem         → FAQ, products/series, products/category
Download        → Downloads, Software, series (фильтрация: Category→Series→Product)
```

## Компоненты — переиспользуемые (ui/)
- `Hero` — title, текст, кнопка, картинка (повторяется на многих страницах)
- `Button`
- `NewsCard` — News index + главная
- `EventCard` — Events index + главная
- `Subscribe` — News index + News template
- `ProductCard` — Products index, category
- `MediaGallery` — Series + Product (одинаковый блок)
- `Specifications` — Series + Product
- `Gallery` — слайдер с drag, Series + Product
- `CTABlock` — Series + Product
- `FAQAccordion` — FAQ страница + Series + Category

## Паттерны и правила вёрстки

### Структура секции
Каждая секция строится так:
```astro
<Section class="..." hasBg={true}>
  <Fragment slot="bg">
    <!-- фоновое изображение/видео -->
  </Fragment>
  <!-- контент -->
</Section>
```

`section` в CSS уже имеет `position: relative` и `overflow: clip` — классами не проставлять.

Структура внутри Section:
```
section (relative, overflow: clip)
  └── section-bg (absolute inset-0, z-1) ← фон если есть
  └── global-padding (px-4 mob / px-10 desk, z-2)
        └── container-xl (max-w-[1200px], mx-auto)
              └── контент
```

### Типографика
- Все размеры в **rem**, line-height в **em**, letter-spacing в **rem**
- Классы `text-h1`…`text-h6`, `text-large`…`text-tiny-medium` — определены в `global.css`
- Никогда не прописывать `text-[72px] leading-[72px]` в компоненте — только класс
- Адаптив заголовков зашит в сам класс через `@media` в `global.css`
- Fluid responsive: `html { font-size }` скейлится по брейкпоинтам, всё остальное автоматически
- **Мобильные размеры заголовков** — классы `mob-h2`…`mob-h6`: применяют нужный heading-size на `max-lg`
  - Пример: `class="text-h1 mob-h2"` → h1 на десктопе, h2 на мобайле/таблете
  - Не использовать `max-lg:text-h*` — это не работает корректно (проблема каскада CSS)

### Цвета
- Только **семантические** переменные: `text-text-primary`, `bg-bg-primary`, `bg-btn-black-default` и т.д.
- Никогда не использовать примитивы (`text-black-1000`, `#0a0f15`) напрямую в компонентах
- Tailwind v4: `--color-*` из `@theme` автоматически → утилиты (`text-*`, `bg-*`, `border-*`)

### Отступы и размеры
- **Вертикальные отступы — только `mb-*`**. Никогда не использовать `gap` для вертикального расстояния между блоками
- `gap` допустим только для горизонтального выравнивания внутри flex-row (например, иконка + текст)
- Никаких пустых div-спейсеров
- Значения строго из Figma — сверять каждый отступ перед вёрсткой
- Ширина контентных блоков: `max-w-[Xpx]`, не `w-[Xpx]`
- Изображения: `h-auto` если не нужна фиксированная высота

### Таблица padding-токенов Figma → px
| Figma токен | px | Tailwind |
|---|---|---|
| padding-6 | 16px | `mb-4` |
| padding-8 | 24px | `mb-6` |
| padding-10 | 32px | `mb-8` |
| padding-12 | 40px | `mb-10` |
| padding-14 | 56px | `mb-14` |
| padding-16 | 72px | `mb-[72px]` |
| padding-17 | 80px | `mb-20` |
| padding-27 | 160px | `pb-[160px]` |
| padding-30 | 208px | `pt-[208px]` |

### Кнопка
```astro
<Button label="Text" href="/" variant="black|blue|red|white" />
```
Компонент в `src/components/ui/Button.astro`. Не верстать кнопки руками.

### Комментарии в коде
Нет. Если необходим — только на английском.

### Ассеты
- Статичные файлы → `public/images/`
- Формат: предпочтительно WebP
- Путь в коде: `/images/filename.webp`

### Section компонент — варианты размера контейнера
- `size="sm"` → max-w-[800px]
- `size="md"` → max-w-[1000px]
- `size="lg"` → max-w-[1200px] (default)
- `size="xl"` → max-w-[1440px]
- `size="full"` → без ограничения

## Следующие шаги
1. Вытащить токены из Figma → настроить Tailwind конфиг
2. Сделать CLAUDE.md с токенами и паттернами
3. Верстать секция за секцией, начиная с глобальных компонентов (Header, Footer)
4. Потом страницы по порядку
5. В конце — Sanity интеграция

## Деплой / Передача клиенту
- Dev: Давид Зименков (Vercel + Sanity)
- Передача: Transfer Project в Vercel (1 кнопка) + Sanity dataset export/import
- Все секреты в `.env` — передача = смена env переменных
