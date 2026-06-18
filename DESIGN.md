---
version: public-reference-v1
name: consulting-compass
description: "B2B 의사결정자를 위한 컨설팅 제작 기준서. 전문성, 방법론, 사례, 성과 증거를 조용하고 정보 밀도 있게 전달한다."
colors:
  primary: "hsl(262 47% 16%)"
  secondary: "hsl(262 25% 95%)"
  tertiary: "hsl(262 75% 58%)"
  neutral: "hsl(262 20% 97%)"
  background: "hsl(262 30% 98.5%)"
  surface: "hsl(0 0% 100%)"
  foreground: "hsl(262 45% 10%)"
  muted: "hsl(262 10% 46%)"
  accent: "hsl(262 75% 58%)"
typography:
  h1:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  body-md:
    fontFamily: "Noto Sans KR"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
rounded:
  sm: 4px
  md: 8px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
components:
  guide-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 20px
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px
  accent-card:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: 20px
  muted-note:
    backgroundColor: "{colors.muted}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: 12px
  neutral-panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 12px
---

# DESIGN.md

## Overview

컨설팅 업종 웹사이트 제작 시스템 is a public reference system for 컨설팅 homepage production. This document captures the implementation-facing visual contract needed to recreate the same site style, color behavior, spacing rhythm, and guide/tool surface from source alone.

The project should feel like a practical industry workbench: a curated guide, a client brief tool, a site blueprint generator, and implementation rules in one interface. It is not a marketing landing page. Preserve the source system's dense but readable documentation rhythm.

## Source-Derived Identity

B2B 의사결정자를 위한 컨설팅 제작 기준서. 전문성, 방법론, 사례, 성과 증거를 조용하고 정보 밀도 있게 전달한다.

Core visual rules:

- Use deep royal purple for authority and vibrant lavender-purple for controlled action/proof highlights.
- Motion is subtle and content-supporting only; use opacity/translate entrance, never layout-shifting effects.
- B2B pages need service taxonomy, process, cases, team, proof, FAQ, and project inquiry CTA.

## Palette

Use semantic HSL tokens from `src/index.css` and Tailwind aliases from `tailwind.config.ts`. Do not hard-code unrelated one-off colors into pages.

- Primary: `hsl(262 47% 16%)`
- Secondary: `hsl(262 25% 95%)`
- Tertiary: `hsl(262 75% 58%)`
- Neutral: `hsl(262 20% 97%)`
- Background: `hsl(262 30% 98.5%)`
- Surface: `hsl(0 0% 100%)`
- Foreground: `hsl(262 45% 10%)`
- Muted text: `hsl(262 10% 46%)`
- Accent: `hsl(262 75% 58%)`

### Local CSS Variable Evidence

- `background` = `262 30% 98.5%`
- `foreground` = `262 45% 10%`
- `card` = `0 0% 100%`
- `card-foreground` = `262 45% 10%`
- `popover` = `0 0% 100%`
- `popover-foreground` = `262 45% 10%`
- `primary` = `262 47% 16%`
- `primary-foreground` = `262 60% 98%`
- `secondary` = `262 25% 95%`
- `secondary-foreground` = `262 45% 10%`
- `muted` = `262 15% 96%`
- `muted-foreground` = `262 10% 46%`
- `accent` = `262 75% 58%`
- `accent-foreground` = `0 0% 100%`
- `destructive` = `0 84% 60%`
- `destructive-foreground` = `210 40% 98%`
- `border` = `262 20% 90%`
- `input` = `262 20% 90%`
- `ring` = `262 75% 58%`
- `radius` = `0.5rem`
- `surface` = `262 20% 97%`
- `surface-foreground` = `262 45% 10%`
- `sidebar-background` = `262 45% 15%`
- `sidebar-foreground` = `262 30% 85%`
- `sidebar-primary` = `262 75% 58%`
- `sidebar-primary-foreground` = `0 0% 100%`
- `sidebar-accent: 262 40% 22%`
- `sidebar-accent-foreground: 262 30% 95%`

## Typography

Use `Plus Jakarta Sans` for page titles and `Noto Sans KR` for body/UI text. Preserve Korean readability over decorative density: body copy uses at least `1.55` line-height, stable letter spacing, and no viewport-width font scaling.

Headings may be strong and compact, but guide pages should keep H1 around `2.25rem` desktop and avoid oversized hero treatment. Cards, sidebars, and tool panels use tighter headings so dense Korean content remains scannable.

## Layout

Primary shell: professional sidebar workbench with sticky translucent card header, max-w-5xl content, motion-enhanced sections.

Rules:

- Keep sidebar navigation and top command/search affordances persistent on desktop.
- Keep content width constrained; current source centers guide content around `max-w-4xl` to `max-w-5xl`.
- Cards are for repeated guide objects, status blocks, summary cards, and generated outputs. Do not nest broad page sections inside decorative cards.
- Mobile order: sidebar trigger/header, command/search where available, page title, summary/quick-apply, content, previous/next navigation.
- Long Korean labels, business names, menu names, course names, regions, and CTA labels must wrap without clipping.

## Components

| Component | Contract | Confidence |
|---|---|---|
| `AppSidebar` | Preserve source behavior and state language from current implementation. | high |
| `AppLayout` | Preserve source behavior and state language from current implementation. | high |
| `CommandSearch` | Preserve source behavior and state language from current implementation. | high |
| `PageHeader` | Preserve source behavior and state language from current implementation. | high |
| `SectionBlock` | Preserve source behavior and state language from current implementation. | high |
| `QuickSummary` | Preserve source behavior and state language from current implementation. | high |
| `TokenBlock` | Preserve source behavior and state language from current implementation. | high |
| `PageNavigation` | Preserve source behavior and state language from current implementation. | high |

Common component rules:

- Navigation items need active, hover, and focus-visible states.
- Command search must remain keyboard reachable and visually stable.
- Copyable prompt/meta/code blocks need clear label, monospaced output, and copied feedback.
- Status/proof/review states cannot rely on color alone; use label text or border/shape difference too.
- Icon buttons require accessible labels. Text buttons must not overflow on mobile.

## States And Accessibility

- Normal text contrast target: 4.5:1 or higher.
- Large text and non-text UI indicators: 3:1 minimum.
- Focus-visible styles must be present on sidebar links, command search, buttons, copy controls, form fields, and TOC links.
- A selected nav route needs both color and active styling.
- Form validation in client brief tools must use visible text and cannot rely only on red color.
- Motion must be subtle and non-blocking; prefer opacity/transform only. Honor reduced-motion expectations when adding new animation.

## Content And Copy Rules

- Keep Korean labels direct and specific.
- Do not show hidden implementation instructions in the UI.
- Guide pages should use evidence-oriented headings: industry traits, design guide, UI guide, UX guide, page templates, content guide, SEO/GEO, checklist, client brief, site blueprint, implementation rules.
- Public-site generation outputs must be copyable and source-grounded.

## Routes And Information Architecture

Detected route/page evidence:

- `/`
- `/industry-overview`
- `/design-guide`
- `/ui-guide`
- `/ux-guide`
- `/page-templates`
- `/content-guide`
- `/seo-geo`
- `/checklist`
- `/client-brief`
- `/site-blueprint`
- `/implementation-rules`
- `/proof-system`
- `*`

## Verification Gates

Before publishing style changes:

1. Run `npm run build`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `design-md-lint DESIGN.md`.
5. Inspect mobile widths for Korean text wrapping, sidebar collapse, command search, copy blocks, and generated blueprint cards.
6. Re-run secret scan before public GitHub publication if new files include external integrations.

## Evidence Map

| Rule | Evidence | Confidence |
|---|---|---|
| Palette and semantic token names | `src/index.css`, `tailwind.config.ts` | high |
| Industry positioning and trust/CTA rules | industry config and README | high |
| Layout shell and navigation behavior | layout/sidebar components | high |
| Component state vocabulary | guide components and shadcn/ui wrappers | high |
| Route and information architecture | App/routes/navigation data | high |
| Public reproduction guidance | this DESIGN.md synthesized from source on 2026-06-18 | derived |

## Local Evidence Files

- `src/index.css`
- `tailwind.config.ts`
- `src/data/industryConfig.ts`
- `src/data/designTokens.ts`
- `src/data/routeMeta.ts`
- `src/components/layout/AppLayout.tsx`
- `src/components/guide/PageHeader.tsx`
- `src/components/guide/SectionBlock.tsx`
