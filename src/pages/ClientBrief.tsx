import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { BadgeLabel } from "@/components/guide/BadgeLabel";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Download, Upload, RotateCcw, Sparkles, Save } from "lucide-react";
import {
  BriefData,
  emptyBrief,
  exampleBrief,
  loadBrief,
  saveBrief,
  exportBriefJson,
  importBriefJson,
  analyzeBrief,
  BRIEF_SCHEMA_VERSION,
} from "@/lib/brief";
import { Link } from "react-router-dom";

interface BriefField {
  id: keyof BriefData;
  label: string;
  type: "text" | "textarea" | "select" | "multi-select" | "boolean";
  placeholder?: string;
  options?: string[];
  category: string;
  helpText?: string;
  required?: boolean;
}

const briefFields: BriefField[] = [
  { id: "companyName", label: "회사명", type: "text", placeholder: "예: ABC 컨설팅", category: "기본 정보", required: true },
  { id: "consultingType", label: "컨설팅 세부 유형", type: "select", options: ["경영 전략", "디지털 전환", "IT 컨설팅", "HR 컨설팅", "마케팅 전략", "재무 자문", "ESG 컨설팅", "M&A 자문", "운영 효율화", "기타"], category: "기본 정보", required: true },
  { id: "coreServices", label: "핵심 서비스 라인", type: "textarea", placeholder: "주요 서비스 3~6개를 나열하세요", category: "기본 정보", required: true },
  { id: "targetClients", label: "타겟 고객", type: "textarea", placeholder: "예: 연매출 500억 이상 중견기업, 금융/제조업 C레벨", category: "기본 정보", required: true },
  { id: "industries", label: "주요 산업군", type: "textarea", placeholder: "예: 금융, 제조, 헬스케어, IT", category: "기본 정보" },
  { id: "regions", label: "주력 지역/시장", type: "text", placeholder: "예: 국내 + 동남아시아", category: "기본 정보" },
  { id: "projectScale", label: "평균 프로젝트 규모", type: "select", options: ["소규모 (1~3개월)", "중규모 (3~6개월)", "대규모 (6개월 이상)", "혼합"], category: "기본 정보" },
  { id: "salesMethod", label: "영업 방식", type: "select", options: ["인바운드 중심 (문의 유입)", "아웃바운드 중심 (직접 영업)", "네트워크/소개 중심", "혼합"], category: "기본 정보" },
  { id: "primaryCta", label: "핵심 CTA 우선순위", type: "select", options: ["상담 문의", "프로젝트 문의", "무료 진단 신청", "리포트 다운로드", "세미나 참가", "전화 상담"], category: "전환 전략", required: true },
  { id: "leadMethod", label: "리드 수집 방식", type: "multi-select", options: ["문의 폼", "전화", "이메일", "다운로드 폼", "세미나 등록", "챗봇"], category: "전환 전략" },
  { id: "hasCases", label: "대표 케이스 보유 여부", type: "boolean", category: "증거 자산" },
  { id: "hasClientLogos", label: "고객사 로고 사용 가능 여부", type: "boolean", category: "증거 자산" },
  { id: "hasMetrics", label: "성과 수치 공개 가능 여부", type: "boolean", category: "증거 자산" },
  { id: "hasTestimonials", label: "추천사/레퍼런스 보유 여부", type: "boolean", category: "증거 자산" },
  { id: "hasExpertProfiles", label: "전문가 프로필 보유 여부", type: "boolean", category: "증거 자산" },
  { id: "hasInsights", label: "인사이트/블로그 운영 여부", type: "boolean", category: "증거 자산" },
  { id: "hasDownloads", label: "다운로드 리소스 운영 여부", type: "boolean", category: "증거 자산" },
  { id: "hasWebinars", label: "세미나/웨비나 운영 여부", type: "boolean", category: "증거 자산" },
  { id: "brandTone", label: "브랜드 톤", type: "select", options: ["Corporate (보수적·신뢰)", "Modern (현대적·세련)", "Boutique (부티크·전문)", "Bold (대담·주도적)", "Warm (따뜻·친근)"], category: "브랜드" },
  { id: "hasBrandAssets", label: "사진/브랜드 에셋 보유 여부", type: "boolean", category: "브랜드" },
  { id: "needsMultilang", label: "다국어 필요 여부", type: "boolean", category: "브랜드" },
  { id: "requiredPages", label: "필수 페이지", type: "textarea", placeholder: "예: 홈, 서비스, 사례, 팀, 문의", category: "요구사항" },
  { id: "prohibitedExpressions", label: "금지 표현", type: "textarea", placeholder: "예: 업계 최고, 유일, 1위", category: "요구사항", helpText: "검증 불가한 주장이나 브랜드 정책상 금지 표현" },
  { id: "claimsToReview", label: "검토 필요한 대외 주장", type: "textarea", placeholder: "예: '국내 최초 도입' — 검증 필요", category: "요구사항", helpText: "사용 전 팩트체크가 필요한 표현 목록" },
  { id: "competitorNotes", label: "경쟁사 포지셔닝 메모", type: "textarea", placeholder: "경쟁사 대비 차별화 포인트 정리", category: "요구사항" },
];

const ClientBrief = () => {
  const [formData, setFormData] = useState<BriefData>(() => loadBrief());
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = [...new Set(briefFields.map((f) => f.category))];
  const analysis = analyzeBrief(formData);

  // Auto-save
  const doSave = useCallback((data: BriefData) => {
    const result = saveBrief(data);
    if (!result.success) toast.error("저장 실패 — localStorage를 확인하세요");
  }, []);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => doSave(formData), 800);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [formData, doSave]);

  const updateField = (id: keyof BriefData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [id]: value } as BriefData));
  };

  const handleFillExample = () => {
    setFormData({ ...exampleBrief });
    toast.success("예시 데이터가 채워졌습니다");
  };
  const handleReset = () => {
    if (!confirm("모든 입력을 초기화하시겠습니까?")) return;
    setFormData({ ...emptyBrief });
    saveBrief(emptyBrief);
    toast.success("브리프가 초기화되었습니다");
  };
  const handleExport = () => {
    const json = exportBriefJson(formData);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `client-brief-${formData.companyName || "draft"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON이 다운로드되었습니다");
  };
  const handleImport = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importBriefJson(reader.result as string);
      if (result.success && result.data) {
        setFormData(result.data);
        saveBrief(result.data);
        toast.success("브리프를 불러왔습니다");
      } else {
        const msgs: Record<string, string> = {
          invalid_json: "유효하지 않은 JSON 형식입니다",
          invalid_shape: "브리프 데이터 형식이 올바르지 않습니다",
          invalid_version: "지원하지 않는 스키마 버전입니다",
        };
        toast.error(msgs[result.error || ""] || "불러오기에 실패했습니다");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const handleManualSave = () => {
    const result = saveBrief(formData);
    if (result.success) toast.success("저장 완료");
    else toast.error("저장 실패");
  };

  const lastSaved = formData._lastSaved ? new Date(formData._lastSaved).toLocaleString("ko-KR") : null;

  return (
    <AppLayout>
      <PageHeader
        badge="Client Brief Tool"
        title="고객사 브리프"
        description="컨설팅 고객사의 정보를 체계적으로 수집·정리하여 사이트 제작 청사진의 기초 데이터를 구성합니다."
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={handleFillExample} className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
          <Sparkles className="h-3.5 w-3.5 text-accent" /> 예시 데이터 채우기
        </button>
        <button onClick={handleManualSave} className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
          <Save className="h-3.5 w-3.5" /> 저장
        </button>
        <button onClick={handleExport} className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
          <Download className="h-3.5 w-3.5" /> JSON 내보내기
        </button>
        <button onClick={handleImport} className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
          <Upload className="h-3.5 w-3.5" /> JSON 불러오기
        </button>
        <button onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-card px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <RotateCcw className="h-3.5 w-3.5" /> 초기화
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
      </div>
      {lastSaved && <p className="text-[10px] text-muted-foreground mb-6">마지막 저장: {lastSaved} · 자동 저장 활성</p>}

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border bg-card p-5 col-span-1 md:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">브리프 요약</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-muted-foreground">회사명:</span> <span className="text-foreground font-medium">{formData.companyName || "—"}</span></div>
            <div><span className="text-muted-foreground">유형:</span> <span className="text-foreground font-medium">{formData.consultingType || "—"}</span></div>
            <div><span className="text-muted-foreground">타겟:</span> <span className="text-foreground font-medium">{formData.targetClients ? formData.targetClients.slice(0, 40) + (formData.targetClients.length > 40 ? "…" : "") : "—"}</span></div>
            <div><span className="text-muted-foreground">핵심 CTA:</span> <span className="text-foreground font-medium">{formData.primaryCta || "—"}</span></div>
            <div className="col-span-2"><span className="text-muted-foreground">핵심 서비스:</span> <span className="text-foreground font-medium">{formData.coreServices ? formData.coreServices.slice(0, 60) + (formData.coreServices.length > 60 ? "…" : "") : "—"}</span></div>
          </div>
          {analysis.missingRequired.length > 0 && (
            <div className="mt-3 rounded-md bg-destructive/5 border border-destructive/20 px-3 py-2">
              <span className="text-[10px] font-semibold text-destructive">누락된 필수 항목:</span>
              <span className="text-xs text-destructive ml-2">{analysis.missingRequired.join(", ")}</span>
            </div>
          )}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>전체 완료율</span>
                <span>{analysis.completionRate}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${analysis.completionRate}%` }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>필수 충족률</span>
                <span>{analysis.requiredCompletionRate}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${analysis.requiredCompletionRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-accent/5 border-accent/20 p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">예상 사이트 유형</h3>
          <p className="text-lg font-bold text-accent mb-1">{analysis.siteType}</p>
          <p className="text-[10px] text-muted-foreground mb-3">{analysis.siteTypeReason}</p>
          <div className="text-xs text-muted-foreground">
            <span>증거 자산 점수: </span>
            <span className="font-semibold text-foreground">{analysis.proofScore}/8</span>
          </div>
          <div className="mt-3">
            <Link to="/site-blueprint" className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
              청사진 보러 가기 →
            </Link>
          </div>
        </div>
      </div>

      {/* Proof Asset Status */}
      <div className="rounded-lg border bg-card p-5 mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-3">증거 자산 현황</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {analysis.proofSummary.map((p) => (
            <div key={p.id} className="rounded-md border px-3 py-2">
              <span className="text-xs text-muted-foreground">{p.label}</span>
              <div className="mt-1">
                <BadgeLabel type={p.status === "보유" ? "required" : p.status === "부족" ? "prohibited" : "optional"}>
                  {p.status}
                </BadgeLabel>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      {categories.map((cat) => (
        <SectionBlock key={cat} id={cat.replace(/\s/g, "-")} title={cat}>
          <div className="space-y-4">
            {briefFields.filter((f) => f.category === cat).map((field) => (
              <div key={field.id} className="rounded-lg border bg-card p-4">
                <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-1">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </label>
                {field.helpText && <p className="text-xs text-muted-foreground mb-2">{field.helpText}</p>}
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
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                )}
                {field.type === "multi-select" && field.options && (
                  <div className="flex flex-wrap gap-2">
                    {field.options.map((opt) => {
                      const arr = (formData[field.id] as string[]) || [];
                      const selected = arr.includes(opt);
                      return (
                        <button key={opt} type="button" onClick={() => {
                          const next = selected ? arr.filter((v) => v !== opt) : [...arr, opt];
                          updateField(field.id, next);
                        }}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${selected ? "bg-accent text-accent-foreground border-accent" : "bg-background text-muted-foreground border-border hover:border-accent/50"}`}
                        >{opt}</button>
                      );
                    })}
                  </div>
                )}
                {field.type === "boolean" && (
                  <div className="flex gap-3">
                    {(["예", "아니오"] as const).map((opt) => {
                      const isYes = opt === "예";
                      const active = formData[field.id] === isYes;
                      return (
                        <button key={opt} type="button" onClick={() => updateField(field.id, isYes)}
                          className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-colors ${active ? "bg-accent text-accent-foreground border-accent" : "bg-background text-muted-foreground border-border hover:border-accent/50"}`}
                        >{opt}</button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionBlock>
      ))}

      {/* Category Completion */}
      <SectionBlock id="completion" title="카테고리별 입력 현황">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((cat) => {
            const fields = briefFields.filter((f) => f.category === cat);
            const filled = fields.filter((f) => {
              const v = formData[f.id];
              if (v === null) return false;
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
      </SectionBlock>

      {/* Workflow CTA */}
      <div className="rounded-lg bg-primary p-6 text-center mt-4">
        <h3 className="text-lg font-bold text-primary-foreground mb-2">브리프 작성이 완료되면</h3>
        <p className="text-sm text-primary-foreground/70 mb-4">Site Blueprint에서 추천 사이트 구조를 확인하세요.</p>
        <Link to="/site-blueprint" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors">
          사이트 청사진 보기 →
        </Link>
      </div>
    </AppLayout>
  );
};

export default ClientBrief;
