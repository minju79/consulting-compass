import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-card/80 backdrop-blur-sm sticky top-0 z-30 px-4">
            <SidebarTrigger className="mr-3" />
            <span className="text-sm font-medium text-muted-foreground">
              컨설팅 업종 웹 제작 가이드
            </span>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
