import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { TokenBlock } from "@/components/guide/TokenBlock";
import { InfoList } from "@/components/guide/InfoList";

const DesignGuide = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Design System"
        title="디자인 가이드"
        description="컨설팅 업종에 적합한 브랜드 톤, 컬러, 타이포그래피, 이미지 스타일, 레이아웃 원칙을 정의합니다."
      />

      <SectionBlock id="brand-tone" title="브랜드 톤 정의">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {["Modern", "Premium", "Clean", "Editorial", "Corporate", "Strategic", "High-Trust", "Conversion-Oriented"].map((keyword) => (
            <div key={keyword} className="rounded-lg border bg-card p-3 text-center">
              <span className="text-sm font-semibold text-foreground">{keyword}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          "대기업 컨설팅 + 부티크 전략 컨설팅" 사이의 균형감을 목표로 합니다.
          고급스럽지만 과시적이지 않고, 정보가 밀도 있지만 답답하지 않은 톤을 유지하세요.
        </p>
      </SectionBlock>

      <SectionBlock id="color-system" title="컬러 시스템">
        <TokenBlock
          title="Core Colors"
          tokens={[
            { name: "--primary", value: "215 45% 14%", preview: "hsl(215,45%,14%)" },
            { name: "--primary-foreground", value: "210 40% 98%", preview: "hsl(210,40%,98%)" },
            { name: "--accent", value: "187 55% 38%", preview: "hsl(187,55%,38%)" },
            { name: "--accent-foreground", value: "0 0% 100%", preview: "hsl(0,0%,100%)" },
            { name: "--background", value: "220 20% 99%", preview: "hsl(220,20%,99%)" },
            { name: "--foreground", value: "220 25% 10%", preview: "hsl(220,25%,10%)" },
          ]}
        />
        <TokenBlock
          title="Surface & Muted"
          tokens={[
            { name: "--surface", value: "220 14% 97%", preview: "hsl(220,14%,97%)" },
            { name: "--muted", value: "220 14% 96%", preview: "hsl(220,14%,96%)" },
            { name: "--muted-foreground", value: "220 10% 46%", preview: "hsl(220,10%,46%)" },
            { name: "--border", value: "220 13% 90%", preview: "hsl(220,13%,90%)" },
            { name: "--card", value: "0 0% 100%", preview: "hsl(0,0%,100%)" },
            { name: "--destructive", value: "0 84% 60%", preview: "hsl(0,84%,60%)" },
          ]}
        />
        <div className="rounded-lg border bg-surface p-4 mt-4">
          <h4 className="font-semibold text-sm text-foreground mb-2">컬러 사용 규칙</h4>
          <InfoList items={[
            "Primary(딥 네이비)는 텍스트, 헤더 배경, 주요 버튼에 사용",
            "Accent(틸)는 포인트 강조, 링크, 활성 상태, 보조 CTA에 사용",
            "배경은 화이트~라이트그레이 계열로 섹션 간 미묘한 대비 제공",
            "네온, 유치한 그라디언트, 과도한 컬러 조합 금지",
            "텍스트 대비비(WCAG AA 기준 4.5:1) 준수",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="typography" title="타이포그래피 시스템">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Font Family</h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Display / Heading</span>
                <p className="font-display text-lg font-bold text-foreground">Plus Jakarta Sans</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Body / Korean</span>
                <p className="font-body text-lg font-medium text-foreground">Noto Sans KR (본문 한글)</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Mono / Code</span>
                <p className="font-mono text-base text-foreground">SF Mono / Fira Code</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Type Scale</h4>
            <div className="space-y-4">
              {[
                { label: "H1 — 페이지 타이틀", size: "text-3xl md:text-4xl", weight: "font-extrabold", example: "전략적 성장을 위한 파트너" },
                { label: "H2 — 섹션 제목", size: "text-xl md:text-2xl", weight: "font-bold", example: "서비스 영역" },
                { label: "H3 — 하위 제목", size: "text-lg", weight: "font-semibold", example: "디지털 전환 컨설팅" },
                { label: "Body — 본문", size: "text-sm md:text-base", weight: "font-normal", example: "고객의 비즈니스 과제를 데이터 기반으로 분석하고 실행 가능한 전략을 수립합니다." },
                { label: "Caption — 보조 텍스트", size: "text-xs", weight: "font-normal", example: "프로젝트 기간: 12주 | 산업: 금융" },
                { label: "Label — 레이블", size: "text-xs", weight: "font-semibold tracking-widest uppercase", example: "CASE STUDY" },
              ].map((t) => (
                <div key={t.label} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <span className="text-xs text-muted-foreground">{t.label}</span>
                  <p className={`${t.size} ${t.weight} text-foreground mt-1`}>{t.example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="spacing" title="간격·라운드·보더·그림자">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Spacing Scale</h4>
            <div className="space-y-2 text-sm">
              {[
                ["4px", "0.25rem", "아이콘-텍스트 간격"],
                ["8px", "0.5rem", "카드 내부 최소 간격"],
                ["12px", "0.75rem", "요소 간 기본 간격"],
                ["16px", "1rem", "섹션 내 그룹 간격"],
                ["24px", "1.5rem", "카드 패딩"],
                ["32px", "2rem", "섹션 간 간격 (소)"],
                ["48px", "3rem", "섹션 간 간격 (중)"],
                ["64px", "4rem", "섹션 간 간격 (대)"],
                ["96px", "6rem", "페이지 상하단 여백"],
              ].map(([px, rem, usage]) => (
                <div key={px} className="flex items-center gap-3 font-mono">
                  <span className="text-foreground w-12">{px}</span>
                  <span className="text-muted-foreground w-14">{rem}</span>
                  <span className="text-muted-foreground font-body text-xs">{usage}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Border Radius</h4>
              <div className="flex gap-3">
                {[
                  { label: "sm", value: "4px", radius: "4px" },
                  { label: "md", value: "6px", radius: "6px" },
                  { label: "lg", value: "8px", radius: "8px" },
                  { label: "xl", value: "12px", radius: "12px" },
                ].map((r) => (
                  <div key={r.label} className="text-center">
                    <div className="w-12 h-12 bg-accent/20 border border-accent/30 mx-auto mb-1" style={{ borderRadius: r.radius }} />
                    <span className="text-xs text-muted-foreground">{r.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                컨설팅 업종에서는 과도한 라운드를 피하고 8px 이내를 권장합니다. pill 형태(완전 라운드)는 태그/뱃지에만 사용하세요.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Shadow (Elevation)</h4>
              <div className="space-y-3">
                {[
                  { label: "Level 0", shadow: "none", desc: "기본 상태" },
                  { label: "Level 1", shadow: "0 1px 3px rgba(0,0,0,0.08)", desc: "카드 기본" },
                  { label: "Level 2", shadow: "0 4px 12px rgba(0,0,0,0.08)", desc: "카드 hover" },
                  { label: "Level 3", shadow: "0 8px 24px rgba(0,0,0,0.1)", desc: "모달, 드롭다운" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-card border" style={{ boxShadow: s.shadow }} />
                    <div>
                      <span className="text-xs font-medium text-foreground">{s.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="imagery" title="이미지·아이콘 스타일 가이드">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">이미지 선택 기준</h4>
            <InfoList items={[
              "실제 비즈니스 환경을 반영한 자연스러운 사진",
              "과도하게 연출된 스톡 사진 지양",
              "다양성을 고려한 인물 사진",
              "밝고 깔끔한 톤의 사무 환경",
              "데이터, 차트, 회의 장면 등 전문적 이미지",
              "일러스트보다 실사 우선 (프로세스 설명 시 예외)",
            ]} />
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">아이콘 스타일</h4>
            <InfoList items={[
              "선형(outline) 스타일 기본, 2px stroke 권장",
              "일관된 아이콘 세트 사용 (Lucide, Phosphor 등)",
              "한 프로젝트 내에서 스타일 혼용 금지",
              "장식용이 아닌 기능적 아이콘 사용",
              "크기: 16px(인라인), 20px(리스트), 24px(카드)",
            ]} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="dont" title="금지해야 할 시각 표현">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "과한 글래스모피즘 효과",
            "유치한 3D 오브젝트",
            "의미 없는 파티클·애니메이션 남발",
            "네온 컬러, 장난스러운 그라디언트",
            "게임 UI 같은 표현",
            "e-commerce 스타일 레이아웃",
            "과도한 장식적 폰트",
            "무의미한 스톡 일러스트",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-destructive text-sm">✕</span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="layout-principles" title="레이아웃 원칙">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "12컬럼 그리드 기반, 최대 폭 1200~1440px",
            "섹션 간 64~96px 간격 유지",
            "카드/콘텐츠 블록은 좌우 여백을 충분히 확보",
            "모바일에서는 1컬럼으로 자연스럽게 전환",
            "정보 계층은 시각적 크기와 간격으로 표현",
            "한 섹션에 하나의 핵심 메시지에 집중",
            "above the fold에 핵심 가치 제안 + CTA 배치",
            "비대칭 레이아웃 활용 가능하나 질서감 유지",
          ]} />
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default DesignGuide;
