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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/projects", icon: FolderKanban, label: "Projects" },
  { href: "/datasets", icon: Database, label: "Datasets" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/reports", icon: FileText, label: "Reports" },
];

const bottomNavItems = [
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

function SidebarNav({ location }: { location: string }) {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-sidebar-border/60">
        <img src="/noteora-logo.png" alt="Noteora" className="h-8 w-auto" />
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
                <item.icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50"}`} />
                {item.label}
                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />}
              </div>
            </Link>
          );
        })}

        <div className="pt-6 pb-1">
          <p className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-widest mb-2 px-3">System</p>
        </div>
        {bottomNavItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-sm font-medium ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50"}`} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border/60">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-2">
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
        <img src="/noteora-logo.png" alt="Noteora" className="h-7 w-auto" />
      </div>
    </>
  );
}
