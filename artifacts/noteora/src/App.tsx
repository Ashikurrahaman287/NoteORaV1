import { useEffect, useRef, lazy, Suspense } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AppLayout } from "./components/layout/AppLayout";
import { ErrorBoundary } from "./components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { CommandPaletteProvider } from "./contexts/command-palette";
import { CommandPalette } from "./components/CommandPalette";

const LandingPage = lazy(() => import("./pages/landing"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Projects = lazy(() => import("./pages/projects"));
const ProjectDetail = lazy(() => import("./pages/project-detail"));
const Datasets = lazy(() => import("./pages/datasets"));
const Analytics = lazy(() => import("./pages/analytics"));
const Reports = lazy(() => import("./pages/reports"));
const Notifications = lazy(() => import("./pages/notifications"));
const Settings = lazy(() => import("./pages/settings"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AboutPage = lazy(() => import("./pages/about"));
const BlogPage = lazy(() => import("./pages/blog"));
const CareersPage = lazy(() => import("./pages/careers"));
const ContactPage = lazy(() => import("./pages/contact"));
const PrivacyPage = lazy(() => import("./pages/privacy"));
const TermsPage = lazy(() => import("./pages/terms"));
const SecurityPage = lazy(() => import("./pages/security"));
const CookiesPage = lazy(() => import("./pages/cookies"));
const ChangelogPage = lazy(() => import("./pages/changelog"));
const RoadmapPage = lazy(() => import("./pages/roadmap"));
const FeaturesPage = lazy(() => import("./pages/features"));
const PricingPage = lazy(() => import("./pages/pricing"));
const BlogPostPage = lazy(() => import("./pages/blog-post"));
const HowItWorksPage = lazy(() => import("./pages/how-it-works"));

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/noteora-logo.png`,
  },
  variables: {
    colorPrimary: "hsl(235 86% 65%)",
    colorForeground: "hsl(222 47% 11%)",
    colorMutedForeground: "hsl(215 16% 47%)",
    colorDanger: "hsl(0 84% 60%)",
    colorBackground: "hsl(0 0% 100%)",
    colorInput: "hsl(214 32% 91%)",
    colorInputForeground: "hsl(222 47% 11%)",
    colorNeutral: "hsl(214 32% 91%)",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "0.5rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox:
      "bg-white rounded-2xl w-[440px] max-w-full overflow-hidden shadow-xl border border-border dark:bg-card dark:border-border",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButtonText: "text-foreground font-medium",
    formFieldLabel: "text-foreground font-medium",
    footerActionLink: "text-primary hover:text-primary/80",
    footerActionText: "text-muted-foreground",
    dividerText: "text-muted-foreground bg-card px-2",
    identityPreviewEditButton: "text-primary hover:text-primary/80",
    formFieldSuccessText: "text-primary",
    alertText: "text-destructive font-medium",
    logoBox: "mb-6",
    logoImage: "h-10",
    socialButtonsBlockButton: "border-border hover:bg-secondary/50",
    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    formFieldInput: "bg-background border-input text-foreground h-10",
    footerAction: "bg-secondary/50 py-4",
    dividerLine: "bg-border",
    alert: "bg-destructive/10 border border-destructive/20",
    otpCodeFieldInput: "border-input",
    formFieldRow: "mb-4",
    main: "px-8 pb-8 pt-4",
  },
};

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-80" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <Skeleton className="h-64 mt-4" />
    </div>
  );
}

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/dashboard" />
      </Show>
      <Show when="signed-out">
        <Suspense fallback={null}>
          <LandingPage />
        </Suspense>
      </Show>
    </>
  );
}

function Protected({ component: Component }: { component: React.ComponentType }) {
  return (
    <>
      <Show when="signed-in">
        <AppLayout>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Component />
            </Suspense>
          </ErrorBoundary>
        </AppLayout>
      </Show>
      <Show when="signed-out">
        <Redirect to="/" />
      </Show>
    </>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <CommandPaletteProvider>
          <CommandPalette />
          <TooltipProvider>
            <Switch>
              <Route path="/" component={HomeRedirect} />
              <Route path="/sign-in/*?" component={SignInPage} />
              <Route path="/sign-up/*?" component={SignUpPage} />
              {/* Public pages */}
              <Route path="/how-it-works" component={() => <Suspense fallback={<PageLoader />}><HowItWorksPage /></Suspense>} />
              <Route path="/about" component={() => <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
              <Route path="/blog/:slug" component={() => <Suspense fallback={<PageLoader />}><BlogPostPage /></Suspense>} />
              <Route path="/blog" component={() => <Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
              <Route path="/careers" component={() => <Suspense fallback={<PageLoader />}><CareersPage /></Suspense>} />
              <Route path="/contact" component={() => <Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
              <Route path="/privacy" component={() => <Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
              <Route path="/terms" component={() => <Suspense fallback={<PageLoader />}><TermsPage /></Suspense>} />
              <Route path="/security" component={() => <Suspense fallback={<PageLoader />}><SecurityPage /></Suspense>} />
              <Route path="/cookies" component={() => <Suspense fallback={<PageLoader />}><CookiesPage /></Suspense>} />
              <Route path="/changelog" component={() => <Suspense fallback={<PageLoader />}><ChangelogPage /></Suspense>} />
              <Route path="/roadmap" component={() => <Suspense fallback={<PageLoader />}><RoadmapPage /></Suspense>} />
              <Route path="/features" component={() => <Suspense fallback={<PageLoader />}><FeaturesPage /></Suspense>} />
              <Route path="/pricing" component={() => <Suspense fallback={<PageLoader />}><PricingPage /></Suspense>} />
              {/* Protected app pages */}
              <Route path="/dashboard" component={() => <Protected component={Dashboard} />} />
              <Route path="/projects/:id" component={() => <Protected component={ProjectDetail} />} />
              <Route path="/projects" component={() => <Protected component={Projects} />} />
              <Route path="/datasets" component={() => <Protected component={Datasets} />} />
              <Route path="/analytics" component={() => <Protected component={Analytics} />} />
              <Route path="/reports" component={() => <Protected component={Reports} />} />
              <Route path="/notifications" component={() => <Protected component={Notifications} />} />
              <Route path="/settings" component={() => <Protected component={Settings} />} />
              <Route component={() => <Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
            </Switch>
          </TooltipProvider>
        </CommandPaletteProvider>
      </QueryClientProvider>

    </ClerkProvider>
  );
}

export default function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
      <Toaster />
    </WouterRouter>
  );
}
