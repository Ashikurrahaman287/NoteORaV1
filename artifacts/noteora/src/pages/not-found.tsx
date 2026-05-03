import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, BarChart3, FolderKanban, Database } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-primary/8 blur-[60px]" />
        </div>
        <div className="text-[120px] font-black leading-none bg-gradient-to-br from-primary/30 to-cyan-500/20 bg-clip-text text-transparent select-none">
          404
        </div>
      </div>

      <div className="mb-3 flex items-center justify-center">
        <img src="/noteora-logo.png" alt="Noteora" className="h-8 w-auto" />
      </div>

      <h1 className="text-2xl font-bold mt-2 mb-3">Page not found</h1>
      <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Home className="h-4 w-4" /> Go home
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="gap-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" /> Go back
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mb-4">Or jump to:</div>
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
          { href: "/projects", icon: FolderKanban, label: "Projects" },
          { href: "/datasets", icon: Database, label: "Datasets" },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/40 rounded-lg px-4 py-2.5 transition-all cursor-pointer bg-card hover:shadow-sm">
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
