import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCommandPalette } from "@/contexts/command-palette";
import { useTheme } from "@/contexts/theme";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  BarChart3,
  FileText,
  Bell,
  Settings,
  Plus,
  Upload,
  Sun,
  Moon,
  BookOpen,
  Users,
  Megaphone,
  Map,
  Mail,
  Shield,
  Sparkles,
  Home,
  GitBranch,
  FileSearch,
  Zap,
} from "lucide-react";

interface CommandEntry {
  icon: React.ElementType;
  label: string;
  description?: string;
  shortcut?: string;
  onSelect: () => void;
  iconColor?: string;
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { isDark, toggleTheme } = useTheme();
  const [, navigate] = useLocation();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const run = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  const NAV: CommandEntry[] = [
    { icon: LayoutDashboard, label: "Dashboard",      shortcut: "G D", iconColor: "text-blue-500",    onSelect: () => go("/dashboard")      },
    { icon: FolderKanban,    label: "Projects",       shortcut: "G P", iconColor: "text-violet-500",  onSelect: () => go("/projects")       },
    { icon: Database,        label: "Datasets",       shortcut: "G S", iconColor: "text-cyan-500",    onSelect: () => go("/datasets")       },
    { icon: BarChart3,       label: "Analytics",      shortcut: "G A", iconColor: "text-emerald-500", onSelect: () => go("/analytics")      },
    { icon: FileText,        label: "Reports",        shortcut: "G R", iconColor: "text-amber-500",   onSelect: () => go("/reports")        },
    { icon: Bell,            label: "Notifications",  shortcut: "G N", iconColor: "text-rose-500",    onSelect: () => go("/notifications")  },
    { icon: Settings,        label: "Settings",       shortcut: "G ,", iconColor: "text-slate-500",   onSelect: () => go("/settings")       },
  ];

  const CREATE: CommandEntry[] = [
    { icon: Plus,   label: "New Project",        description: "Start a new analytics project",  iconColor: "text-blue-500",    onSelect: () => go("/projects")  },
    { icon: Upload, label: "Upload Dataset",     description: "Import CSV, Excel or JSON",      iconColor: "text-violet-500",  onSelect: () => go("/datasets")  },
    { icon: Zap,    label: "Generate Report",    description: "AI-powered report from data",    iconColor: "text-amber-500",   onSelect: () => go("/reports")   },
    { icon: Sparkles, label: "Run AI Analysis",  description: "Detect insights automatically",  iconColor: "text-emerald-500", onSelect: () => go("/analytics") },
  ];

  const PAGES: CommandEntry[] = [
    { icon: Home,       label: "Home / Landing",   onSelect: () => go("/")          },
    { icon: Users,      label: "About us",          onSelect: () => go("/about")     },
    { icon: BookOpen,   label: "Blog",               onSelect: () => go("/blog")      },
    { icon: GitBranch,  label: "Changelog",          onSelect: () => go("/changelog") },
    { icon: Map,        label: "Roadmap",            onSelect: () => go("/roadmap")   },
    { icon: Megaphone,  label: "Careers",            onSelect: () => go("/careers")   },
    { icon: Mail,       label: "Contact",            onSelect: () => go("/contact")   },
    { icon: Shield,     label: "Security & Trust",   onSelect: () => go("/security")  },
    { icon: FileSearch, label: "Privacy Policy",     onSelect: () => go("/privacy")   },
  ];

  const THEME: CommandEntry[] = [
    {
      icon: isDark ? Sun : Moon,
      label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      description: "Toggle appearance",
      shortcut: "⌘ \\",
      iconColor: isDark ? "text-amber-400" : "text-slate-500",
      onSelect: () => run(toggleTheme),
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, actions, datasets…" />
      <CommandList className="max-h-[480px]">
        <CommandEmpty>
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
            <FileSearch className="h-8 w-8 opacity-30" />
            <span className="text-sm">No results found.</span>
          </div>
        </CommandEmpty>

        {/* Navigation */}
        <CommandGroup heading="Navigate">
          {NAV.map((cmd) => (
            <CommandItem
              key={cmd.label}
              value={cmd.label}
              onSelect={cmd.onSelect}
              className="flex items-center gap-3 py-2.5 cursor-pointer"
            >
              <div className={`flex items-center justify-center h-7 w-7 rounded-lg bg-muted shrink-0`}>
                <cmd.icon className={`h-3.5 w-3.5 ${cmd.iconColor ?? "text-muted-foreground"}`} />
              </div>
              <span className="flex-1">{cmd.label}</span>
              {cmd.shortcut && (
                <CommandShortcut>
                  {cmd.shortcut.split(" ").map((k, i) => (
                    <kbd
                      key={i}
                      className="ml-1 inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-bold text-muted-foreground"
                    >
                      {k}
                    </kbd>
                  ))}
                </CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Create / Actions */}
        <CommandGroup heading="Quick Actions">
          {CREATE.map((cmd) => (
            <CommandItem
              key={cmd.label}
              value={cmd.label + " " + (cmd.description ?? "")}
              onSelect={cmd.onSelect}
              className="flex items-center gap-3 py-2.5 cursor-pointer"
            >
              <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-muted shrink-0">
                <cmd.icon className={`h-3.5 w-3.5 ${cmd.iconColor ?? "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{cmd.label}</div>
                {cmd.description && (
                  <div className="text-[11px] text-muted-foreground">{cmd.description}</div>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Appearance */}
        <CommandGroup heading="Appearance">
          {THEME.map((cmd) => (
            <CommandItem
              key={cmd.label}
              value={cmd.label}
              onSelect={cmd.onSelect}
              className="flex items-center gap-3 py-2.5 cursor-pointer"
            >
              <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-muted shrink-0">
                <cmd.icon className={`h-3.5 w-3.5 ${cmd.iconColor ?? "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{cmd.label}</div>
                {cmd.description && (
                  <div className="text-[11px] text-muted-foreground">{cmd.description}</div>
                )}
              </div>
              {cmd.shortcut && (
                <CommandShortcut>
                  <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-bold text-muted-foreground">
                    {cmd.shortcut}
                  </kbd>
                </CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Pages */}
        <CommandGroup heading="Pages">
          {PAGES.map((cmd) => (
            <CommandItem
              key={cmd.label}
              value={cmd.label}
              onSelect={cmd.onSelect}
              className="flex items-center gap-3 py-2 cursor-pointer"
            >
              <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-muted shrink-0">
                <cmd.icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span className="flex-1">{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

      {/* Footer hint */}
      <div className="border-t border-border px-4 py-2.5 flex items-center gap-4 text-[11px] text-muted-foreground">
        <span><kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-bold">↑↓</kbd> navigate</span>
        <span><kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-bold">↵</kbd> select</span>
        <span><kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-bold">Esc</kbd> close</span>
        <span className="ml-auto opacity-60">⌘K to open anywhere</span>
      </div>
    </CommandDialog>
  );
}
