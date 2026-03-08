import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { TokenBlock } from "@/components/guide/TokenBlock";
import { InfoList } from "@/components/guide/InfoList";
import {
  brandToneKeywords, brandToneDescription,
  coreColors, surfaceColors, colorUsageRules,
  typeScale, spacingScale, borderRadii, shadowLevels,
  imageGuidelines, iconGuidelines,
  prohibitedVisuals, layoutPrinciples,
} from "@/data/designTokens";

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
          {brandToneKeywords.map((keyword) => (
            <div key={keyword} className="rounded-lg border bg-card p-3 text-center">
              <span className="text-sm font-semibold text-foreground">{keyword}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{brandToneDescription}</p>
      </SectionBlock>

      <SectionBlock id="color-system" title="컬러 시스템">
        <TokenBlock title="Core Colors" tokens={coreColors} />
        <TokenBlock title="Surface & Muted" tokens={surfaceColors} />
        <div className="rounded-lg border bg-surface p-4 mt-4">
          <h4 className="font-semibold text-sm text-foreground mb-2">컬러 사용 규칙</h4>
          <InfoList items={colorUsageRules} />
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
              {typeScale.map((t) => (
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
              {spacingScale.map((s) => (
                <div key={s.px} className="flex items-center gap-3 font-mono">
                  <span className="text-foreground w-12">{s.px}</span>
                  <span className="text-muted-foreground w-14">{s.rem}</span>
                  <span className="text-muted-foreground font-body text-xs">{s.usage}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Border Radius</h4>
              <div className="flex gap-3">
                {borderRadii.map((r) => (
                  <div key={r.label} className="text-center">
                    <div className="w-12 h-12 bg-accent/20 border border-accent/30 mx-auto mb-1" style={{ borderRadius: r.value }} />
                    <span className="text-xs text-muted-foreground">{r.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                컨설팅 업종에서는 과도한 라운드를 피하고 8px 이내를 권장합니다.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Shadow (Elevation)</h4>
              <div className="space-y-3">
                {shadowLevels.map((s) => (
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
            <InfoList items={imageGuidelines} />
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">아이콘 스타일</h4>
            <InfoList items={iconGuidelines} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="dont" title="금지해야 할 시각 표현">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prohibitedVisuals.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-destructive text-sm">✕</span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="layout-principles" title="레이아웃 원칙">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={layoutPrinciples} />
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default DesignGuide;
