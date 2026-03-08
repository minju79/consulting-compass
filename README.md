# 컨설팅 업종 웹사이트 제작 시스템

컨설팅 업종 홈페이지를 빠르게 제작하기 위한 **내부용 가이드 + 실전 제작 시스템**입니다.

## 시스템 구성

1. **가이드 문서** — 업종 특성, 디자인, UI, UX, 콘텐츠, SEO/GEO
2. **브리프 도구** — 고객사 정보 수집·정리 (localStorage 기반, JSON 내보내기/불러오기)
3. **사이트 청사진** — 브리프 기반 공개용 사이트 구조 동적 생성
4. **구현 규칙** — 브리프 기반 조건부 템플릿·CTA·블록 선택 엔진
5. **신뢰 증거 체계** — 브리프 자산 상태 연동 proof 배치 규칙
6. **산출물 라이브러리** — 복사 가능한 프롬프트, 메타, JSON-LD, 카피 템플릿

## 데이터 흐름

```
Client Brief (입력) → analyzeBrief() → BriefAnalysis
                     → generateBlueprints() → PageBlueprint[]
                     → generateLovablePrompt() → 복사용 프롬프트
                     → getProofFallbacks() → 대체 전략 목록
```

- Brief는 `localStorage`에 자동 저장 (schema version 관리)
- Site Blueprint, Implementation Rules, Proof System이 brief 데이터를 읽어 동적 결과 표시
- Proof 부족 시 대체 전략이 청사진과 구현 규칙 양쪽에 반영

## 기술 스택

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- React Router
- cmdk (command palette)

## 시작하기

```bash
npm install
npm run dev
```

## 빌드 & 테스트

```bash
npm run build      # 프로덕션 빌드
npm run test       # 테스트 실행
npm run lint       # 린트 검사
```

## 프로젝트 구조

```
src/
  lib/
    brief.ts         # Brief 스키마, 저장, 분석, 청사진 생성, proof 대체 전략
  data/
    industryConfig.ts  # 업종 설정 (교체 시 다른 업종 적용)
    routeMeta.ts       # 라우트별 SEO 메타 + 네비게이션 + schemaType
    proofSystemRules.ts # 신뢰 증거 우선순위·배치 규칙
    templateBlueprints.ts # 페이지 블록 시스템 정의
    contentRules.ts    # 카피라이팅 공식, CTA, 금지 표현
    seoRules.ts        # JSON-LD, 메타 템플릿, 내부 링크 맵
    designTokens.ts    # 디자인 토큰
    uxRules.ts         # UX 규칙
    checklistDefinitions.ts # 체크리스트 정의
  components/
    guide/           # SectionBlock, PageHeader, BadgeLabel, CopyBlock, ...
    layout/          # AppLayout, AppSidebar (routeMeta 기반)
    CommandSearch.tsx # Ctrl+K 커맨드 팔레트
    ui/              # shadcn/ui
  pages/             # 13개 라우트 페이지 + NotFound
  hooks/
    usePageMeta.ts   # 라우트별 SEO 메타 자동 관리 + applyPageMeta 공유 유틸
```

## 제작 워크플로우

1. **업종 분석** `/industry-overview` — 방문자 심리, 신뢰 구조 이해
2. **브리프 작성** `/client-brief` — 고객사 정보 입력, 자동 저장, JSON 내보내기
3. **청사진 생성** `/site-blueprint` — 사이트 유형 판별, 페이지/블록 구조 출력
4. **구현 규칙 확인** `/implementation-rules` — 조건부 블록, CTA, 레이아웃 분기
5. **증거 체계 검토** `/proof-system` — 자산 현황, 대체 전략, 배치 규칙
6. **프롬프트 복사** — Lovable용 공개 사이트 생성 프롬프트 출력

## 업종 교체

`src/data/industryConfig.ts`를 교체하면 다른 컨설팅 세부 분야(IT/DX, HR, 마케팅, 재무, ESG 등)에 적용 가능합니다. 사이드바, 헤더, 푸터 문구가 데이터 기반으로 자동 반영됩니다.

## SEO 구조

- 각 route에 `schemaType` (WebSite, Article, CollectionPage 등) 지정
- guide 페이지는 `index, follow` / tool 페이지는 `noindex, follow`
- 404는 `noindex, nofollow` + canonical 제거
- JSON-LD: Organization (홈), BreadcrumbList (전체), Article (가이드)
- `applyPageMeta()` 공유 유틸로 NotFound 포함 전체 메타 일원화
