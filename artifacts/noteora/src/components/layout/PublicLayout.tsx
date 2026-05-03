import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Users, Globe, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/theme";

const NAV_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Features",     href: "/features"     },
  { label: "Pricing",      href: "/pricing"       },
  { label: "Blog",         href: "/blog"          },
];

const FOOTER_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Features",  href: "/features"  },
      { label: "Pricing",   href: "/pricing"   },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap",   href: "/roadmap"   },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",    href: "/about"   },
      { label: "Blog",     href: "/blog"    },
      { label: "Careers",  href: "/careers" },
      { label: "Contact",  href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",   href: "/privacy"  },
      { label: "Terms of Service", href: "/terms"    },
      { label: "Security",         href: "/security" },
      { label: "Cookies",          href: "/cookies"  },
    ],
  },
];

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
      aria-label="Toggle theme"
    >
      <div className="relative h-4 w-4">
        <Sun className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100"}`} />
        <Moon className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isDark ? "opacity-100" : "opacity-0 -rotate-90 scale-50"}`} />
      </div>
    </button>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      {/* Nav */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className="text-lg font-extrabold tracking-tight cursor-pointer hover:text-primary transition-colors">
              Noteora
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="shadow-md shadow-primary/20">
                Get Started <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile: theme + CTA + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="shadow-md shadow-primary/20">
                Get Started
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                  <span className="flex items-center h-11 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-colors cursor-pointer">
                    {l.label}
                  </span>
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log in</Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full shadow-md shadow-primary/20">
                    Get Started <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="pt-16 flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link href="/">
                <span className="text-lg font-extrabold tracking-tight cursor-pointer hover:text-primary transition-colors block mb-4">
                  Noteora
                </span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Data intelligence for the modern enterprise. Founded by AGT Venture. Import, visualize, and share your data with confidence.
              </p>
              <div className="flex gap-3 mt-5">
                {[Shield, Users, Globe].map((Icon, i) => (
                  <div key={i} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="font-bold text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                          {l.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Noteora, Inc. · A product of AGT Venture. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">SOC 2 Compliant</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">GDPR Ready</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
