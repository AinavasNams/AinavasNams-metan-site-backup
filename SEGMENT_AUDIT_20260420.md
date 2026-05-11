# Аудит сегментных лендингов metan.lv — 2026-04-20

## Что проверено технически
- GSC URL Inspection API по 10 URL (5 сегментов × 2 пути `/lv/{seg}` и `/lv/pakalpojumi/{seg}`)
- GSC Search Analytics за 7 дней (2026-04-13 … 2026-04-20)
- robots.txt (WebFetch)
- sitemap.xml (WebFetch)
- Исходники: `app/[locale]/layout.tsx`, `lib/page-metadata.ts`, все `app/[locale]/{,pakalpojumi/}*/page.tsx`

## [ПРОВЕРЕНО] Корень проблемы — битый canonical у всех сегментов

`app/[locale]/layout.tsx:69` выставляет для всех дочерних страниц:
```
alternates: { canonical: `https://metan.lv/${lang}` }
```
У сегментных `page.tsx` **нет** собственного `generateMetadata`, потому что все 5 pakalpojumi-страниц объявлены `'use client'` (client components в Next.js App Router не могут экспортировать `generateMetadata`). В проекте уже есть helper `lib/page-metadata.ts`, но он не используется.

Результат по GSC Inspection (userCanonical везде = `/lv`):

| URL | Verdict | Coverage | Google canonical |
|---|---|---|---|
| /lv/horeca | PASS | Submitted and indexed | `/lv/horeca` |
| /lv/industrial | PASS | Submitted and indexed | `/lv/industrial` |
| /lv/municipal | NEUTRAL | Page with redirect | **`/lv/par-mums`** |
| /lv/social | NEUTRAL | Page with redirect | `/lv/pakalpojumi/social` |
| /lv/logistics | NEUTRAL | Page with redirect | `/lv/pakalpojumi/logistics` |
| /lv/pakalpojumi/horeca | PASS | Submitted and indexed | `/lv/pakalpojumi/horeca` |
| /lv/pakalpojumi/industrial | NEUTRAL | Alternate page with proper canonical | **`/industrial`** (без /lv) |
| /lv/pakalpojumi/municipal | NEUTRAL | Alternate page with proper canonical | **`/lv/par-mums`** |
| /lv/pakalpojumi/social | PASS | Submitted and indexed | `/lv/pakalpojumi/social` |
| /lv/pakalpojumi/logistics | PASS | Submitted and indexed | `/lv/pakalpojumi/logistics` |

Критично:
- **MUNICIPAL**: обе версии Google схлопнул на `/lv/par-mums` (About Us). Муниципальный сегмент не ранжируется никогда.
- **/lv/pakalpojumi/industrial**: Google canonical = `/industrial` (без префикса локали) — возможный 404.
- **/lv/{social,logistics}**: Google видит как редирект и прячет.

## [ПРОВЕРЕНО] Дубли — корень "48 excluded"

Sitemap включает и `/{locale}/{segment}`, и `/{locale}/pakalpojumi/{segment}` для всех 5 сегментов × 4 языка = **40 URL-дублей**. Root-версии `/lv/{horeca,industrial}` — это 307-redirect (`app/[locale]/{horeca,industrial}/page.tsx`), но контент идентичен pakalpojumi-версиям. `/lv/{municipal,social,logistics}` на root-уровне **не имеют page.tsx** — рендерится что-то через middleware или 404 → это те самые "Page with redirect" в GSC.

## [ПРОВЕРЕНО] Ошибка в SEO autopilot отчёте

Отчёт заявил "HORECA/INDUSTRIAL/…: нет показов по целевым запросам" — это **неверно**. GSC Search Analytics за 7 дней:
- `/en/horeca` — 14 impressions, pos 3.4
- `/ru/horeca` — 6 impressions, pos 1.3
- `/lv/horeca` — 2 impressions, pos 3.0, **1 клик**
- `/horeca` (без локали) — 2 impressions, pos 2.5
- `/en/industrial` — 3 impressions, pos 7.3
- `/en/logistics` — 1 impression
- `/en/municipal` — 1 impression

Классификатор в autopilot не учитывает multilingual URL-варианты и non-localed варианты — его нужно починить отдельно.

## Что не удалось подтвердить
- Точный список всех 48 excluded URL (GSC API не отдаёт массив excluded — только per-URL inspection). Оценка по pattern: 10-20 сегментных alternate-canonical + page-with-redirect, остальное — вероятно `/lv`-less варианты (`/horeca`, `/industrial`) и brand-уровневые дубли.
- Рендер исходного HTML (curl к metan.lv заблокирован hook-ом). Все выводы по canonical сделаны на основе GSC API (authoritative).

## Риски
- Сегменты ранжируются ниже своего потенциала: Google не консолидирует ссылочный вес на правильный URL.
- MUNICIPAL теряется полностью — Google консолидирует всё на About Us.
- При деплое новых ссылок или рекламы на `/lv/municipal` трафик уйдёт в `/lv/par-mums`, а не на посадочную.

## Следующие технические шаги (по приоритету)

1. **[CRITICAL] Починить canonical** — преобразовать pakalpojumi/{horeca,industrial,municipal,social,logistics}/page.tsx из `'use client'` в server-wrapper pattern:
   - `page.tsx` (server) с `export async function generateMetadata` + `generatePageMetadata(lang, '/pakalpojumi/horeca')`
   - Перенести тело в `{Name}Content.tsx` (по шаблону существующих `HorecaContent.tsx`/`IndustrialContent.tsx` для root-редиректов)
2. **[HIGH] Убрать из sitemap root-дубли** `/lv/{horeca,industrial}` или сделать их 301 (не 307) → консолидировать на pakalpojumi.
3. **[HIGH] Исправить 307 redirect на 301** в `app/[locale]/{horeca,industrial}/page.tsx` (`redirect()` в Next.js по умолчанию 307; нужен `permanentRedirect()`).
4. **[MEDIUM] Починить SEO autopilot отчёт** — классификатор сегментов должен матчить `/{lv,ru,en,lt}/{segment}` и `/{segment}` без локали.
5. После деплоя — `gsc_check.py reindex` по 20 сегментным URL (5 × 4 языка в pakalpojumi/ форме).

## Sanity check (staff engineer)
Минимальное корректное решение — пункты 1+3. Пункты 2+4 — улучшение. Обязательна проверка после деплоя через `gsc_check.py inspect` что `userCanonical` стал равен самому URL.
