import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { routeMeta, getSortedRoutes, fallbackMeta } from "@/data/routeMeta";
import App from "@/App";

// Helper to render app at a given route
function renderAtRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  // Reset document title
  document.title = "";
  // Clean up JSON-LD scripts
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  // Clean up meta tags added dynamically
  document.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove());
  document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
});

// ─── Route Rendering ───

describe("route rendering", () => {
  it("renders homepage", () => {
    renderAtRoute("/");
    expect(document.title).toContain("컨설팅");
  });

  it("renders design guide page", () => {
    renderAtRoute("/design-guide");
    expect(screen.getByText("디자인 가이드")).toBeInTheDocument();
  });

  it("renders client brief page", () => {
    renderAtRoute("/client-brief");
    expect(screen.getByText("고객사 브리프")).toBeInTheDocument();
  });

  it("renders site blueprint page", () => {
    renderAtRoute("/site-blueprint");
    expect(screen.getByText("사이트 청사진")).toBeInTheDocument();
  });

  it("renders implementation rules page", () => {
    renderAtRoute("/implementation-rules");
    expect(screen.getByText("구현 규칙")).toBeInTheDocument();
  });

  it("renders proof system page", () => {
    renderAtRoute("/proof-system");
    expect(screen.getByText("신뢰 증거 체계")).toBeInTheDocument();
  });

  it("renders checklist page", () => {
    renderAtRoute("/checklist");
    expect(screen.getByText("실무 체크리스트")).toBeInTheDocument();
  });

  it("renders 404 for unknown route", () => {
    renderAtRoute("/this-does-not-exist");
    expect(screen.getByText("페이지를 찾을 수 없습니다")).toBeInTheDocument();
  });
});

// ─── Meta Tag Verification ───

describe("route meta tags", () => {
  it("sets correct title for homepage", () => {
    renderAtRoute("/");
    expect(document.title).toBe(routeMeta["/"].title);
  });

  it("sets correct title for design guide", () => {
    renderAtRoute("/design-guide");
    expect(document.title).toBe(routeMeta["/design-guide"].title);
  });

  it("sets robots meta for guide pages (index)", () => {
    renderAtRoute("/design-guide");
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toContain("index");
  });

  it("sets robots meta for tool pages (noindex)", () => {
    renderAtRoute("/client-brief");
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toContain("noindex");
  });

  it("sets noindex nofollow for 404", () => {
    renderAtRoute("/unknown-page");
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex, nofollow");
  });

  it("sets description meta tag", () => {
    renderAtRoute("/ui-guide");
    const desc = document.querySelector('meta[name="description"]');
    expect(desc?.getAttribute("content")).toBe(routeMeta["/ui-guide"].description);
  });

  it("sets og:title for routes", () => {
    renderAtRoute("/ux-guide");
    const og = document.querySelector('meta[property="og:title"]');
    expect(og?.getAttribute("content")).toBe(routeMeta["/ux-guide"].ogTitle);
  });

  it("sets canonical for guide pages", () => {
    renderAtRoute("/content-guide");
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toContain("/content-guide");
  });

  it("removes canonical for 404", () => {
    renderAtRoute("/nonexistent");
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeNull();
  });

  it("generates JSON-LD for homepage with WebSite type", () => {
    renderAtRoute("/");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("WebSite");
  });

  it("generates TechArticle JSON-LD for proof system", () => {
    renderAtRoute("/proof-system");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("TechArticle");
    expect(data.proficiencyLevel).toBe("Expert");
  });

  it("generates Article JSON-LD for guide pages", () => {
    renderAtRoute("/design-guide");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("Article");
    expect(data.author).toBeTruthy();
  });

  it("generates BreadcrumbList JSON-LD for sub-pages", () => {
    renderAtRoute("/seo-geo");
    const script = document.getElementById("breadcrumb-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement.length).toBe(2);
  });

  it("generates Organization JSON-LD only on homepage", () => {
    renderAtRoute("/");
    expect(document.getElementById("org-jsonld")?.textContent).toBeTruthy();
  });

  it("does not have Organization JSON-LD on sub-pages", () => {
    renderAtRoute("/design-guide");
    const orgScript = document.getElementById("org-jsonld");
    // Either doesn't exist or is empty
    expect(!orgScript || orgScript.textContent === "").toBe(true);
  });
});

// ─── All Routes Renderable ───

describe("all defined routes render without crash", () => {
  const routes = getSortedRoutes();
  routes.forEach((route) => {
    it(`renders ${route.path} (${route.navTitle})`, () => {
      expect(() => renderAtRoute(route.path)).not.toThrow();
      // Title should be set
      expect(document.title).toBe(route.title);
    });
  });
});
