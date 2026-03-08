import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentRoutes } from "@/data/routeMeta";

export const PageNavigation = forwardRef<HTMLElement>(function PageNavigation(_props, ref) {
  const { pathname } = useLocation();
  const { prev, next } = getAdjacentRoutes(pathname);

  if (!prev && !next) return null;

  return (
    <nav ref={ref} aria-label="페이지 이동" className="mt-12 pt-6 border-t flex items-center justify-between gap-4">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left">
            <span className="block text-xs text-muted-foreground">이전</span>
            <span className="font-medium">{prev.navTitle}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div>
            <span className="block text-xs text-muted-foreground">다음</span>
            <span className="font-medium">{next.navTitle}</span>
          </div>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
});
