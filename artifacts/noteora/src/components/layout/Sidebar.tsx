import { Link, useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  BarChart3,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/theme";
import { useListNotifications, getListNotificationsQueryKey } from "@workspace/api-client-react";

const navItems = [
  { href: "/dashboard",     icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/projects",      icon: FolderKanban,    label: "Projects"     },
  { href: "/datasets",      icon: Database,        label: "Datasets"     },
  { href: "/analytics",     icon: BarChart3,       label: "Analytics"    },
  { href: "/reports",       icon: FileText,        label: "Reports"      },
];

function SidebarNav({ location }: { location: string }) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const { data: notifications } = useListNotifications({
    query: { queryKey: getListNotificationsQueryKey() },
  });
  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-sidebar-border/60 flex items-center gap-2">
        <span className="text-base font-extrabold tracking-tight text-sidebar-foreground">
          Noteora
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sidebar-primary/20 text-sidebar-primary border border-sidebar-primary/30">
          Pro
        </span>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <p className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-widest mb-2 px-3">Menu</p>
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <div
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-sm font-medium ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50"}`} />
                {item.label}
                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />}
              </div>
            </Link>
          );
        })}

        <div className="pt-6 pb-1">
          <p className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-widest mb-2 px-3">System</p>
        </div>

        {/* Notifications with badge */}
        <Link href="/notifications">
          <div
            data-testid="nav-notifications"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-sm font-medium ${
              location === "/notifications"
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            }`}
          >
            <div className="relative">
              <Bell className={`h-4 w-4 shrink-0 ${location === "/notifications" ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50"}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            Notifications
            {unreadCount > 0 && location !== "/notifications" && (
              <span className="ml-auto text-[10px] font-bold bg-red-500/15 text-red-500 border border-red-500/20 rounded px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </div>
        </Link>

        <Link href="/settings">
          <div
            data-testid="nav-settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-sm font-medium ${
              location === "/settings"
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            }`}
          >
            <Settings className={`h-4 w-4 shrink-0 ${location === "/settings" ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50"}`} />
            Settings
          </div>
        </Link>
      </div>

      {/* Theme toggle + User */}
      <div className="p-3 border-t border-sidebar-border/60 space-y-1">
        {/* Theme toggle row */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-all group"
          aria-label="Toggle theme"
        >
          <div className="relative h-4 w-4 shrink-0">
            <Sun className={`absolute inset-0 h-4 w-4 transition-all ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-50 group-hover:opacity-100"}`} />
            <Moon className={`absolute inset-0 h-4 w-4 transition-all ${isDark ? "opacity-50 group-hover:opacity-100" : "opacity-0 -rotate-90 scale-50"}`} />
          </div>
          {isDark ? "Dark mode" : "Light mode"}
          <span className="ml-auto text-[10px] font-bold bg-sidebar-accent/80 text-sidebar-foreground/50 rounded px-1.5 py-0.5">
            {isDark ? "ON" : "OFF"}
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sidebar-primary font-bold text-sm shrink-0">
            {user?.firstName?.[0] ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-sidebar-foreground truncate">{user?.fullName ?? "User"}</div>
            <div className="text-[10px] text-sidebar-foreground/50 truncate">{user?.primaryEmailAddress?.emailAddress}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/60 h-9 text-sm"
          data-testid="button-signout"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [location] = useLocation();

  return (
    <>
      <div className="hidden md:block w-64 shrink-0 h-[100dvh] sticky top-0">
        <SidebarNav location={location} />
      </div>
      <div className="md:hidden flex items-center px-4 py-3 border-b border-border bg-background sticky top-0 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-3" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarNav location={location} />
          </SheetContent>
        </Sheet>
        <span className="text-base font-extrabold tracking-tight">Noteora</span>
      </div>
    </>
  );
}
