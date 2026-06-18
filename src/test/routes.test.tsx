import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { routeMeta, getSortedRoutes, getRouteMeta, fallbackMeta } from "@/data/routeMeta";
import { applyPageMeta } from "@/hooks/usePageMeta";

// Pages
import Index from "@/pages/Index";
import DesignGuide from "@/pages/DesignGuide";
import UiGuide from "@/pages/UiGuide";
import UxGuide from "@/pages/UxGuide";
import ContentGuide from "@/pages/ContentGuide";
import SeoGeo from "@/pages/SeoGeo";
import Checklist from "@/pages/Checklist";
import ClientBrief from "@/pages/ClientBrief";
import SiteBlueprint from "@/pages/SiteBlueprint";
import ImplementationRules from "@/pages/ImplementationRules";
import ProofSystem from "@/pages/ProofSystem";
import NotFound from "@/pages/NotFound";
import IndustryOverview from "@/pages/IndustryOverview";
import PageTemplates from "@/pages/PageTemplates";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function Wrapper({ children, path = "/" }: { children: React.ReactNode; path?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MemoryRouter initialEntries={[path]}>
          {children}
        </MemoryRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function renderPage(element: React.ReactElement, path = "/") {
  return render(element, { wrapper: ({ children }) => <Wrapper path={path}>{children}</Wrapper> });
}

beforeEach(() => {
  localStorage.clear();
  document.title = "";
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
  document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove());
  document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
});

// ─── Route Rendering ───

describe("page rendering", () => {
  it("renders homepage", () => {
    renderPage(<Index />, "/");
    expect(document.title).toContain("컨설팅");
  });

  it("renders industry overview", () => {
    renderPage(<IndustryOverview />, "/industry-overview");
    expect(screen.getByText("컨설팅 업종 특성 분석")).toBeInTheDocument();
  });

  it("renders design guide page", () => {
    renderPage(<DesignGuide />, "/design-guide");
    expect(screen.getByText("디자인 가이드")).toBeInTheDocument();
  });

  it("renders UI guide page", () => {
    renderPage(<UiGuide />, "/ui-guide");
    expect(screen.getByText("UI 가이드")).toBeInTheDocument();
  });

  it("renders UX guide page", () => {
    renderPage(<UxGuide />, "/ux-guide");
    expect(screen.getByText("UX 가이드")).toBeInTheDocument();
  });

  it("renders page templates page", () => {
    renderPage(<PageTemplates />, "/page-templates");
    expect(screen.getByText("페이지 템플릿")).toBeInTheDocument();
  });

  it("renders content guide page", () => {
    renderPage(<ContentGuide />, "/content-guide");
    expect(screen.getByText("콘텐츠 가이드")).toBeInTheDocument();
  });

  it("renders SEO/GEO page", () => {
    renderPage(<SeoGeo />, "/seo-geo");
    expect(screen.getByText("SEO · GEO 가이드")).toBeInTheDocument();
  });

  it("renders checklist page", () => {
    renderPage(<Checklist />, "/checklist");
    expect(screen.getByText("실무 체크리스트")).toBeInTheDocument();
  });

  it("renders client brief page", () => {
    renderPage(<ClientBrief />, "/client-brief");
    expect(screen.getByText("고객사 브리프")).toBeInTheDocument();
  });

  it("renders site blueprint page", () => {
    renderPage(<SiteBlueprint />, "/site-blueprint");
    expect(screen.getByText("사이트 청사진")).toBeInTheDocument();
  });

  it("renders implementation rules page", () => {
    renderPage(<ImplementationRules />, "/implementation-rules");
    expect(screen.getByText("구현 규칙")).toBeInTheDocument();
  });

  it("renders proof system page", () => {
    renderPage(<ProofSystem />, "/proof-system");
    expect(screen.getByText("신뢰 증거 체계")).toBeInTheDocument();
  });

  it("renders 404 page", () => {
    renderPage(<NotFound />, "/unknown");
    expect(screen.getByText("페이지를 찾을 수 없습니다")).toBeInTheDocument();
  });
});

// ─── Meta Tag Verification (via applyPageMeta) ───

describe("meta tag application", () => {
  it("sets correct title for homepage", () => {
    applyPageMeta(getRouteMeta("/"), "/");
    expect(document.title).toBe(routeMeta["/"].title);
  });

  it("sets correct description", () => {
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

  it("sets noindex nofollow for 404", () => {
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
    // First add a canonical
    applyPageMeta(getRouteMeta("/"), "/");
    expect(document.querySelector('link[rel="canonical"]')).toBeTruthy();
    // Now apply 404
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

  it("generates Article JSON-LD for guide pages", () => {
    applyPageMeta(getRouteMeta("/design-guide"), "/design-guide");
    const script = document.getElementById("page-jsonld");
    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@type"]).toBe("Article");
    expect(data.author).toBeTruthy();
  });

  it("generates CollectionPage JSON-LD for page templates", () => {
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
    expect(orgScript?.textContent).toBeTruthy();
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
      // Clean up between
      document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
      applyPageMeta(route, route.path);
      expect(document.title).toBe(route.title);
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute("content")).toBeTruthy();
    });
  });
});
