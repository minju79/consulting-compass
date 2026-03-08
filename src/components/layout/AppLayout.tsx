import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PageNavigation } from "@/components/guide/PageNavigation";
import { CommandSearch } from "@/components/CommandSearch";
import { industryConfig } from "@/data/industryConfig";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  usePageMeta();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
        >
          본문으로 건너뛰기
        </a>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header role="banner" className="h-14 flex items-center border-b bg-card/80 backdrop-blur-sm sticky top-0 z-30 px-4">
            <SidebarTrigger className="mr-3" />
            <span className="text-sm font-medium text-muted-foreground flex-1 truncate">
              {industryConfig.tagline}
            </span>
            <CommandSearch />
          </header>
          <main id="main-content" role="main" className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">
              {children}
              <PageNavigation />
            </div>
          </main>
          <footer role="contentinfo" className="border-t py-4 px-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {industryConfig.tagline} · v{industryConfig.version}
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
