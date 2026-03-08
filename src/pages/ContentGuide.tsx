import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { QuickSummary } from "@/components/guide/QuickSummary";
import { InPageToc } from "@/components/guide/InPageToc";
import {
  toneDirections,
  abstractToConcreteExamples,
  claimEvidenceFormulas,
  heroFormulas,
  serviceIntroTemplates,
  caseStudyTemplates,
  expertProfileTemplates,
  industryProblemTemplates,
  insightTitleFormulas,
  faqWritingRules,
  ctaLibrary,
  noMetricsAlternatives,
  prohibitedExpressions,
  numberDisplayRules,
  avoidSentences,
} from "@/data/contentRules";

const ContentGuide = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="Content & Copy"
        title="콘텐츠 가이드"
        description="컨설팅 업종에서 신뢰를 높이는 증거 기반 카피라이팅 원칙, 문장 공식, 템플릿, CTA 라이브러리를 정리합니다."
      />

      {/* 빠른 적용 포인트 */}
      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 모든 주장에는 반드시 근거(수치, 사례, 프로세스)를 연결하세요.</li>
          <li>• 예시 데이터는 반드시 <BadgeLabel type="proof">예시 데이터</BadgeLabel> 표기를 하세요.</li>
          <li>• 금지 표현 목록을 확인하고, 검증 불가한 표현은 사용하지 마세요.</li>
        </ul>
      </div>

      {/* 톤 */}
      <SectionBlock id="tone" title="컨설팅 업종의 문장 톤">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✓ 지향하는 톤</h4>
            <InfoList items={toneDirections.positive} />
          </div>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
            <h4 className="font-semibold text-sm text-foreground mb-3">✕ 지양하는 톤</h4>
            <InfoList items={toneDirections.negative} />
          </div>
        </div>
      </SectionBlock>

      {/* 추상→구체 */}
      <SectionBlock id="abstraction-rule" title="추상적 표현을 구체화하는 규칙">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">❌ 추상적</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">✅ 구체적</th>
              </tr>
            </thead>
            <tbody>
              {abstractToConcreteExamples.map((item) => (
                <tr key={item.bad} className="border-b last:border-b-0">
                  <td className="p-3 text-muted-foreground text-xs">{item.bad}</td>
                  <td className="p-3 text-foreground text-xs">{item.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* 주장+근거 공식 */}
      <SectionBlock id="claim-evidence" title="주장과 근거를 연결하는 문장 공식">
        <div className="space-y-3">
          {claimEvidenceFormulas.map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <BadgeLabel type="required">{item.label}</BadgeLabel>
              </div>
              <p className="text-xs font-mono text-accent mb-2">{item.formula}</p>
              <p className="text-xs text-muted-foreground italic">{item.example}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* PSR 구조 */}
      <SectionBlock id="psr-structure" title="문제 → 해결 → 성과 서술 구조">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold text-foreground">1. 문제 (Problem)</span>
              <p className="text-muted-foreground mt-1">"고객사는 급변하는 시장에서 기존 사업 모델의 수익성 저하에 직면했습니다."</p>
            </div>
            <div>
              <span className="font-semibold text-foreground">2. 해결 (Solution)</span>
              <p className="text-muted-foreground mt-1">"시장 분석, 경쟁 벤치마크, 고객 인터뷰를 기반으로 신규 수익 모델 3가지를 설계하고, 파일럿 테스트를 진행했습니다."</p>
            </div>
            <div>
              <span className="font-semibold text-foreground">3. 성과 (Result)</span>
              <p className="text-muted-foreground mt-1">"파일럿 3개월 만에 신규 채널 매출 비중이 15%에 도달했습니다." (예시 데이터)</p>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 히어로 카피 공식 */}
      <SectionBlock id="hero-formula" title="히어로 카피 공식">
        <div className="space-y-3">
          {heroFormulas.map((item) => (
            <div key={item.formula} className="rounded-lg border bg-card p-4">
              <span className="text-xs font-mono text-accent">{item.formula}</span>
              <p className="text-sm text-foreground mt-1">→ "{item.example}"</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 서비스 소개 템플릿 */}
      <SectionBlock id="service-template" title="서비스 소개 문장 템플릿">
        <div className="space-y-3">
          {serviceIntroTemplates.map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-5">
              <BadgeLabel type="optional">{item.label}</BadgeLabel>
              <p className="text-muted-foreground text-xs mt-2">
                <strong className="text-foreground">공식:</strong> {item.formula}
              </p>
              <p className="text-muted-foreground italic text-xs mt-1">예: "{item.example}"</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 사례 소개 템플릿 */}
      <SectionBlock id="case-template" title="케이스 스터디 서술 구조">
        <div className="space-y-3">
          {caseStudyTemplates.map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-5">
              <BadgeLabel type="required">{item.label}</BadgeLabel>
              {"formula" in item && (
                <>
                  <p className="text-muted-foreground text-xs mt-2"><strong className="text-foreground">공식:</strong> {item.formula}</p>
                  <p className="text-muted-foreground italic text-xs mt-1">예: "{item.example}"</p>
                </>
              )}
              {"structure" in item && (
                <ol className="mt-2 space-y-1">
                  {item.structure.map((s, i) => (
                    <li key={i} className="text-xs text-muted-foreground">{i + 1}. {s}</li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 전문가 프로필 */}
      <SectionBlock id="expert-template" title="전문가 소개 문장 템플릿">
        <div className="space-y-3">
          {expertProfileTemplates.map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-5">
              <BadgeLabel type="optional">{item.label}</BadgeLabel>
              {"formula" in item && (
                <>
                  <p className="text-xs font-mono text-accent mt-2">{item.formula}</p>
                  <p className="text-xs text-muted-foreground italic mt-1">예: "{item.example}"</p>
                </>
              )}
              {"structure" in item && (
                <ul className="mt-2 space-y-1">
                  {item.structure.map((s, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 산업별 문제 정의 */}
      <SectionBlock id="industry-problems" title="산업별 문제 정의 문장 템플릿">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {industryProblemTemplates.map((item) => (
            <div key={item.industry} className="rounded-lg border bg-card p-4">
              <span className="text-xs font-semibold text-accent">{item.industry}</span>
              <p className="text-xs text-muted-foreground mt-1">{item.problem}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 인사이트 타이틀 공식 */}
      <SectionBlock id="insight-titles" title="인사이트/리포트 타이틀 공식">
        <div className="space-y-2">
          {insightTitleFormulas.map((item) => (
            <div key={item.formula} className="rounded-lg border bg-card p-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs font-mono text-accent shrink-0">{item.formula}</span>
              <span className="text-xs text-muted-foreground">→ "{item.example}"</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 숫자 표시 */}
      <SectionBlock id="numbers" title="숫자와 성과를 보여주는 방법">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={numberDisplayRules} />
        </div>
      </SectionBlock>

      {/* 성과 수치 없을 때 */}
      <SectionBlock id="no-metrics" title="성과 수치가 없을 때 대체 서술 규칙">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <InfoList items={noMetricsAlternatives} />
        </div>
      </SectionBlock>

      {/* FAQ 작성 */}
      <SectionBlock id="faq-writing" title="FAQ 작성 공식">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={faqWritingRules} />
        </div>
      </SectionBlock>

      {/* CTA 라이브러리 */}
      <SectionBlock id="cta-library" title="CTA 문구 라이브러리">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">위치</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">Primary CTA</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs hidden sm:table-cell">Secondary CTA</th>
              </tr>
            </thead>
            <tbody>
              {ctaLibrary.map((item) => (
                <tr key={item.context} className="border-b last:border-b-0">
                  <td className="p-3 text-xs text-muted-foreground">{item.context}</td>
                  <td className="p-3 text-xs font-medium text-accent">{item.primary}</td>
                  <td className="p-3 text-xs text-muted-foreground hidden sm:table-cell">{item.secondary || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* 금지 표현 */}
      <SectionBlock id="prohibited" title="금지 표현 — 검증 불가한 주장">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 overflow-hidden mb-4">
          <div className="px-4 py-2 border-b border-destructive/20">
            <span className="text-xs font-semibold text-destructive">⚠ 무근거 사용 금지 표현</span>
          </div>
          {prohibitedExpressions.unverifiableClaims.map((item) => (
            <div key={item.expression} className="flex items-start gap-3 px-4 py-2.5 border-b border-destructive/10 last:border-b-0">
              <span className="text-destructive text-xs shrink-0 mt-0.5">✕</span>
              <div>
                <span className="text-xs font-medium text-foreground">"{item.expression}"</span>
                <span className="text-xs text-muted-foreground ml-2">— {item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 모호한 표현 → 대체안 */}
      <SectionBlock id="vague" title="모호한 표현과 대체안">
        <div className="rounded-lg border bg-card overflow-hidden">
          {prohibitedExpressions.vagueExpressions.map((item) => (
            <div key={item.expression} className="flex items-start gap-3 px-4 py-2.5 border-b last:border-b-0">
              <span className="text-xs text-muted-foreground line-through">{item.expression}</span>
              <span className="text-xs text-accent">{item.alternative}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 허위 데이터 금지 */}
      <SectionBlock id="fabrication" title="허위 데이터 절대 금지 규칙">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
          <InfoList items={prohibitedExpressions.fabricationRules} />
        </div>
      </SectionBlock>

      {/* 피해야 할 문장 */}
      <SectionBlock id="avoid-sentences" title="피해야 할 문장 예시">
        <div className="space-y-2">
          {avoidSentences.map((item) => (
            <div key={item.sentence} className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <span className="text-destructive text-sm shrink-0">✕</span>
              <span className="text-xs text-foreground">"{item.sentence}" — {item.reason}</span>
            </div>
          ))}
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default ContentGuide;
