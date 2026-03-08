import { describe, it, expect, beforeEach } from "vitest";
import {
  analyzeBrief, emptyBrief, exampleBrief, generateBlueprints,
  exportBriefJson, importBriefJson, generateLovablePrompt,
  normalizeBrief, getProofFallbacks, saveBrief, loadBriefWithStatus,
  BriefData, BRIEF_SCHEMA_VERSION, BRIEF_STORAGE_KEY,
} from "@/lib/brief";
import {
  getRouteMeta, getSortedRoutes, getCanonicalUrl, getBreadcrumbs,
  fallbackMeta, getRoutesByGroup, getAdjacentRoutes, routeMeta,
} from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";
import { applyPageMeta } from "@/hooks/usePageMeta";

// ─── Route Meta ───

describe("routeMeta", () => {
  it("returns meta for all defined routes", () => {
    const routes = getSortedRoutes();
    expect(routes.length).toBeGreaterThanOrEqual(13);
    routes.forEach((r) => {
      expect(r.title).toBeTruthy();
      expect(r.description).toBeTruthy();
      expect(r.ogTitle).toBeTruthy();
      expect(r.schemaType).toBeTruthy();
      expect(r.icon).toBeTruthy();
      expect(r.group).toMatch(/^(guide|tool)$/);
      expect(r.breadcrumbLabel).toBeTruthy();
    });
  });

  it("returns fallback for unknown routes", () => {
    const meta = getRouteMeta("/nonexistent-page");
    expect(meta.robots).toBe("noindex, nofollow");
    expect(meta.title).toContain("찾을 수 없습니다");
  });

  it("fallbackMeta has noindex, nofollow and schemaType", () => {
    expect(fallbackMeta.robots).toBe("noindex, nofollow");
    expect(fallbackMeta.schemaType).toBe("WebPage");
    expect(fallbackMeta.ogTitle).toBeTruthy();
    expect(fallbackMeta.ogImage).toBeTruthy();
  });

  it("generates canonical URLs correctly", () => {
    const home = getCanonicalUrl("/");
    expect(home).toMatch(/^https:\/\/.+/);
    expect(home.endsWith("/")).toBe(false);
    expect(getCanonicalUrl("/design-guide")).toContain("/design-guide");
  });

  it("sorts routes by navOrder", () => {
    const sorted = getSortedRoutes();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].navOrder).toBeGreaterThanOrEqual(sorted[i - 1].navOrder);
    }
  });

  it("generates breadcrumbs for home and sub-pages", () => {
    expect(getBreadcrumbs("/").length).toBe(1);
    const crumbs = getBreadcrumbs("/design-guide");
    expect(crumbs.length).toBe(2);
    expect(crumbs[0].label).toBe("홈");
    expect(crumbs[1].path).toBe("/design-guide");
  });

  it("separates routes into guide and tool groups", () => {
    const guides = getRoutesByGroup("guide");
    const tools = getRoutesByGroup("tool");
    expect(guides.length).toBeGreaterThan(0);
    expect(tools.length).toBeGreaterThan(0);
    guides.forEach((r) => expect(r.group).toBe("guide"));
    tools.forEach((r) => expect(r.group).toBe("tool"));
  });

  it("all routes have ogImage and schemaType", () => {
    getSortedRoutes().forEach((r) => {
      expect(r.ogImage).toBeTruthy();
      expect(r.schemaType).toBeTruthy();
    });
  });

  it("tool routes have noindex robots", () => {
    getRoutesByGroup("tool").forEach((r) => {
      expect(r.robots).toContain("noindex");
    });
  });

  it("guide routes have index robots", () => {
    getRoutesByGroup("guide").forEach((r) => {
      expect(r.robots).toContain("index");
    });
  });

  it("homepage has WebSite schemaType", () => {
    expect(getRouteMeta("/").schemaType).toBe("WebSite");
  });

  it("page-templates has CollectionPage schemaType", () => {
    expect(getRouteMeta("/page-templates").schemaType).toBe("CollectionPage");
  });

  it("all routes have keywords", () => {
    getSortedRoutes().forEach((r) => {
      expect(r.keywords).toBeDefined();
      expect(r.keywords!.length).toBeGreaterThan(0);
    });
  });

  it("all routes have searchIntent", () => {
    getSortedRoutes().forEach((r) => {
      expect(r.searchIntent).toBeTruthy();
    });
  });

  it("getAdjacentRoutes returns prev/next for middle route", () => {
    const { prev, next } = getAdjacentRoutes("/design-guide");
    expect(prev).toBeTruthy();
    expect(next).toBeTruthy();
  });

  it("getAdjacentRoutes returns null prev for first route", () => {
    const { prev } = getAdjacentRoutes("/");
    expect(prev).toBeNull();
  });

  it("canonical URL uses industryConfig.siteUrl", () => {
    const canonical = getCanonicalUrl("/design-guide");
    expect(canonical).toContain(industryConfig.siteUrl);
  });

  it("all route paths in routeMeta match their key", () => {
    Object.entries(routeMeta).forEach(([key, meta]) => {
      expect(meta.path).toBe(key);
    });
  });

  it("no duplicate navOrder values", () => {
    const orders = getSortedRoutes().map((r) => r.navOrder);
    const unique = new Set(orders);
    expect(unique.size).toBe(orders.length);
  });
});

// ─── Industry Config ───

describe("industryConfig", () => {
  it("has required branding fields", () => {
    expect(industryConfig.shortTagline).toBeTruthy();
    expect(industryConfig.version).toBeTruthy();
    expect(industryConfig.navGroups.guide).toBeTruthy();
    expect(industryConfig.navGroups.tool).toBeTruthy();
    expect(industryConfig.nameEn).toBeTruthy();
    expect(industryConfig.siteUrl).toMatch(/^https:\/\//);
    expect(industryConfig.locale).toBeTruthy();
  });

  it("has trust elements and failure patterns", () => {
    expect(industryConfig.trustElements.length).toBeGreaterThan(5);
    expect(industryConfig.failurePatterns.length).toBeGreaterThan(3);
    expect(industryConfig.subCategories.length).toBeGreaterThan(5);
  });

  it("has public site structure for homepage reference", () => {
    expect(industryConfig.publicSiteStructure.length).toBeGreaterThan(5);
  });

  it("has conversion flow steps", () => {
    expect(industryConfig.conversionFlow.length).toBeGreaterThan(3);
  });
});

// ─── Brief Engine ───

describe("brief analysis", () => {
  it("analyzes empty brief with 0% completion", () => {
    const analysis = analyzeBrief(emptyBrief);
    expect(analysis.completionRate).toBe(0);
    expect(analysis.requiredCompletionRate).toBe(0);
    expect(analysis.missingRequired.length).toBe(5);
    expect(analysis.proofScore).toBe(0);
  });

  it("analyzes example brief with high completion", () => {
    const analysis = analyzeBrief(exampleBrief);
    expect(analysis.completionRate).toBeGreaterThan(80);
    expect(analysis.requiredCompletionRate).toBe(100);
    expect(analysis.proofScore).toBeGreaterThan(5);
    expect(analysis.missingRequired.length).toBe(0);
    expect(analysis.recommendedSecondaryCta).toBeTruthy();
  });

  it("detects case-study-centric type", () => {
    const brief: BriefData = { ...emptyBrief, hasCases: true, hasMetrics: true, companyName: "T" };
    expect(analyzeBrief(brief).siteType).toBe("케이스 스터디 중심형");
  });

  it("detects expert-centric type for boutique", () => {
    const brief: BriefData = { ...emptyBrief, hasExpertProfiles: true, projectScale: "소규모 (1~3개월)", companyName: "T" };
    const analysis = analyzeBrief(brief);
    expect(analysis.siteType).toBe("전문가 중심형");
    expect(analysis.isBoutique).toBe(true);
  });

  it("detects industry-focused type", () => {
    const brief: BriefData = { ...emptyBrief, industries: "금융, 제조, IT", companyName: "T" };
    const analysis = analyzeBrief(brief);
    expect(analysis.hasIndustryFocus).toBe(true);
    expect(analysis.industryCount).toBe(3);
  });

  it("detects insight-centric type", () => {
    const brief: BriefData = { ...emptyBrief, hasInsights: true, hasDownloads: true, companyName: "T" };
    expect(analyzeBrief(brief).siteType).toBe("인사이트 중심형");
  });

  it("recommends minimal scale for low proof score", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", primaryCta: "상담 문의" };
    expect(analyzeBrief(brief).scaleRecommendation).toBe("최소");
  });

  it("recommends full scale for high proof + insights", () => {
    const analysis = analyzeBrief(exampleBrief);
    expect(analysis.scaleRecommendation).toBe("풀");
  });

  it("proof summary includes strength values", () => {
    const analysis = analyzeBrief(exampleBrief);
    analysis.proofSummary.forEach((p) => {
      expect(p.strength).toBeGreaterThanOrEqual(1);
      expect(p.strength).toBeLessThanOrEqual(5);
    });
  });

  it("has content and download strategy flags", () => {
    const analysis = analyzeBrief(exampleBrief);
    expect(analysis.hasContentStrategy).toBe(true);
    expect(analysis.hasDownloadStrategy).toBe(true);
  });

  it("CTA mapping works for known primaryCta values", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", primaryCta: "무료 진단 신청" };
    const a = analyzeBrief(brief);
    expect(a.recommendedCta).toContain("진단");
  });

  it("default site type is lead collection for generic brief", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", primaryCta: "상담 문의" };
    expect(analyzeBrief(brief).siteType).toBe("리드 수집형");
  });
});

// ─── Normalize ───

describe("normalizeBrief", () => {
  it("fills missing fields with defaults", () => {
    const result = normalizeBrief({ companyName: "Test" });
    expect(result.companyName).toBe("Test");
    expect(result.consultingType).toBe("");
    expect(result.leadMethod).toEqual([]);
    expect(result._schemaVersion).toBe(BRIEF_SCHEMA_VERSION);
  });

  it("ignores wrong types", () => {
    const result = normalizeBrief({ companyName: 123, hasCases: "yes" });
    expect(result.companyName).toBe("");
    expect(result.hasCases).toBeNull();
  });

  it("filters non-string elements from arrays", () => {
    const result = normalizeBrief({ leadMethod: ["문의 폼", 123, null, "이메일"] });
    expect(result.leadMethod).toEqual(["문의 폼", "이메일"]);
  });

  it("always sets schema version to current", () => {
    const result = normalizeBrief({ _schemaVersion: 999 });
    expect(result._schemaVersion).toBe(BRIEF_SCHEMA_VERSION);
  });
});

// ─── Proof Fallbacks ───

describe("getProofFallbacks", () => {
  it("returns fallbacks for missing assets", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasCases: false, hasMetrics: false };
    const analysis = analyzeBrief(brief);
    const fallbacks = getProofFallbacks(analysis);
    const active = fallbacks.filter((f) => f.active);
    expect(active.length).toBeGreaterThanOrEqual(2);
    active.forEach((f) => expect(f.fallback).toBeTruthy());
  });

  it("returns no active fallbacks when all assets owned", () => {
    const analysis = analyzeBrief(exampleBrief);
    const fallbacks = getProofFallbacks(analysis);
    const active = fallbacks.filter((f) => f.active);
    expect(active.length).toBeLessThanOrEqual(1);
  });

  it("all fallbacks have meaningful descriptions", () => {
    const analysis = analyzeBrief(emptyBrief);
    const fallbacks = getProofFallbacks(analysis);
    fallbacks.forEach((f) => {
      expect(f.asset).toBeTruthy();
      expect(f.fallback).toBeTruthy();
      expect(f.fallback.length).toBeGreaterThan(5);
    });
  });
});

// ─── Blueprint Generation ───

describe("blueprint generation", () => {
  it("generates blueprints from example brief", () => {
    const analysis = analyzeBrief(exampleBrief);
    const blueprints = generateBlueprints(exampleBrief, analysis);
    expect(blueprints.length).toBeGreaterThan(5);
    expect(blueprints[0].name).toBe("홈페이지");
    expect(blueprints[0].blocks.length).toBeGreaterThan(5);
  });

  it("generates fewer blueprints for minimal brief", () => {
    const minimal: BriefData = { ...emptyBrief, companyName: "테스트", consultingType: "경영 전략", coreServices: "전략", targetClients: "기업", primaryCta: "상담 문의" };
    const blueprints = generateBlueprints(minimal, analyzeBrief(minimal));
    const exampleBlueprints = generateBlueprints(exampleBrief, analyzeBrief(exampleBrief));
    expect(blueprints.length).toBeLessThan(exampleBlueprints.length);
  });

  it("always includes homepage and contact", () => {
    const minimal: BriefData = { ...emptyBrief, companyName: "T" };
    const blueprints = generateBlueprints(minimal, analyzeBrief(minimal));
    const names = blueprints.map((b) => b.name);
    expect(names).toContain("홈페이지");
    expect(names).toContain("문의/상담 신청");
  });

  it("includes industry page when multiple industries", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", industries: "금융, 제조, IT" };
    const blueprints = generateBlueprints(brief, analyzeBrief(brief));
    expect(blueprints.some((b) => b.name === "산업/전문분야 페이지")).toBe(true);
  });

  it("marks prohibited blocks for missing proof", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasTestimonials: false };
    const blueprints = generateBlueprints(brief, analyzeBrief(brief));
    const home = blueprints.find((b) => b.name === "홈페이지");
    expect(home?.blocks.find((b) => b.name === "추천사")?.status).toBe("prohibited");
  });

  it("includes asset fallbacks in blueprints", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasClientLogos: false, hasMetrics: false };
    const blueprints = generateBlueprints(brief, analyzeBrief(brief));
    expect(blueprints[0].assetFallbacks!.length).toBeGreaterThan(0);
  });

  it("includes case study pages when hasCases", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasCases: true };
    const blueprints = generateBlueprints(brief, analyzeBrief(brief));
    const names = blueprints.map((b) => b.name);
    expect(names).toContain("케이스 스터디 목록");
    expect(names).toContain("케이스 스터디 상세");
  });

  it("includes webinar page when hasWebinars", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasWebinars: true };
    const blueprints = generateBlueprints(brief, analyzeBrief(brief));
    expect(blueprints.some((b) => b.name === "웨비나/세미나")).toBe(true);
  });

  it("all blueprints have cta and mobileRule", () => {
    const blueprints = generateBlueprints(exampleBrief, analyzeBrief(exampleBrief));
    blueprints.forEach((bp) => {
      expect(bp.cta).toBeTruthy();
      expect(bp.mobileRule).toBeTruthy();
    });
  });

  it("all blueprints have seoPoints", () => {
    const blueprints = generateBlueprints(exampleBrief, analyzeBrief(exampleBrief));
    blueprints.forEach((bp) => {
      expect(bp.seoPoints.length).toBeGreaterThan(0);
    });
  });

  it("homepage blueprint has all block statuses", () => {
    const analysis = analyzeBrief(exampleBrief);
    const blueprints = generateBlueprints(exampleBrief, analysis);
    const home = blueprints[0];
    const statuses = new Set(home.blocks.map((b) => b.status));
    expect(statuses.has("required")).toBe(true);
    expect(statuses.has("prohibited")).toBe(true);
  });

  it("includes download landing when hasDownloads", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasDownloads: true };
    const blueprints = generateBlueprints(brief, analyzeBrief(brief));
    expect(blueprints.some((b) => b.name === "리포트/다운로드 랜딩")).toBe(true);
  });
});

// ─── JSON Import/Export ───

describe("brief JSON import/export", () => {
  it("exports and imports correctly", () => {
    const json = exportBriefJson(exampleBrief);
    const result = importBriefJson(json);
    expect(result.success).toBe(true);
    expect(result.data?.companyName).toBe(exampleBrief.companyName);
  });

  it("rejects invalid JSON", () => {
    expect(importBriefJson("not json").error).toBe("invalid_json");
  });

  it("rejects empty data", () => {
    expect(importBriefJson('{"foo": "bar"}').error).toBe("empty_data");
  });

  it("rejects array input", () => {
    expect(importBriefJson("[1,2,3]").error).toBe("invalid_shape");
  });

  it("warns on version mismatch but still imports", () => {
    const json = JSON.stringify({ _schemaVersion: 999, companyName: "Test", consultingType: "IT", coreServices: "DX" });
    const result = importBriefJson(json);
    expect(result.success).toBe(true);
    expect(result.warning).toBeTruthy();
  });

  it("normalized data preserves known fields", () => {
    const json = JSON.stringify({ companyName: "X", consultingType: "HR", coreServices: "인재관리", unknownField: "ignored" });
    const result = importBriefJson(json);
    expect(result.success).toBe(true);
    expect(result.data?.companyName).toBe("X");
    expect("unknownField" in (result.data || {})).toBe(false);
  });

  it("rejects null input", () => {
    expect(importBriefJson("null").error).toBe("invalid_shape");
  });

  it("rejects primitive input", () => {
    expect(importBriefJson('"hello"').error).toBe("invalid_shape");
  });
});

// ─── Save/Load ───

describe("brief save/load", () => {
  it("saveBrief returns success with timestamp", () => {
    const result = saveBrief(exampleBrief);
    expect(result.success).toBe(true);
    expect(result.timestamp).toBeTruthy();
  });

  it("loadBriefWithStatus returns loaded data", () => {
    saveBrief(exampleBrief);
    const { data, migrated } = loadBriefWithStatus();
    expect(data.companyName).toBe(exampleBrief.companyName);
    expect(migrated).toBe(false);
  });

  it("loadBriefWithStatus handles missing localStorage", () => {
    localStorage.removeItem(BRIEF_STORAGE_KEY);
    const { data, migrated } = loadBriefWithStatus();
    expect(data.companyName).toBe("");
    expect(migrated).toBe(false);
  });

  it("loadBriefWithStatus handles corrupt data", () => {
    localStorage.setItem(BRIEF_STORAGE_KEY, "not-json");
    const { data, migrated, migrationReason } = loadBriefWithStatus();
    expect(migrated).toBe(true);
    expect(migrationReason).toBe("parse_error");
    expect(data._schemaVersion).toBe(BRIEF_SCHEMA_VERSION);
  });

  it("loadBriefWithStatus handles old schema version", () => {
    localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify({ _schemaVersion: 1, companyName: "Old" }));
    const { data, migrated, migrationReason } = loadBriefWithStatus();
    expect(migrated).toBe(true);
    expect(migrationReason).toContain("schema");
    expect(data.companyName).toBe("Old");
  });

  it("loadBriefWithStatus handles non-object data", () => {
    localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify("string data"));
    const { migrated, migrationReason } = loadBriefWithStatus();
    expect(migrated).toBe(true);
    expect(migrationReason).toBe("invalid_data");
  });
});

// ─── Prompt Generation ───

describe("prompt generation", () => {
  it("generates comprehensive prompt", () => {
    const analysis = analyzeBrief(exampleBrief);
    const blueprints = generateBlueprints(exampleBrief, analysis);
    const prompt = generateLovablePrompt(exampleBrief, analysis, blueprints);
    expect(prompt).toContain(exampleBrief.companyName);
    expect(prompt).toContain("필수 블록");
    expect(prompt).toContain("금지 블록");
    expect(prompt).toContain("조건부 블록");
    expect(prompt).toContain("보조 CTA");
    expect(prompt).toContain("허위");
    expect(prompt.length).toBeGreaterThan(500);
  });

  it("includes proof fallbacks when assets missing", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "Test", consultingType: "IT", coreServices: "DX", targetClients: "기업", primaryCta: "상담 문의", hasClientLogos: false };
    const analysis = analyzeBrief(brief);
    const prompt = generateLovablePrompt(brief, analysis, generateBlueprints(brief, analysis));
    expect(prompt).toContain("대체 전략");
  });

  it("prompt differs based on brief data", () => {
    const brief1: BriefData = { ...emptyBrief, companyName: "A사", coreServices: "전략", targetClients: "대기업", primaryCta: "상담 문의", consultingType: "경영 전략" };
    const brief2: BriefData = { ...emptyBrief, companyName: "B사", coreServices: "DX", targetClients: "중견기업", primaryCta: "무료 진단 신청", consultingType: "IT 컨설팅" };
    const p1 = generateLovablePrompt(brief1, analyzeBrief(brief1), generateBlueprints(brief1, analyzeBrief(brief1)));
    const p2 = generateLovablePrompt(brief2, analyzeBrief(brief2), generateBlueprints(brief2, analyzeBrief(brief2)));
    expect(p1).not.toBe(p2);
    expect(p1).toContain("A사");
    expect(p2).toContain("B사");
  });

  it("prompt includes page-level block details", () => {
    const analysis = analyzeBrief(exampleBrief);
    const blueprints = generateBlueprints(exampleBrief, analysis);
    const prompt = generateLovablePrompt(exampleBrief, analysis, blueprints);
    expect(prompt).toContain("### 홈페이지");
    expect(prompt).toContain("### 서비스 소개");
    expect(prompt).toContain("모바일:");
    expect(prompt).toContain("SEO:");
  });
});

// ─── Cross-system integration ───

describe("system integration", () => {
  it("proof fallbacks align with blueprint asset fallbacks", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", hasCases: false, hasClientLogos: false };
    const analysis = analyzeBrief(brief);
    const fallbacks = getProofFallbacks(analysis);
    const blueprints = generateBlueprints(brief, analysis);
    const homeFallbacks = blueprints[0].assetFallbacks || [];
    const activeFallbacks = fallbacks.filter((f) => f.active).map((f) => f.asset);
    expect(activeFallbacks.length).toBeGreaterThan(0);
    expect(homeFallbacks.length).toBeGreaterThan(0);
  });

  it("blueprint results change with different brief inputs", () => {
    const minimal: BriefData = { ...emptyBrief, companyName: "T" };
    const full = exampleBrief;
    const minBlueprints = generateBlueprints(minimal, analyzeBrief(minimal));
    const fullBlueprints = generateBlueprints(full, analyzeBrief(full));
    expect(fullBlueprints.length).toBeGreaterThan(minBlueprints.length);
  });

  it("navigation data is consistent between sidebar and search", () => {
    const guides = getRoutesByGroup("guide");
    const tools = getRoutesByGroup("tool");
    const all = getSortedRoutes();
    expect(guides.length + tools.length).toBe(all.length);
  });

  it("all routes have enough data for CommandSearch", () => {
    getSortedRoutes().forEach((r) => {
      // CommandSearch uses: navTitle, breadcrumbLabel, description, searchIntent, keywords
      expect(r.navTitle).toBeTruthy();
      expect(r.breadcrumbLabel).toBeTruthy();
      expect(r.description.length).toBeGreaterThan(10);
      expect(r.searchIntent).toBeTruthy();
      expect(r.keywords!.length).toBeGreaterThan(0);
    });
  });

  it("canonical URLs all start with siteUrl", () => {
    getSortedRoutes().forEach((r) => {
      const canonical = getCanonicalUrl(r.path);
      expect(canonical.startsWith(industryConfig.siteUrl)).toBe(true);
    });
  });

  it("proof system status labels are consistent", () => {
    const analysis = analyzeBrief(exampleBrief);
    const validStatuses = ["보유", "부족", "비공개", "미입력", "검토 필요"];
    analysis.proofSummary.forEach((p) => {
      expect(validStatuses).toContain(p.status);
    });
  });
});

// ─── Meta Tag Application (DOM-level) ───

describe("applyPageMeta DOM", () => {
  beforeEach(() => {
    document.title = "";
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove());
    document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
  });

  it("sets document title", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    expect(document.title).toBe(routeMeta["/"].title);
  });

  it("sets description meta", () => {
    applyPageMeta(getRouteMeta("/design-guide"), "/design-guide");
    const desc = document.querySelector('meta[name="description"]');
    expect(desc?.getAttribute("content")).toBe(routeMeta["/design-guide"].description);
  });

  it("sets robots index for guide pages", () => {
    applyPageMeta(getRouteMeta("/ui-guide"), "/ui-guide");
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toContain("index");
  });

  it("sets robots noindex for tool pages", () => {
    applyPageMeta(getRouteMeta("/client-brief"), "/client-brief");
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toContain("noindex");
  });

  it("sets noindex nofollow for 404 fallback", () => {
    applyPageMeta(fallbackMeta, "/404");
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex, nofollow");
  });

  it("sets og:title", () => {
    applyPageMeta(getRouteMeta("/ux-guide"), "/ux-guide");
    const og = document.querySelector('meta[property="og:title"]');
    expect(og?.getAttribute("content")).toBe(routeMeta["/ux-guide"].ogTitle);
  });

  it("sets canonical for guide pages", () => {
    applyPageMeta(getRouteMeta("/content-guide"), "/content-guide");
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toContain("/content-guide");
  });

  it("removes canonical for 404", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    expect(document.querySelector('link[rel="canonical"]')).toBeTruthy();
    applyPageMeta(fallbackMeta, "/404");
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it("generates WebSite JSON-LD for homepage", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("WebSite");
    expect(data.potentialAction).toBeTruthy();
  });

  it("generates TechArticle JSON-LD for proof system", () => {
    applyPageMeta(getRouteMeta("/proof-system"), "/proof-system");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("TechArticle");
    expect(data.proficiencyLevel).toBe("Expert");
  });

  it("generates Article JSON-LD with author for guides", () => {
    applyPageMeta(getRouteMeta("/design-guide"), "/design-guide");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("Article");
    expect(data.author["@type"]).toBe("Organization");
  });

  it("generates CollectionPage JSON-LD for page-templates", () => {
    applyPageMeta(getRouteMeta("/page-templates"), "/page-templates");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("CollectionPage");
  });

  it("generates BreadcrumbList JSON-LD for sub-pages", () => {
    applyPageMeta(getRouteMeta("/seo-geo"), "/seo-geo");
    const script = document.getElementById("breadcrumb-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement.length).toBe(2);
  });

  it("generates Organization JSON-LD only on homepage", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    const orgScript = document.getElementById("org-jsonld");
    const data = JSON.parse(orgScript?.textContent || "{}");
    expect(data["@type"]).toBe("Organization");
  });

  it("clears Organization JSON-LD on sub-pages", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    applyPageMeta(getRouteMeta("/design-guide"), "/design-guide");
    const orgScript = document.getElementById("org-jsonld");
    expect(!orgScript || orgScript.textContent === "").toBe(true);
  });

  it("sets twitter card meta", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    const card = document.querySelector('meta[name="twitter:card"]');
    expect(card?.getAttribute("content")).toBe("summary_large_image");
  });

  it("all routes produce valid meta", () => {
    getSortedRoutes().forEach((route) => {
      document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
      applyPageMeta(route, route.path);
      expect(document.title).toBe(route.title);
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute("content")).toBeTruthy();
    });
  });
});
