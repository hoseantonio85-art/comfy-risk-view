import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Calendar,
  AlertTriangle,
  Shield,
  BarChart3,
  Bot,
  Target,
  BookOpen,
  MoreHorizontal,
  HelpCircle,
  ChevronLeft,
  Building2,
  ListFilter,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Главная", to: "/" },
  { icon: Calendar, label: "События", to: "#" },
  { icon: AlertTriangle, label: "Риски", to: "/risks" },
  { icon: Building2, label: "Профиль компании", to: "/profile" },
  { icon: Shield, label: "Меры", to: "#" },
  { icon: BarChart3, label: "Аналитика", to: "#" },
  { icon: Bot, label: "AI мониторинг", to: "#" },
  { icon: Target, label: "Лимитная кампания", to: "#" },
  { icon: BookOpen, label: "База знаний", to: "#" },
  { icon: MoreHorizontal, label: "Ещё", to: "#", hasChevron: true },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-border bg-card h-screen sticky top-0 transition-all duration-200 ${collapsed ? "w-[72px]" : "w-[240px]"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-4">
        <div className="w-8 h-8 rounded-lg bg-norm-green flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {!collapsed && <span className="font-bold text-lg tracking-tight text-foreground">НОРМ</span>}
      </div>

      {/* Organization */}
      <div className="px-3 mb-2">
        <div className={`flex items-center gap-2 p-2 rounded-lg bg-secondary ${collapsed ? "justify-center" : ""}`}>
          <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-muted-foreground leading-none">Организация</div>
              <div className="text-xs font-medium text-foreground truncate">Не выбрана</div>
            </div>
          )}
          {!collapsed && <ListFilter className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        </div>
      </div>

      <div className="h-px bg-border mx-3 mb-1" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to) && item.to !== "#";
          return (
            <Link
              key={item.label}
              to={item.to as any}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              } ${collapsed ? "justify-center px-0" : ""}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.hasChevron && (
                <ChevronLeft className="w-4 h-4 ml-auto rotate-[270deg]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-2 space-y-1 border-t border-border">
        <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? "justify-center px-0" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0">
            МЕ
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground truncate">Михайлова Екатерина</div>
              <div className="text-xs text-muted-foreground">Риск-менеджер (ЦА)</div>
            </div>
          )}
        </div>
        <button className={`flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg w-full ${collapsed ? "justify-center px-0" : ""}`}>
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Служба поддержки</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg w-full ${collapsed ? "justify-center px-0" : ""}`}
        >
          <ChevronLeft className={`w-5 h-5 flex-shrink-0 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && <span>Свернуть</span>}
        </button>
      </div>
    </aside>
  );
}
