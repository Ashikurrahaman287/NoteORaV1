import { Sidebar } from "./Sidebar";
import { useLocation } from "wouter";
import { Search, Bell, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/theme";
import { useCommandPalette } from "@/contexts/command-palette";
import { useListNotifications, getListNotificationsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";

const ROUTE_META: Record<string, { label: string }> = {
  "/dashboard":     { label: "Dashboard"     },
  "/projects":      { label: "Projects"      },
  "/datasets":      { label: "Datasets"      },
  "/analytics":     { label: "Analytics"     },
  "/reports":       { label: "Reports"       },
  "/notifications": { label: "Notifications" },
  "/settings":      { label: "Settings"      },
};

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPod|iPad/.test(navigator.platform);
const kbdMod = isMac ? "⌘" : "Ctrl";

function AppHeader() {
  const [location] = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { setOpen } = useCommandPalette();
  const { data: notifications } = useListNotifications({
    query: { queryKey: getListNotificationsQueryKey() },
  });
  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

  const base = "/" + (location.split("/")[1] ?? "");
  const pageLabel = ROUTE_META[base]?.label ?? "App";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-6 border-b border-border bg-background/80 backdrop-blur-md shrink-0 gap-4">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0 shrink-0">
        <span className="text-muted-foreground hidden sm:block">Workspace</span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 hidden sm:block shrink-0" />
        <span className="font-semibold text-foreground truncate">{pageLabel}</span>
      </div>

      {/* ⌘K Palette trigger — looks like a search bar */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 max-w-xs hidden md:flex items-center gap-2 h-8 rounded-lg border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground/60 hover:bg-muted/70 hover:text-muted-foreground hover:border-border/80 transition-all text-left group"
        aria-label="Open command palette"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1">Search or jump to…</span>
        <span className="hidden lg:flex items-center gap-0.5 shrink-0">
          <kbd className="inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-bold text-muted-foreground/70 group-hover:border-border/80 transition-colors">
            {kbdMod}K
          </kbd>
        </span>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">

        {/* Mobile: small ⌘K button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <div className="relative h-4 w-4">
            <Sun  className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100"}`} />
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
