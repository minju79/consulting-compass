import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Search, ClipboardList, Layers, CheckSquare, Home } from "lucide-react";
import { useEffect } from "react";
import { fallbackMeta, getCanonicalUrl } from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = fallbackMeta;
    document.title = meta.title;

    const setMeta = (attr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", meta.description);
    setMeta("name", "robots", "noindex, nofollow");
    setMeta("property", "og:title", meta.ogTitle);
    setMeta("property", "og:description", meta.ogDescription);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", getCanonicalUrl(pathname));
    setMeta("property", "og:locale", industryConfig.locale);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", meta.ogTitle);
    setMeta("name", "twitter:description", meta.ogDescription);

    // Remove canonical for 404
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) link.remove();

    // Minimal JSON-LD
    let ldScript = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = "page-jsonld";
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta.ogTitle,
      description: meta.ogDescription,
    });

    // Remove breadcrumb JSON-LD on 404
    const bcScript = document.getElementById("breadcrumb-jsonld");
    if (bcScript) bcScript.textContent = "";
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg">
        <span className="text-8xl font-extrabold text-accent/15 font-display select-none">404</span>
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">페이지를 찾을 수 없습니다</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
          아래 링크를 통해 가이드 사이트로 돌아가세요.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" /> 메인으로 돌아가기
          </Link>
          <Link
            to="/client-brief"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <ClipboardList className="h-4 w-4" /> 브리프 시작하기
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Link to="/site-blueprint" className="text-xs text-accent hover:underline inline-flex items-center gap-1"><Layers className="h-3 w-3" /> 사이트 청사진</Link>
          <Link to="/checklist" className="text-xs text-accent hover:underline inline-flex items-center gap-1"><CheckSquare className="h-3 w-3" /> 체크리스트</Link>
          <Link to="/proof-system" className="text-xs text-accent hover:underline inline-flex items-center gap-1"><Search className="h-3 w-3" /> 신뢰 증거 체계</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
