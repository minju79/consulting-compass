# 컨설팅 업종 웹사이트 제작 가이드

컨설팅 업종 홈페이지를 빠르게 제작하기 위한 **내부용 가이드 사이트**입니다.

디자이너, 기획자, 개발자가 공동으로 참조하는 실무 기준서로,
디자인 시스템, UI/UX 가이드, 페이지 템플릿, 콘텐츠 원칙, SEO/GEO 전략,
고객사 브리프 도구, 사이트 청사진 생성까지 포함합니다.

## 주요 기능

- **가이드 문서** — 업종 특성, 디자인, UI, UX, 콘텐츠, SEO/GEO 가이드
- **제작 도구** — 고객사 브리프, 사이트 청사진, 구현 규칙, 신뢰 증거 체계
- **블록 시스템** — 필수/선택/조건부/금지 블록 기반 페이지 템플릿
- **데이터 기반 구조** — 업종 데이터만 교체하면 다른 업종으로 확장 가능
- **라우트별 SEO** — 각 페이지별 고유 title, meta, canonical, OG, JSON-LD

## 기술 스택

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- React Router

## 시작하기

```bash
npm install
npm run dev
```

## 프로젝트 구조

```
src/
  data/           # 업종 설정, 라우트 메타, 증거 체계, 템플릿 블루프린트
  components/
    guide/        # 재사용 가이드 컴포넌트 (SectionBlock, GuideCard, BadgeLabel 등)
    layout/       # AppLayout, AppSidebar
    ui/           # shadcn/ui 컴포넌트
  pages/          # 13개 가이드 + 도구 페이지
  hooks/          # usePageMeta (라우트별 SEO 관리)
```

## 라우트

| 경로 | 설명 |
|------|------|
| `/` | 메인 대시보드 |
| `/industry-overview` | 업종 특성 분석 |
| `/design-guide` | 디자인 가이드 |
| `/ui-guide` | UI 컴포넌트 가이드 |
| `/ux-guide` | UX 전략 가이드 |
| `/page-templates` | 페이지 블록 시스템 |
| `/content-guide` | 콘텐츠/카피 가이드 |
| `/seo-geo` | SEO/GEO 가이드 |
| `/checklist` | 실무 체크리스트 |
| `/client-brief` | 고객사 브리프 도구 |
| `/site-blueprint` | 사이트 청사진 |
| `/implementation-rules` | 구현 규칙 |
| `/proof-system` | 신뢰 증거 체계 |
