import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { InfoList } from "@/components/guide/InfoList";

const SeoGeo = () => {
  return (
    <AppLayout>
      <PageHeader
        badge="SEO / GEO"
        title="SEO · GEO 가이드"
        description="검색 엔진 최적화와 AI 검색 최적화를 위한 메타 태그, URL 구조, 구조화 데이터, 콘텐츠 전략을 정리합니다."
      />

      <SectionBlock id="meta-examples" title="페이지별 메타 타이틀 / 디스크립션 예시">
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-surface">
                <th className="text-left p-3 font-semibold text-foreground text-xs">페이지</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs">메타 타이틀 (60자 이내)</th>
                <th className="text-left p-3 font-semibold text-foreground text-xs hidden md:table-cell">메타 디스크립션 (160자 이내)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["홈", "[회사명] — [핵심 서비스] 전문 컨설팅", "[회사명]은 [타겟 산업]을 위한 [서비스]를 제공합니다. [성과 수치] (예시 데이터)"],
                ["서비스", "[서비스명] | [회사명]", "[서비스 한줄 설명]. [타겟]을 위한 맞춤형 솔루션. 무료 상담 가능."],
                ["사례", "프로젝트 사례 | [회사명]", "[산업별] 실제 프로젝트 사례와 성과를 확인하세요. [사례 수]+ 프로젝트 경험. (예시)"],
                ["회사소개", "[회사명] 소개 — 미션과 전문성", "[회사명]의 미션, 팀, 연혁을 소개합니다. [설립년도] 이래 [프로젝트수]+ 프로젝트 수행. (예시)"],
                ["문의", "문의하기 | [회사명]", "프로젝트 문의 및 무료 상담을 신청하세요. 영업일 1일 이내 회신."],
              ].map(([page, title, desc]) => (
                <tr key={page} className="border-b last:border-b-0">
                  <td className="p-3 font-medium text-foreground text-xs w-20">{page}</td>
                  <td className="p-3 text-xs text-muted-foreground">{title}</td>
                  <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

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

      <SectionBlock id="heading-structure" title="헤딩 구조 H1/H2/H3 규칙">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "H1: 페이지당 1개, 페이지의 핵심 주제를 담는 제목",
            "H2: 주요 섹션 제목, 페이지 내 3~8개 사용",
            "H3: H2 하위 항목, 세부 내용 구분",
            "H4 이하: 꼭 필요한 경우에만 사용",
            "헤딩은 순차적으로 — H1 → H2 → H3 순서, 건너뛰기 금지",
            "키워드를 자연스럽게 포함하되 과도한 키워드 스터핑 금지",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="internal-links" title="내부 링크 전략">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "서비스 페이지 → 관련 케이스 스터디 링크",
            "케이스 스터디 → 관련 서비스 페이지 링크",
            "인사이트 아티클 → 관련 서비스 및 사례 링크",
            "산업별 페이지 → 해당 산업 사례 + 관련 서비스",
            "팀 페이지 → 각 전문가의 담당 서비스/산업 링크",
            "모든 페이지 하단: CTA 배너 → 문의 페이지",
            "앵커 텍스트는 구체적으로: '자세히 보기' ✕ → '금융산업 사례 확인하기' ✓",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="structured-data" title="구조화 데이터 (JSON-LD)">
        <div className="space-y-3">
          {[
            { schema: "Organization", usage: "회사 소개 페이지, 모든 페이지 공통", fields: "name, url, logo, contactPoint, sameAs" },
            { schema: "Article / BlogPosting", usage: "인사이트/블로그 아티클", fields: "headline, author, datePublished, description, image" },
            { schema: "FAQPage", usage: "FAQ 섹션이 있는 모든 페이지", fields: "mainEntity: Question + acceptedAnswer" },
            { schema: "Service", usage: "서비스 상세 페이지", fields: "name, description, provider, areaServed" },
            { schema: "BreadcrumbList", usage: "2단계 이상 깊이의 모든 페이지", fields: "itemListElement: position, name, item" },
          ].map((item) => (
            <div key={item.schema} className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold text-sm text-foreground">{item.schema}</h4>
              <p className="text-xs text-muted-foreground mt-1">적용: {item.usage}</p>
              <p className="text-xs font-mono text-accent mt-1">{item.fields}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="og-twitter" title="Open Graph / Twitter 메타 설정">
        <div className="rounded-lg border bg-card p-5 font-mono text-xs text-muted-foreground space-y-1">
          <p>&lt;meta property="og:type" content="website" /&gt;</p>
          <p>&lt;meta property="og:title" content="[페이지 제목]" /&gt;</p>
          <p>&lt;meta property="og:description" content="[페이지 설명]" /&gt;</p>
          <p>&lt;meta property="og:image" content="[OG 이미지 URL - 1200x630px]" /&gt;</p>
          <p>&lt;meta property="og:url" content="[정규화된 URL]" /&gt;</p>
          <p>&lt;meta property="og:locale" content="ko_KR" /&gt;</p>
          <p className="mt-2">&lt;meta name="twitter:card" content="summary_large_image" /&gt;</p>
          <p>&lt;meta name="twitter:title" content="[페이지 제목]" /&gt;</p>
          <p>&lt;meta name="twitter:description" content="[페이지 설명]" /&gt;</p>
        </div>
      </SectionBlock>

      <SectionBlock id="sitemap-robots" title="sitemap.xml / robots.txt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">sitemap.xml</h4>
            <InfoList items={[
              "모든 공개 페이지를 포함",
              "lastmod 날짜를 정확히 설정",
              "priority: 홈(1.0), 서비스(0.9), 사례(0.8), 인사이트(0.7)",
              "changefreq: 인사이트(weekly), 기타(monthly)",
              "Google Search Console에 제출",
            ]} />
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h4 className="font-semibold text-sm text-foreground mb-2">robots.txt</h4>
            <InfoList items={[
              "User-agent: * Allow: /",
              "관리자/내부 페이지 Disallow 처리",
              "Sitemap: https://domain.com/sitemap.xml 포함",
              "크롤링 예산 낭비를 막기 위해 불필요한 경로 차단",
            ]} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="ai-search" title="AI 검색/요약에 최적화된 콘텐츠 구조">
        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <InfoList items={[
            "질문-답변 구조 활용: FAQ, '~란?' 형태의 섹션 제목",
            "핵심 정보를 문단 첫 문장에 배치 (인용 확률 증가)",
            "리스트, 표 형태로 정보를 구조화 (AI가 파싱하기 쉬움)",
            "명확한 헤딩 계층으로 주제 구분",
            "전문 용어에 대한 정의를 인라인 또는 별도 섹션으로 제공",
            "업데이트 날짜를 명시하여 정보 최신성 표시",
            "저자/전문가 정보를 Schema와 함께 제공 (E-E-A-T 강화)",
            "한 페이지 = 한 주제 원칙 유지",
          ]} />
        </div>
      </SectionBlock>

      <SectionBlock id="landing-pages" title="검색 유입용 랜딩 페이지 설계">
        <div className="rounded-lg border bg-card p-5">
          <InfoList items={[
            "타겟 키워드를 중심으로 한 독립 랜딩 페이지 제작",
            "예: '/services/digital-transformation-consulting' → '디지털 전환 컨설팅' 타겟",
            "페이지 구조: 키워드 H1 → 문제 정의 → 서비스 설명 → 사례 → CTA",
            "지역 타겟팅 필요 시: '/seoul-strategy-consulting' 등 지역 페이지",
            "각 랜딩 페이지에 고유한 title, description, canonical 설정",
            "내부 링크로 메인 서비스 페이지와 양방향 연결",
          ]} />
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default SeoGeo;
