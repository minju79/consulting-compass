import { Link } from "react-router-dom";
import { ArrowLeft, Search, ClipboardList, Layers } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <span className="text-7xl font-extrabold text-accent/20 font-display">404</span>
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
            <ArrowLeft className="h-4 w-4" /> 메인으로 돌아가기
          </Link>
          <Link
            to="/client-brief"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <ClipboardList className="h-4 w-4" /> 브리프 시작하기
          </Link>
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <Link to="/site-blueprint" className="text-xs text-accent hover:underline inline-flex items-center gap-1"><Layers className="h-3 w-3" /> 사이트 청사진</Link>
          <Link to="/checklist" className="text-xs text-accent hover:underline inline-flex items-center gap-1"><Search className="h-3 w-3" /> 체크리스트</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
