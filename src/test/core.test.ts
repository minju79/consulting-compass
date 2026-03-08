import { describe, it, expect } from "vitest";
import {
  analyzeBrief, emptyBrief, exampleBrief, generateBlueprints,
  exportBriefJson, importBriefJson, generateLovablePrompt,
  normalizeBrief, getProofFallbacks,
  BriefData, BRIEF_SCHEMA_VERSION,
} from "@/lib/brief";
import {
  getRouteMeta, getSortedRoutes, getCanonicalUrl, getBreadcrumbs,
  fallbackMeta, getRoutesByGroup,
} from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";

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
});

// ─── Industry Config ───

describe("industryConfig", () => {
  it("has required branding fields", () => {
    expect(industryConfig.shortTagline).toBeTruthy();
    expect(industryConfig.version).toBeTruthy();
    expect(industryConfig.navGroups.guide).toBeTruthy();
    expect(industryConfig.navGroups.tool).toBeTruthy();
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

  it("recommends minimal scale for low proof score", () => {
    const brief: BriefData = { ...emptyBrief, companyName: "T", primaryCta: "상담 문의" };
    expect(analyzeBrief(brief).scaleRecommendation).toBe("최소");
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
    expect(active.length).toBeLessThanOrEqual(1); // webinars may be false
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
});
