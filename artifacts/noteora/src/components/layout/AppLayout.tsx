import { Sidebar } from "./Sidebar";
import { useLocation } from "wouter";
import { Search, Bell, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/theme";
import { useListNotifications, getListNotificationsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { useState } from "react";

const ROUTE_META: Record<string, { label: string; parent?: { label: string; href: string } }> = {
  "/dashboard":     { label: "Dashboard" },
  "/projects":      { label: "Projects" },
  "/datasets":      { label: "Datasets" },
  "/analytics":     { label: "Analytics" },
  "/reports":       { label: "Reports" },
  "/notifications": { label: "Notifications" },
  "/settings":      { label: "Settings" },
};

function AppHeader() {
  const [location] = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { data: notifications } = useListNotifications({
    query: { queryKey: getListNotificationsQueryKey() },
  });
  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;
  const [search, setSearch] = useState("");

  const base = "/" + (location.split("/")[1] ?? "");
  const meta = ROUTE_META[base];
  const pageLabel = meta?.label ?? "App";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-6 border-b border-border bg-background/80 backdrop-blur-md shrink-0 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        <span className="text-muted-foreground hidden sm:block">Workspace</span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 hidden sm:block shrink-0" />
        <span className="font-semibold text-foreground truncate">{pageLabel}</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search datasets, reports…"
            className="w-full h-8 rounded-lg border border-border bg-muted/40 pl-8 pr-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <div className="relative h-4 w-4">
            <Sun className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100"}`} />
            <Moon className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isDark ? "opacity-100" : "opacity-0 -rotate-90 scale-50"}`} />
          </div>
        </button>

        {/* Notification bell */}
        <Link href="/notifications">
          <button
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-background" />
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full bg-background flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
