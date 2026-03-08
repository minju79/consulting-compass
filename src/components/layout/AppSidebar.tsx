import {
  LayoutDashboard, Building2, Palette, Component, Users, FileText,
  PenTool, Search, CheckSquare, ClipboardList, Map, Settings, ShieldCheck,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { getRoutesByGroup } from "@/data/routeMeta";
import { industryConfig } from "@/data/industryConfig";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Building2, Palette, Component, Users, FileText,
  PenTool, Search, CheckSquare, ClipboardList, Map, Settings, ShieldCheck,
};

function NavGroup({ label, group, collapsed }: { label: string; group: "guide" | "tool"; collapsed: boolean }) {
  const items = getRoutesByGroup(group);
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
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className="transition-colors hover:bg-sidebar-accent"
                    activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                  >
                    <Icon className="mr-2 h-4 w-4 shrink-0" />
                    {!collapsed && <span className="text-sm">{item.navTitle}</span>}
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
                {industryConfig.nameEn}
              </h2>
              <p className="text-xs text-sidebar-foreground/60 mt-0.5">
                {industryConfig.shortTagline}
              </p>
              <span className="text-[9px] text-sidebar-foreground/30 mt-1 block">
                v{industryConfig.version}
              </span>
            </div>
          )}
        </div>
        <NavGroup label={industryConfig.navGroups.guide} group="guide" collapsed={collapsed} />
        <NavGroup label={industryConfig.navGroups.tool} group="tool" collapsed={collapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
