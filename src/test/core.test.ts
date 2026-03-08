import { describe, it, expect } from "vitest";
import { analyzeBrief, emptyBrief, exampleBrief, generateBlueprints, exportBriefJson, importBriefJson } from "@/lib/brief";
import { getRouteMeta, getSortedRoutes, getCanonicalUrl, getBreadcrumbs, fallbackMeta } from "@/data/routeMeta";

describe("routeMeta", () => {
  it("returns meta for known routes", () => {
    const meta = getRouteMeta("/");
    expect(meta.title).toContain("컨설팅");
    expect(meta.navTitle).toBe("Overview");
  });

  it("returns fallback for unknown routes", () => {
    const meta = getRouteMeta("/nonexistent");
    expect(meta.robots).toBe("noindex, nofollow");
  });

  it("generates canonical URLs", () => {
    expect(getCanonicalUrl("/")).not.toContain("//");
    expect(getCanonicalUrl("/design-guide")).toContain("/design-guide");
  });

  it("sorts routes by navOrder", () => {
    const sorted = getSortedRoutes();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].navOrder).toBeGreaterThanOrEqual(sorted[i - 1].navOrder);
    }
  });

  it("generates breadcrumbs", () => {
    const crumbs = getBreadcrumbs("/design-guide");
    expect(crumbs.length).toBe(2);
    expect(crumbs[0].label).toBe("홈");
  });

  it("all routes have required fields", () => {
    const sorted = getSortedRoutes();
    sorted.forEach((r) => {
      expect(r.title).toBeTruthy();
      expect(r.description).toBeTruthy();
      expect(r.ogTitle).toBeTruthy();
      expect(r.group).toMatch(/^(guide|tool)$/);
    });
  });
});

describe("brief engine", () => {
  it("analyzes empty brief", () => {
    const analysis = analyzeBrief(emptyBrief);
    expect(analysis.completionRate).toBe(0);
    expect(analysis.missingRequired.length).toBeGreaterThan(0);
    expect(analysis.siteType).toBeTruthy();
  });

  it("analyzes example brief with high completion", () => {
    const analysis = analyzeBrief(exampleBrief);
    expect(analysis.completionRate).toBeGreaterThan(80);
    expect(analysis.requiredCompletionRate).toBe(100);
    expect(analysis.proofScore).toBeGreaterThan(5);
  });

  it("generates blueprints from example brief", () => {
    const analysis = analyzeBrief(exampleBrief);
    const blueprints = generateBlueprints(exampleBrief, analysis);
    expect(blueprints.length).toBeGreaterThan(3);
    expect(blueprints[0].name).toBe("홈페이지");
    expect(blueprints[0].blocks.length).toBeGreaterThan(5);
  });

  it("generates fewer blueprints for minimal brief", () => {
    const minimal = { ...emptyBrief, companyName: "테스트", consultingType: "경영 전략", coreServices: "전략", targetClients: "기업", primaryCta: "상담 문의" };
    const analysis = analyzeBrief(minimal);
    const blueprints = generateBlueprints(minimal, analysis);
    // minimal brief has no cases/insights so fewer pages
    expect(blueprints.length).toBeLessThan(generateBlueprints(exampleBrief, analyzeBrief(exampleBrief)).length);
  });

  it("exports and imports JSON correctly", () => {
    const json = exportBriefJson(exampleBrief);
    const imported = importBriefJson(json);
    expect(imported?.companyName).toBe(exampleBrief.companyName);
  });

  it("rejects invalid JSON import", () => {
    expect(importBriefJson("not json")).toBeNull();
  });
});
