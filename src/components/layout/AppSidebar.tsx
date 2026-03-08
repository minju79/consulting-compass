import {
  LayoutDashboard,
  Building2,
  Palette,
  Component,
  Users,
  FileText,
  PenTool,
  Search,
  CheckSquare,
  ClipboardList,
  Map,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Building2, Palette, Component, Users, FileText,
  PenTool, Search, CheckSquare, ClipboardList, Map, Settings, ShieldCheck,
};

const guideNav = [
  { title: "Overview", url: "/", icon: "LayoutDashboard" },
  { title: "Industry", url: "/industry-overview", icon: "Building2" },
  { title: "Design Guide", url: "/design-guide", icon: "Palette" },
  { title: "UI Guide", url: "/ui-guide", icon: "Component" },
  { title: "UX Guide", url: "/ux-guide", icon: "Users" },
  { title: "Page Templates", url: "/page-templates", icon: "FileText" },
  { title: "Content Guide", url: "/content-guide", icon: "PenTool" },
  { title: "SEO / GEO", url: "/seo-geo", icon: "Search" },
  { title: "Checklist", url: "/checklist", icon: "CheckSquare" },
];

const toolNav = [
  { title: "Client Brief", url: "/client-brief", icon: "ClipboardList" },
  { title: "Site Blueprint", url: "/site-blueprint", icon: "Map" },
  { title: "Impl Rules", url: "/implementation-rules", icon: "Settings" },
  { title: "Proof System", url: "/proof-system", icon: "ShieldCheck" },
];

function NavGroup({ label, items, collapsed }: { label: string; items: typeof guideNav; collapsed: boolean }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className="transition-colors hover:bg-sidebar-accent"
                    activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                  >
                    <Icon className="mr-2 h-4 w-4 shrink-0" />
                    {!collapsed && <span className="text-sm">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-4 py-5">
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold tracking-wide text-sidebar-primary-foreground opacity-90">
                Consulting
              </h2>
              <p className="text-xs text-sidebar-foreground/60 mt-0.5">
                Web Guide System
              </p>
            </div>
          )}
        </div>
        <NavGroup label="가이드" items={guideNav} collapsed={collapsed} />
        <NavGroup label="제작 도구" items={toolNav} collapsed={collapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
