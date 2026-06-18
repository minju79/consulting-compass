import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Target,
  ExternalLink,
  Copy,
  Check,
  Building,
  Smartphone,
  Cpu,
  BookOpen,
} from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getRouteMeta } from "@/data/routeMeta";

const promptTemplates = [
  {
    id: "real-estate-clause",
    title: "🏠 부동산 특약 및 계약 리스크 분석",
    description: "거래 시 발생할 수 있는 잠재적 분쟁을 방지하고 법적 보호 장치를 마련하는 특약 조건 자동 생성 프롬프트입니다.",
    systemPrompt: "당신은 10년 경력의 공인중개사이자 부동산 전문 변호사 보조입니다. 사용자가 입력한 계약 상황에 맞는 법적 보호 특약 문구를 작성하세요.",
    userPrompt: `[계약 조건 정보]
- 거래 유형: 아파트 전세 계약
- 보증금액: 3억원
- 임대인 요구: 잔금일 즉시 등기 이전 및 대출 실행 예정
- 임차인 우려사항: 전입신고 및 확정일자 대항력 발생 전 임대인의 담보대출 설정 리스크 차단

[작성 지침]
위 조건에서 임차인의 대항력을 확보하고 보증금을 보호할 수 있는 실무용 특약 문구 3가지를 명확한 법률 용어로 작성해 주세요.`,
  },
  {
    id: "youtube-script",
    title: "🎥 유튜브 숏폼/대본 기획",
    description: "시청자의 주의를 끄는 후킹 문구와 핵심 가치 중심의 구조적 영상 스크립트를 생성합니다.",
    systemPrompt: "당신은 AI 자동화 및 실무 생산성 전문 유튜브 크리에이터이자 카피라이터입니다. 시청률과 이탈 방지를 고려한 60초 이내의 숏폼 스크립트를 작성하세요.",
    userPrompt: `[주제 및 대상]
- 영상 주제: AI 직원 10명으로 업무 10배 자동화하는 방법
- 타겟 독자: 1인 지식창업자 및 부동산 소상공인
- 핵심 혜택: 반복 단순 업무(광고문 쓰기, 메일 발송, 예약 관리) 0원으로 자동화하기

[구조 지침]
1. 0~5초: 강력한 의문 제기 또는 통계 수치 기반의 후킹 (Hook)
2. 5~45초: 핵심 솔루션 제안 및 단계별 프로세스 (Body)
3. 45~60초: 즉시 실행 방법 및 무료 상담 유도 CTA (Call to Action)`,
  },
  {
    id: "instagram-post",
    title: "📱 소상공인 SNS 홍보/광고 카피",
    description: "카페, 미용실, 학원 등 오프라인 매장의 강점을 살려 인스타그램 톤앤매너에 맞는 해시태그 포함 홍보글을 작성합니다.",
    systemPrompt: "당신은 트렌디한 인스타그램 마케터입니다. 이모지를 활용하고 가독성을 높인 친근한 말투의 SNS 카드뉴스 본문 카피를 작성하세요.",
    userPrompt: `[매장 정보]
- 매장명: 나두카페 (NADOO CAFE)
- 홍보 내용: 유기농 말차 빙수 출시 및 여름 맞이 인근 상가 직장인 10% 상생 할인 이벤트
- 타겟: 인근 테크노밸리 근무 직장인

[작성 규칙]
1. 한 줄 요약 후킹 제목 (첫 문장)
2. 본문 내용 (가독성 좋은 줄바꿈 및 이모지 활용)
3. 이벤트 기간 및 참여 혜택 정리
4. 클릭을 유도하는 행동 유도 (프로필 링크 클릭)
5. 타겟팅이 포함된 해시태그 10개`,
  },
  {
    id: "blog-seo",
    title: "✍️ 블로그 상위 노출 SEO 글쓰기",
    description: "네이버, 구글 검색 엔진이 선호하는 정보성 문서 구조로 키워드를 적절히 배치하여 신뢰성을 주는 칼럼형 글을 생성합니다.",
    systemPrompt: "당신은 검색 엔진 최적화(SEO) 및 검색 생성 최적화(GEO) 마케팅 전문가입니다. 키워드를 본문에 골고루 배치하고 가치가 높은 정보성 글을 작성하세요.",
    userPrompt: `[핵심 키워드]
- 메인 키워드: AI 소상공인 자동화, 업무 생산성
- 서브 키워드: AI 마케팅, 인스타그램 자동화, 실무 자동화

[글 개요 및 지침]
- 제목: AI 기술로 소상공인 매출 200% 상승시킨 실무 자동화 가이드
- 서론: 오프라인 매장 운영 시 시간이 부족한 실태 공감
- 본문 1: AI 자동화가 필요한 이유 (인건비 절감, 마케팅 효율)
- 본문 2: 즉시 적용 가능한 3가지 자동화 루트 (리뷰 답글, SNS 포스팅, 예약)
- 결론: 1인 기업과 소상공인이 취해야 할 액션 플랜`,
  },
  {
    id: "tm-script",
    title: "📞 비즈니스 상담 TM/상담 스크립트",
    description: "문의가 인바운드로 유입되었거나 아웃바운드 시 신뢰를 형성하고 결제를 설득하는 구조적 콜 스크립트입니다.",
    systemPrompt: "당신은 B2B 전문 고성과 영업 컨설턴트입니다. 정중하고 전문적이면서도 고객의 페인포인트(Pain point)를 짚어 상담 예약을 성공시키는 스크립트를 작성하세요.",
    userPrompt: `[상담 시나리오]
- 상황: 부동산 소상공인이 매물 분석 자동화 서비스에 관심을 가지고 웹사이트에 문의를 남김
- 전화 목적: 맞춤 심층 1:1 진단 미팅(유료 또는 심화 무료) 예약 확정

[구성 가이드]
1. 정중한 도입부 및 문의 감사 인사
2. 상대방의 현재 업무 병목 파악 질문 (질문형 경청)
3. 맞춤형 성공 사례 제시 (예: 대구 공인중개업소의 시간 절감 사례)
4. 미팅 제안 및 대안적 약속 시간 제시 (이중 택일법)`,
  },
];

const showcaseMetadata = {
  name: "NADOO_AI 맞춤제작&컨설팅",
  siteUrl: "https://nadooai-ay4nv8rj.manus.space/",
  tagline: "AI 직원 10명으로 만드는 부동산·소상공인 실무 자동화 OS",
  colors: {
    primary: "딥 퍼플 (#1A0B2E / HSL 262 47% 16%)",
    accent: "라벤더 퍼플 (#8F58F2 / HSL 262 75% 58%)",
    background: "소프트 퍼플 그레이 (HSL 262 30% 98.5%)",
  },
  trustPoints: [
    { title: "현업 기반 전문성", desc: "10년 경력의 공인중개사/부동산 전문 경험 결합" },
    { title: "실제 구현 실적", desc: "100여 개 이상의 맞춤형 AI GPTs 및 업무 자동화 앱 자체 빌드" },
    { title: "출간 및 평점 검증", desc: "크몽 평점 5.0 부동산 자동화 가이드 전자책 저자" },
    { title: "커뮤니티 검증", desc: "유튜브 채널 및 네이버 카페를 통한 활발한 지식 공유" },
  ],
  services: [
    {
      title: "🏠 AI 부동산 실무 자동화",
      desc: "매물 분석 보고서, 네이버 블로그 광고문 카피 작성, 맞춤형 특약 조건 검토, 고객 TM/상담 스크립트 도구를 자동화 시스템으로 세팅.",
    },
    {
      title: "🏪 AI 소상공인 매출 자동화",
      desc: "인스타그램 릴스/포스팅 광고 카피, 고객 이탈 방지 리뷰 자동 답글, 카카오톡 채널 예약 응대 가이드를 1초 만에 생성하는 빌더 구축.",
    },
    {
      title: "👥 AI 직원 10명 팀 구축",
      desc: "마케팅 사원, 블로그 작성 파트너, 특약 리스크 분석 변호사 보조, 기획 실무 담당자 등 직무별 맞춤 GPTs 팀을 구축하고 업무 권한 분배.",
    },
    {
      title: "📊 Sheet & API 연동 자동화",
      desc: "Google Spreadsheet와 GAS(Google Apps Script), OpenAI API 및 다수의 크롤링 엔진을 하나로 연동하여 입력과 보고서 출력을 무인화.",
    },
  ],
};

export default function NadooAiShowcase() {
  const pathname = "/showcase/nadoo-ai";
  usePageMeta(getRouteMeta(pathname), pathname);

  const [activePrompt, setActivePrompt] = useState(promptTemplates[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppLayout>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          Practical Case Study
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight mb-4 text-balance">
          실전 사례: NADOO.AI 맞춤제작&컨설팅
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
          본 시스템의 <strong>연한 퍼플 디자인 가이드</strong>와 <strong>B2B 신뢰 증거 체계</strong>가 실제 AI 업무자동화 컨설팅사에 어떻게 구현되어 있는지 상세히 분석합니다.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={showcaseMetadata.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-md bg-accent text-accent-foreground px-4 py-2 hover:bg-accent/90 transition-colors"
          >
            실제 사이트 보기 <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="mt-8 h-px bg-border" />
      </motion.div>

      {/* 1. 디자인 및 기획 분석 */}
      <SectionBlock
        id="case-analysis"
        title="1. 기획 및 디자인 시스템 분석"
        description="전문 지식 컨설팅 업종에 필요한 신뢰감 형성과 브랜드 고유 정체성 결합 방식입니다."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 가치 카드 */}
          <div className="border rounded-lg p-5 bg-card flex flex-col justify-between">
            <div>
              <div className="text-accent mb-3">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1.5">명확한 타겟 소구</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                단순 포괄적 AI 강의가 아닌 &ldquo;부동산 공인중개업&rdquo;과 &ldquo;소상공인 오프라인 매장&rdquo;이라는 매우 세부적이고 구체적인 페인 포인트를 타겟하여 설득력을 극대화했습니다.
              </p>
            </div>
          </div>

          {/* 컬러 시스템 */}
          <div className="border rounded-lg p-5 bg-card flex flex-col justify-between">
            <div>
              <div className="text-accent mb-3">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1.5">디자인 무드 및 컬러</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                신기술과 AI를 연상시키는 <strong>퍼플(#8F58F2)</strong> 계열의 액센트 컬러와 고대비 딥 블랙·퍼플 헤더를 사용하여 깔끔하고 최첨단이면서도 정돈된 B2B의 차분함을 전달합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t text-[10px] text-muted-foreground space-y-1">
              <div>• Primary: {showcaseMetadata.colors.primary}</div>
              <div>• Accent: {showcaseMetadata.colors.accent}</div>
            </div>
          </div>

          {/* 신뢰 증거 체계 */}
          <div className="border rounded-lg p-5 bg-card flex flex-col justify-between">
            <div>
              <div className="text-accent mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1.5">신뢰 증거(Proof) 매칭</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                단순 주장 대신 &ldquo;실무 경력 10년&rdquo;, &ldquo;100여 개 빌드 경험&rdquo;, &ldquo;평점 5.0 도서 출간&rdquo; 등 실질적인 숫자를 제시하여 잠재 고객의 심리적 의심을 제거합니다.
              </p>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 2. 핵심 서비스 분석 */}
      <SectionBlock
        id="service-tax"
        title="2. 서비스 메뉴 및 구조 설계 (Taxonomy)"
        description="컨설팅이 제공하는 전문 역량을 4가지 직관적인 모듈로 그룹화하여 전달하고 있습니다."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {showcaseMetadata.services.map((service, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-surface border hover:shadow-sm transition-shadow">
              <h4 className="font-bold text-sm text-foreground mb-1">{service.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 3. 인터랙티브 컴포넌트 프리뷰 (홈페이지 일부 가상 구현) */}
      <SectionBlock
        id="interactive-preview"
        title="3. 실제 랜딩페이지 UI 컴포넌트 프리뷰"
        description="메인 페이지 헤더와 전환 요소를 연한 퍼플 무드로 시각화한 컴포넌트 예시입니다."
      >
        <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
          {/* 가상 헤더 */}
          <div className="px-5 py-4 border-b bg-card flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold font-display">
                N
              </div>
              <span className="font-bold text-sm tracking-tight">NADOO.AI</span>
            </div>
            <div className="flex gap-4 text-xs font-medium text-muted-foreground">
              <span>부동산 자동화</span>
              <span>소상공인 마케팅</span>
              <span>AI 직원팀</span>
            </div>
          </div>

          {/* 가상 히어로 영역 */}
          <div className="p-8 md:p-12 text-center bg-gradient-to-b from-card to-background relative overflow-hidden">
            {/* 배경 블러 효과 */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            <span className="inline-block text-[10px] font-bold tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-4">
              AI 직원 10명으로 시작하는 실무 자동화
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4">
              부동산·소상공인 업무를 <br />
              <span className="text-accent">완전 무인 자동화 OS</span>로 전환하세요
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
              매물 수집, 계약 특약 검토, 블로그 포스팅 광고, 영수증 정리까지— <br />
              단순 반복 업무에 빼앗기던 시간을 본질적인 영업 마케팅에 투자하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://nadooai-ay4nv8rj.manus.space/links"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-md hover:bg-primary/95 transition-colors"
              >
                AI 자동화 무료 상담 <Smartphone className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://kmong.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 border bg-card text-foreground text-xs font-bold px-4 py-2.5 rounded-md hover:bg-secondary transition-colors"
              >
                부동산 자동화 전자책 <BookOpen className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* 신뢰 지표 요약 배지 */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 pt-6 border-t border-border/60">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">10년+</div>
                <div className="text-[10px] text-muted-foreground">부동산 현업 경력</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">100개+</div>
                <div className="text-[10px] text-muted-foreground">AI 솔루션 구현</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">5.0 / 5.0</div>
                <div className="text-[10px] text-muted-foreground">크몽 도서 평점</div>
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 4. 인터랙티브 프롬프트 복사기 */}
      <SectionBlock
        id="prompt-directory"
        title="4. 실무형 AI 프롬프트 라이브러리 (데모 도구)"
        description="실무에 바로 복사하여 사용할 수 있는 NADOO.AI 스타일의 자동화 프롬프트 템플릿입니다."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 좌측 프롬프트 선택 목록 */}
          <div className="lg:col-span-1 space-y-2">
            {promptTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setActivePrompt(template)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs font-medium ${
                  activePrompt.id === template.id
                    ? "border-accent bg-accent/5 text-foreground ring-1 ring-accent"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                {template.title}
              </button>
            ))}
          </div>

          {/* 우측 프롬프트 상세 및 복사 영역 */}
          <div className="lg:col-span-2 border rounded-lg bg-card p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-sm text-foreground">{activePrompt.title}</h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                  지침 가이드 포함
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {activePrompt.description}
              </p>

              {/* 시스템 프롬프트 */}
              <div className="mb-4">
                <h5 className="text-xs font-bold text-foreground mb-1">System Prompt (시스템 역할 부여)</h5>
                <div className="bg-surface p-2.5 rounded border text-[11px] font-mono leading-relaxed text-muted-foreground">
                  {activePrompt.systemPrompt}
                </div>
              </div>

              {/* 사용자 프롬프트 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h5 className="text-xs font-bold text-foreground">User Prompt (복사용 템플릿)</h5>
                  <button
                    onClick={() => handleCopy(activePrompt.userPrompt, "user-prompt")}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent hover:underline"
                  >
                    {copiedId === "user-prompt" ? (
                      <>
                        <Check className="h-3 w-3" /> 복사 완료
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> 텍스트 복사
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-surface p-3.5 rounded border text-[11px] font-mono leading-relaxed text-foreground overflow-x-auto whitespace-pre-wrap">
                  {activePrompt.userPrompt}
                </pre>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t text-[10px] text-muted-foreground">
              💡 <strong>사용 팁:</strong> 복사한 프롬프트를 ChatGPT, Claude 또는 기타 AI 모델에 붙여넣고 세부 매물 정보나 본인의 비즈니스 특징을 괄호 안의 데이터와 변경하여 사용해 보세요.
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 5. 성과 증거 체계 분석 */}
      <SectionBlock
        id="proof-analysis"
        title="5. 신뢰 요소 런칭 점검표 대비"
        description="이 사이트가 Consulting Guide의 '신뢰 증거 체계' 규칙에 부합하는지 평가합니다."
      >
        <div className="border rounded-lg overflow-hidden bg-card">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b">
                <th className="p-3 font-semibold text-foreground">가이드 요구 증거 유형</th>
                <th className="p-3 font-semibold text-foreground">NADOO.AI 적용 여부 및 증명 자료</th>
                <th className="p-3 font-semibold text-foreground">신뢰도 평가</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-b-0 hover:bg-surface/30 transition-colors">
                <td className="p-3 font-bold">1. 정량적 경력/실적</td>
                <td className="p-3 leading-relaxed">
                  &ldquo;부동산 현업 10년&rdquo;, &ldquo;업무자동화 100개 제작&rdquo; 등 명확한 수치를 첫 화면(Above the fold)에 배지 형태로 바로 노출.
                </td>
                <td className="p-3 font-semibold text-accent">★★★★★ 최상</td>
              </tr>
              <tr className="border-b last:border-b-0 hover:bg-surface/30 transition-colors">
                <td className="p-3 font-bold">2. 서적 출간/지식 증명</td>
                <td className="p-3 leading-relaxed">
                  크몽 전자책 출판 이력과 더불어 <strong>평점 5.0</strong>을 획득했음을 시각적으로 명시하여 학술적/실무적 신뢰를 증폭.
                </td>
                <td className="p-3 font-semibold text-accent">★★★★★ 최상</td>
              </tr>
              <tr className="border-b last:border-b-0 hover:bg-surface/30 transition-colors">
                <td className="p-3 font-bold">3. 실제 사용 리뷰</td>
                <td className="p-3 leading-relaxed">
                  크몽 리뷰 및 커뮤니티(네이버 카페) 회원의 생생한 피드백을 연결 통로로 제공.
                </td>
                <td className="p-3 font-semibold text-accent">★★★★☆ 우수</td>
              </tr>
              <tr className="border-b last:border-b-0 hover:bg-surface/30 transition-colors">
                <td className="p-3 font-bold">4. 커뮤니티/외부 평판</td>
                <td className="p-3 leading-relaxed">
                  YouTube 동영상 기반 튜토리얼을 다수 확보하여 방문자가 &ldquo;이 회사가 실제로 동작하는 자동화 도구를 만드는지&rdquo; 바로 눈으로 확인 가능.
                </td>
                <td className="p-3 font-semibold text-accent">★★★★★ 최상</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionBlock>
    </AppLayout>
  );
}
