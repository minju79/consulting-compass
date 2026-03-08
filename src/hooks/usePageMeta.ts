import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta, getCanonicalUrl } from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    if (!meta) return;

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

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.ogTitle);
    setMeta("name", "twitter:description", meta.ogDescription);

    // JSON-LD — update per page
    let ldScript = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = "page-jsonld";
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }

    const ldData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": meta.jsonLdType || "WebPage",
      name: meta.ogTitle,
      description: meta.ogDescription,
      url: canonical,
    };

    if (meta.jsonLdType === "WebSite") {
      ldData.potentialAction = {
        "@type": "SearchAction",
        target: `${industryConfig.siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      };
    }

    ldScript.textContent = JSON.stringify(ldData);
  }, [pathname]);
}
