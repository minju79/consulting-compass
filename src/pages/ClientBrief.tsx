import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { useState } from "react";

interface BriefField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "multi-select" | "boolean";
  placeholder?: string;
  options?: string[];
  category: string;
  helpText?: string;
}

const briefFields: BriefField[] = [
  // 기본 정보
  { id: "companyName", label: "회사명", type: "text", placeholder: "예: ABC 컨설팅", category: "기본 정보" },
  { id: "consultingType", label: "컨설팅 세부 유형", type: "select", options: ["경영 전략", "디지털 전환", "IT 컨설팅", "HR 컨설팅", "마케팅 전략", "재무 자문", "ESG 컨설팅", "M&A 자문", "운영 효율화", "기타"], category: "기본 정보" },
  { id: "coreServices", label: "핵심 서비스 라인", type: "textarea", placeholder: "주요 서비스 3~6개를 나열하세요", category: "기본 정보" },
  { id: "targetClients", label: "타겟 고객", type: "textarea", placeholder: "예: 연매출 500억 이상 중견기업, 금융/제조업 C레벨", category: "기본 정보" },
  { id: "industries", label: "주요 산업군", type: "textarea", placeholder: "예: 금융, 제조, 헬스케어, IT", category: "기본 정보" },
  { id: "regions", label: "주력 지역/시장", type: "text", placeholder: "예: 국내 + 동남아시아", category: "기본 정보" },
  { id: "projectScale", label: "평균 프로젝트 규모", type: "select", options: ["소규모 (1~3개월)", "중규모 (3~6개월)", "대규모 (6개월 이상)", "혼합"], category: "기본 정보" },
  { id: "salesMethod", label: "영업 방식", type: "select", options: ["인바운드 중심 (문의 유입)", "아웃바운드 중심 (직접 영업)", "네트워크/소개 중심", "혼합"], category: "기본 정보" },

  // 전환 전략
  { id: "primaryCta", label: "핵심 CTA 우선순위", type: "select", options: ["상담 문의", "프로젝트 문의", "무료 진단 신청", "리포트 다운로드", "세미나 참가", "전화 상담"], category: "전환 전략" },
  { id: "leadMethod", label: "리드 수집 방식", type: "multi-select", options: ["문의 폼", "전화", "이메일", "다운로드 폼", "세미나 등록", "챗봇"], category: "전환 전략" },

  // 증거 자산
  { id: "hasCases", label: "대표 케이스 보유 여부", type: "boolean", category: "증거 자산" },
  { id: "hasClientLogos", label: "고객사 로고 사용 가능 여부", type: "boolean", category: "증거 자산" },
  { id: "hasMetrics", label: "성과 수치 공개 가능 여부", type: "boolean", category: "증거 자산" },
  { id: "hasTestimonials", label: "추천사/레퍼런스 보유 여부", type: "boolean", category: "증거 자산" },
  { id: "hasExpertProfiles", label: "전문가 프로필 보유 여부", type: "boolean", category: "증거 자산" },
  { id: "hasInsights", label: "인사이트/블로그 운영 여부", type: "boolean", category: "증거 자산" },
  { id: "hasDownloads", label: "다운로드 리소스 운영 여부", type: "boolean", category: "증거 자산" },
  { id: "hasWebinars", label: "세미나/웨비나 운영 여부", type: "boolean", category: "증거 자산" },

  // 브랜드·에셋
  { id: "brandTone", label: "브랜드 톤", type: "select", options: ["Corporate (보수적·신뢰)", "Modern (현대적·세련)", "Boutique (부티크·전문)", "Bold (대담·주도적)", "Warm (따뜻·친근)"], category: "브랜드" },
  { id: "hasBrandAssets", label: "사진/브랜드 에셋 보유 여부", type: "boolean", category: "브랜드" },
  { id: "needsMultilang", label: "다국어 필요 여부", type: "boolean", category: "브랜드" },

  // 제약 조건
  { id: "requiredPages", label: "필수 페이지", type: "textarea", placeholder: "예: 홈, 서비스, 사례, 팀, 문의", category: "요구사항" },
  { id: "prohibitedExpressions", label: "금지 표현", type: "textarea", placeholder: "예: 업계 최고, 유일, 1위", category: "요구사항", helpText: "검증 불가한 주장이나 브랜드 정책상 금지 표현" },
  { id: "claimsToReview", label: "검토 필요한 대외 주장", type: "textarea", placeholder: "예: '국내 최초 도입' — 검증 필요", category: "요구사항", helpText: "사용 전 팩트체크가 필요한 표현 목록" },
  { id: "competitorNotes", label: "경쟁사 포지셔닝 메모", type: "textarea", placeholder: "경쟁사 대비 차별화 포인트 정리", category: "요구사항" },
];

const ClientBrief = () => {
  const [formData, setFormData] = useState<Record<string, string | boolean | string[]>>({});
  const categories = [...new Set(briefFields.map((f) => f.category))];

  const updateField = (id: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <AppLayout>
      <PageHeader
        badge="Client Brief Tool"
        title="고객사 브리프"
        description="컨설팅 고객사의 정보를 체계적으로 수집·정리하여 사이트 제작 청사진의 기초 데이터를 구성합니다."
      />

      <div className="rounded-lg border bg-accent/5 border-accent/20 p-4 mb-8">
        <p className="text-sm text-foreground font-medium mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 모든 필드를 채우지 않아도 됩니다. 확보된 정보부터 입력하세요.</li>
          <li>• 이 브리프를 기반으로 Site Blueprint 페이지에서 사이트 구조를 도출합니다.</li>
          <li>• 증거 자산(사례, 로고, 수치 등) 보유 여부가 사이트 구조에 직접 영향을 줍니다.</li>
        </ul>
      </div>

      {categories.map((cat) => (
        <SectionBlock key={cat} id={cat.replace(/\s/g, "-")} title={cat}>
          <div className="space-y-4">
            {briefFields.filter((f) => f.category === cat).map((field) => (
              <div key={field.id} className="rounded-lg border bg-card p-4">
                <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-1">
                  {field.label}
                </label>
                {field.helpText && (
                  <p className="text-xs text-muted-foreground mb-2">{field.helpText}</p>
                )}
                {field.type === "text" && (
                  <input
                    id={field.id}
                    type="text"
                    placeholder={field.placeholder}
                    value={(formData[field.id] as string) || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={(formData[field.id] as string) || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    rows={3}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                  />
                )}
                {field.type === "select" && field.options && (
                  <select
                    id={field.id}
                    value={(formData[field.id] as string) || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">선택하세요</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {field.type === "multi-select" && field.options && (
                  <div className="flex flex-wrap gap-2">
                    {field.options.map((opt) => {
                      const selected = Array.isArray(formData[field.id]) && (formData[field.id] as string[]).includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            const current = (formData[field.id] as string[]) || [];
                            const next = selected ? current.filter((v) => v !== opt) : [...current, opt];
                            updateField(field.id, next);
                          }}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            selected
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-background text-muted-foreground border-border hover:border-accent/50"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
                {field.type === "boolean" && (
                  <div className="flex gap-3">
                    {["예", "아니오"].map((opt) => {
                      const isYes = opt === "예";
                      const active = formData[field.id] === isYes;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateField(field.id, isYes)}
                          className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-background text-muted-foreground border-border hover:border-accent/50"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionBlock>
      ))}

      <SectionBlock id="summary" title="브리프 요약">
        <div className="rounded-lg border bg-surface p-5 text-sm text-muted-foreground">
          <p className="mb-3 text-foreground font-medium">입력된 정보 현황:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => {
              const fields = briefFields.filter((f) => f.category === cat);
              const filled = fields.filter((f) => {
                const v = formData[f.id];
                if (typeof v === "boolean") return true;
                if (Array.isArray(v)) return v.length > 0;
                return !!v;
              }).length;
              return (
                <div key={cat} className="rounded-md border bg-card p-3">
                  <span className="text-xs text-muted-foreground">{cat}</span>
                  <p className="text-sm font-medium text-foreground">{filled}/{fields.length} 항목</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionBlock>
    </AppLayout>
  );
};

export default ClientBrief;
