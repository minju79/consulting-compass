import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import {
  metaTemplates,
  canonicalStrategy,
  internalLinkMap,
  jsonLdExamples,
  landingPageRules,
  sitemapStructure,
  robotsTxtExample,
  ogTwitterExample,
  headingStructureExample,
  aiSearchOptimization,
} from "@/data/seoRules";

const SeoGeo = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="SEO / GEO"
        title="SEO · GEO 가이드"
        description="검색 엔진 최적화와 AI 검색 최적화를 위한 실행형 가이드입니다. 메타 태그, JSON-LD, URL 구조, 콘텐츠 전략까지 실제 코드 예시를 제공합니다."
      />

      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 모든 페이지에 고유한 title(60자), description(160자), canonical을 설정하세요.</li>
          <li>• JSON-LD는 Organization(전체), FAQPage(FAQ 있는 페이지), Article(인사이트)을 우선 적용하세요.</li>
          <li>• 이 가이드의 코드 블록은 복사·수정하여 바로 사용할 수 있습니다.</li>
        </ul>
      </div>

      {/* 메타 템플릿 */}
      <SectionBlock id="meta-templates" title="페이지별 메타 타이틀 / 디스크립션 템플릿">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">페이지</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">메타 타이틀</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs hidden lg:table-cell">검색 의도</th>
              </tr>
            </thead>
            <tbody>
              {metaTemplates.map((item) => (
                <tr key={item.page} className="border-b last:border-b-0">
                  <td className="p-3 font-medium text-foreground text-xs w-24">{item.page}</td>
                  <td className="p-3 text-xs text-muted-foreground">
                    <div>{item.title}</div>
                    <div className="text-[10px] mt-1 text-muted-foreground/70">{item.description}</div>
                  </td>
                  <td className="p-3 text-xs text-accent hidden lg:table-cell">{item.searchIntent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* Canonical 전략 */}
      <SectionBlock id="canonical" title="Canonical URL 전략">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={canonicalStrategy} />
        </div>
      </SectionBlock>

      {/* Heading 구조 */}
      <SectionBlock id="heading-structure" title="헤딩 구조 예시">
        <div className="rounded-lg border bg-card overflow-hidden">
          {headingStructureExample.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-b-0">
              <span className={`font-mono text-xs font-bold w-8 shrink-0 ${item.tag === "H1" ? "text-accent" : "text-muted-foreground"}`}>{item.tag}</span>
              <span className="text-xs text-foreground flex-1">{item.text}</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{item.rule}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* URL 구조 */}
      <SectionBlock id="url-structure" title="URL 구조 예시">
        <div className="rounded-lg border bg-card p-5 font-mono text-xs space-y-2 text-muted-foreground">
          <p>/services/digital-transformation</p>
          <p>/services/strategy-consulting</p>
          <p>/industries/finance</p>
          <p>/industries/healthcare</p>
          <p>/case-studies/finance-crm-optimization</p>
          <p>/insights/2025-digital-transformation-trends</p>
          <p>/team</p>
          <p>/contact</p>
          <p>/about</p>
        </div>
        <div className="mt-3 rounded-lg border bg-surface p-4">
          <InfoList items={[
            "소문자, 하이픈 구분, 의미 있는 단어 사용",
            "깊이 3단계 이내 유지 (/카테고리/하위/상세)",
            "날짜 기반 URL은 인사이트/블로그에만 사용",
            "파라미터 대신 정적 경로 우선",
          ]} />
        </div>
      </SectionBlock>

      {/* 내부 링크 맵 */}
      <SectionBlock id="internal-links" title="내부 링크 맵">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">출발 페이지</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">연결 대상</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs hidden sm:table-cell">앵커 텍스트 예시</th>
              </tr>
            </thead>
            <tbody>
              {internalLinkMap.map((item) => (
                <tr key={item.from} className="border-b last:border-b-0">
                  <td className="p-3 text-xs text-foreground">{item.from}</td>
                  <td className="p-3 text-xs text-muted-foreground">{item.to}</td>
                  <td className="p-3 text-xs text-accent font-mono hidden sm:table-cell">{item.anchor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* JSON-LD 코드 예시 */}
      <SectionBlock id="json-ld" title="JSON-LD 구조화 데이터 코드 예시">
        <div className="space-y-4">
          {jsonLdExamples.map((item) => (
            <div key={item.schema} className="rounded-lg border bg-card overflow-hidden">
              <div className="px-4 py-2 bg-surface border-b flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{item.schema}</span>
                <BadgeLabel type="seo" />
              </div>
              <div className="px-4 py-2">
                <p className="text-xs text-muted-foreground mb-2">적용: {item.usage}</p>
                <pre className="text-[11px] font-mono text-accent bg-surface/50 rounded p-3 overflow-x-auto whitespace-pre-wrap">{item.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* OG / Twitter */}
      <SectionBlock id="og-twitter" title="Open Graph / Twitter 메타 코드 예시">
        <div className="rounded-lg border bg-card overflow-hidden">
          <pre className="text-[11px] font-mono text-muted-foreground p-4 overflow-x-auto whitespace-pre-wrap">{ogTwitterExample}</pre>
        </div>
      </SectionBlock>

      {/* sitemap 예시 */}
      <SectionBlock id="sitemap" title="sitemap.xml 구조 예시">
        <div className="rounded-lg border bg-card overflow-hidden">
          <pre className="text-[11px] font-mono text-muted-foreground p-4 overflow-x-auto whitespace-pre-wrap">{sitemapStructure}</pre>
        </div>
      </SectionBlock>

      {/* robots.txt 예시 */}
      <SectionBlock id="robots" title="robots.txt 예시">
        <div className="rounded-lg border bg-card overflow-hidden">
          <pre className="text-[11px] font-mono text-muted-foreground p-4 overflow-x-auto whitespace-pre-wrap">{robotsTxtExample}</pre>
        </div>
      </SectionBlock>

      {/* 랜딩 페이지 규칙 */}
      <SectionBlock id="landing-pages" title="검색 유입용 랜딩 페이지 설계">
        <div className="rounded-lg border bg-card overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">패턴</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">URL 예시</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs hidden sm:table-cell">타겟 키워드</th>
              </tr>
            </thead>
            <tbody>
              {landingPageRules.map((item) => (
                <tr key={item.pattern} className="border-b last:border-b-0">
                  <td className="p-3 text-xs font-medium text-foreground">{item.pattern}</td>
                  <td className="p-3 text-xs font-mono text-accent">{item.example}</td>
                  <td className="p-3 text-xs text-muted-foreground hidden sm:table-cell">{item.keyword}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border bg-surface p-4">
          <InfoList items={[
            "각 랜딩 페이지에 고유한 title, description, canonical 설정",
            "페이지 구조: 키워드 H1 → 문제 정의 → 서비스 설명 → 사례 → CTA",
            "내부 링크로 메인 서비스 페이지와 양방향 연결",
            "지역 타겟팅 필요 시 지역명 + 서비스 조합 URL 활용",
          ]} />
        </div>
      </SectionBlock>

      {/* AI 검색 최적화 */}
      <SectionBlock id="ai-search" title="AI 검색/요약에 최적화된 콘텐츠 구조">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <InfoList items={aiSearchOptimization} />
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default SeoGeo;
