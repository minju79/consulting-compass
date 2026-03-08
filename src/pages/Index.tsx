import { AppLayout } from "@/components/layout/AppLayout";
import { GuideCard } from "@/components/guide/GuideCard";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { motion } from "framer-motion";
import {
  Building2,
  Palette,
  Component,
  Users,
  FileText,
  PenTool,
  Search,
  CheckSquare,
  ArrowRight,
  Shield,
  Target,
  Layers,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { industryConfig } from "@/data/industryConfig";

const quickNavItems = [
  { title: "업종 특성 분석", description: "컨설팅 업종 홈페이지가 왜 다른지, 방문자 심리와 전환 흐름을 이해합니다.", icon: <Building2 className="h-5 w-5" />, href: "/industry-overview" },
  { title: "디자인 가이드", description: "브랜드 톤, 컬러 시스템, 타이포그래피, 이미지 스타일을 정의합니다.", icon: <Palette className="h-5 w-5" />, href: "/design-guide" },
  { title: "UI 가이드", description: "헤더, 히어로, 카드, CTA 등 핵심 UI 컴포넌트의 사용 기준을 제시합니다.", icon: <Component className="h-5 w-5" />, href: "/ui-guide" },
  { title: "UX 가이드", description: "사용자 여정, CTA 배치, 신뢰 요소 위치, 폼 전략을 설계합니다.", icon: <Users className="h-5 w-5" />, href: "/ux-guide" },
  { title: "페이지 템플릿", description: "필수/선택/조건부 블록 시스템 기반의 페이지별 구조 템플릿입니다.", icon: <FileText className="h-5 w-5" />, href: "/page-templates" },
  { title: "콘텐츠 가이드", description: "증거 기반 카피라이팅 원칙, 문장 공식, CTA 라이브러리를 제공합니다.", icon: <PenTool className="h-5 w-5" />, href: "/content-guide" },
  { title: "SEO / GEO", description: "메타 태그, JSON-LD 코드 예시, URL 구조, AI 검색 최적화 전략.", icon: <Search className="h-5 w-5" />, href: "/seo-geo" },
  { title: "실무 체크리스트", description: "기획·디자인·UI·UX·콘텐츠·SEO·접근성·모바일·런칭 10개 영역 체크.", icon: <CheckSquare className="h-5 w-5" />, href: "/checklist" },
];

const toolNavItems = [
  { title: "고객사 브리프", description: "고객사 정보를 체계적으로 수집·정리하여 사이트 제작 기초 데이터를 구성합니다.", icon: <Target className="h-5 w-5" />, href: "/client-brief", accent: true },
  { title: "사이트 청사진", description: "브리프 기반으로 사이트 유형, 페이지 구조, 섹션, CTA를 도출합니다.", icon: <Layers className="h-5 w-5" />, href: "/site-blueprint", accent: true },
  { title: "구현 규칙", description: "조건별 템플릿 선택, 자산 부족 시 대체 전략 등 실무 규칙 문서.", icon: <Wrench className="h-5 w-5" />, href: "/implementation-rules", accent: true },
  { title: "신뢰 증거 체계", description: "신뢰 요소 우선순위, 페이지별 배치 규칙, 부족 시 대체 전략.", icon: <Shield className="h-5 w-5" />, href: "/proof-system", accent: true },
];

const principles = [
  { icon: <Shield className="h-5 w-5" />, title: "신뢰 중심 설계", desc: "의사결정자가 첫 화면에서 전문성을 확인할 수 있도록 신뢰 요소를 전략적으로 배치합니다." },
  { icon: <Target className="h-5 w-5" />, title: "전환 지향 구조", desc: "상담 요청, 문의 전환까지의 흐름을 자연스럽게 유도하는 정보 구조를 설계합니다." },
  { icon: <Layers className="h-5 w-5" />, title: "모듈화·재사용", desc: "업종명과 콘텐츠만 교체하면 다른 전문 서비스 업종에도 즉시 적용할 수 있는 구조입니다." },
];

const workflow = [
  { step: "01", title: "업종 특성 파악", desc: "컨설팅 업종의 방문자 심리, 신뢰 형성 요소, 전환 구조를 이해합니다." },
  { step: "02", title: "고객사 브리프 정리", desc: "Client Brief로 고객사 정보를 수집하고, Site Blueprint로 구조를 도출합니다." },
  { step: "03", title: "디자인 시스템 구축", desc: "브랜드 톤에 맞는 컬러, 타이포, 간격, 컴포넌트 스타일을 정의합니다." },
  { step: "04", title: "페이지 구조 설계", desc: "블록 시스템 기반으로 홈, 서비스, 사례, 팀, 문의 페이지를 설계합니다." },
  { step: "05", title: "콘텐츠 작성", desc: "증거 기반 카피 공식으로 실제 카피를 작성하고, 금지 표현을 검증합니다." },
  { step: "06", title: "SEO·검수·런칭", desc: "메타 태그, JSON-LD, 접근성, 반응형, 체크리스트를 최종 점검 후 런칭합니다." },
];

const Index = () => {
  return (
    <AppLayout>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          Production System
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
          컨설팅 업종<br />
          <span className="text-accent">웹사이트 제작 시스템</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
          {industryConfig.description}
          {" "}가이드 문서 + 브리프 도구 + 사이트 청사진 + 구현 규칙 + 신뢰 증거 체계까지, 실전 제작에 필요한 모든 것을 한곳에서 제공합니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/industry-overview"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            가이드 시작하기 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/client-brief"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            브리프부터 시작하기
          </Link>
        </div>
        <div className="mt-8 h-px bg-border" />
      </motion.div>

      {/* 핵심 특성 */}
      <SectionBlock
        id="overview"
        title="컨설팅 업종 웹사이트의 핵심 특성"
        description="컨설팅 업종 방문자는 즉각적 구매가 아닌 '신뢰 확인 → 전문성 판단 → 상담 요청'의 흐름을 따릅니다."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-lg bg-surface border">
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">방문자 기대 심리</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {industryConfig.visitorPriorities.slice(0, 5).map((v) => (
                <li key={v.rank}>• {v.content}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">사이트 핵심 목표</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {industryConfig.coreTraits.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionBlock>

      {/* 핵심 원칙 */}
      <SectionBlock id="principles" title="핵심 설계 원칙">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map((p) => (
            <div key={p.title} className="rounded-lg border bg-card p-5">
              <div className="text-accent mb-3">{p.icon}</div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 제작 도구 */}
      <SectionBlock
        id="tools"
        title="실전 제작 도구"
        description="고객사 브리프 정리부터 사이트 청사진 도출까지, 실무에 바로 활용할 수 있는 도구입니다."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {toolNavItems.map((item) => (
            <GuideCard key={item.href} {...item} />
          ))}
        </div>
      </SectionBlock>

      {/* 가이드 구성 */}
      <SectionBlock
        id="quick-nav"
        title="가이드 구성"
        description="각 섹션을 선택해 상세 가이드로 이동하세요."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickNavItems.map((item) => (
            <GuideCard key={item.href} {...item} />
          ))}
        </div>
      </SectionBlock>

      {/* 추천 제작 순서 */}
      <SectionBlock
        id="workflow"
        title="추천 제작 순서"
        description="컨설팅 업종 홈페이지를 효율적으로 제작하기 위한 6단계 워크플로우입니다."
      >
        <div className="space-y-4">
          {workflow.map((w) => (
            <div key={w.step} className="flex gap-4 items-start p-4 rounded-lg border bg-card">
              <span className="text-2xl font-extrabold text-accent/40 font-display shrink-0">{w.step}</span>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{w.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 공개용 구조 미리보기 */}
      <SectionBlock
        id="site-structure"
        title="컨설팅 홈페이지 추천 구조"
        description="실제 고객사 컨설팅 사이트의 메인 페이지 권장 섹션 순서입니다."
      >
        <div className="rounded-lg border bg-card overflow-hidden">
          {industryConfig.publicSiteStructure.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 border-b last:border-b-0 hover:bg-surface/50 transition-colors">
              <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium text-sm text-foreground w-28 shrink-0">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 rounded-lg bg-primary p-8 md:p-10 text-center"
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
          가이드를 따라 첫 컨설팅 사이트를 만들어 보세요
        </h2>
        <p className="text-sm text-primary-foreground/70 mb-5">
          업종 분석부터 런칭 체크리스트까지, 단계별로 안내합니다.
        </p>
        <Link
          to="/industry-overview"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          업종 분석부터 시작하기 <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </AppLayout>
  );
};

export default Index;
