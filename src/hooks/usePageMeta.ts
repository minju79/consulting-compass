import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta, getCanonicalUrl, getBreadcrumbs } from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);

    // Title
    document.title = meta.title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Description
    setMeta("name", "description", meta.description);

    // Robots
    setMeta("name", "robots", meta.robots || "index, follow");

    // Canonical
    const canonical = getCanonicalUrl(pathname);
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // Open Graph
    setMeta("property", "og:title", meta.ogTitle);
    setMeta("property", "og:description", meta.ogDescription);
    setMeta("property", "og:type", meta.ogType);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:locale", industryConfig.locale);
    const ogImg = meta.ogImage || "/og-image.png";
    setMeta("property", "og:image", `${industryConfig.siteUrl}${ogImg}`);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.ogTitle);
    setMeta("name", "twitter:description", meta.ogDescription);
    setMeta("name", "twitter:image", `${industryConfig.siteUrl}${ogImg}`);

    // ─── JSON-LD: Page-specific structured data ───
    let ldScript = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = "page-jsonld";
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }

    const jsonLdType = meta.jsonLdType || "WebPage";
    const ldData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": jsonLdType,
      name: meta.ogTitle,
      description: meta.ogDescription,
      url: canonical,
    };

    if (jsonLdType === "WebSite") {
      ldData.potentialAction = {
        "@type": "SearchAction",
        target: `${industryConfig.siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      };
    }

    if (jsonLdType === "FAQPage") {
      // FAQ pages should include their own FAQ items via page-level injection
      // This provides the wrapper
      ldData.mainEntity = [];
    }

    ldScript.textContent = JSON.stringify(ldData);

    // ─── BreadcrumbList JSON-LD ───
    let bcScript = document.getElementById("breadcrumb-jsonld") as HTMLScriptElement | null;
    if (!bcScript) {
      bcScript = document.createElement("script");
      bcScript.id = "breadcrumb-jsonld";
      bcScript.type = "application/ld+json";
      document.head.appendChild(bcScript);
    }

    const crumbs = getBreadcrumbs(pathname);
    bcScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: `${industryConfig.siteUrl}${c.path === "/" ? "" : c.path}`,
      })),
    });

    // ─── Organization JSON-LD (only on homepage) ───
    let orgScript = document.getElementById("org-jsonld") as HTMLScriptElement | null;
    if (pathname === "/") {
      if (!orgScript) {
        orgScript = document.createElement("script");
        orgScript.id = "org-jsonld";
        orgScript.type = "application/ld+json";
        document.head.appendChild(orgScript);
      }
      orgScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: industryConfig.tagline,
        url: industryConfig.siteUrl,
        logo: `${industryConfig.siteUrl}/og-image.png`,
        description: industryConfig.description,
      });
    } else if (orgScript) {
      orgScript.textContent = "";
    }
  }, [pathname]);
}
