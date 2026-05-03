import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  FolderKanban, Database, BarChart3, FileText, Users,
  CheckCircle2, Circle, ChevronRight, X, Sparkles, PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "noteora-onboarding-dismissed";
const MANUAL_KEY  = "noteora-onboarding-manual";

interface Step {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const STEPS: Step[] = [
  {
    id: "project",
    icon: FolderKanban,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    title: "Create your first project",
    description: "Organise datasets and charts in a shared workspace.",
    href: "/projects",
    cta: "Create project",
  },
  {
    id: "dataset",
    icon: Database,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    title: "Upload a dataset",
    description: "Import CSV, Excel, or JSON — ready in seconds.",
    href: "/datasets",
    cta: "Upload data",
  },
  {
    id: "chart",
    icon: BarChart3,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    title: "Build your first chart",
    description: "Drag fields to generate beautiful, interactive charts.",
    href: "/analytics",
    cta: "Open analytics",
  },
  {
    id: "report",
    icon: FileText,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    title: "Generate a report",
    description: "Export insights as a polished PDF or shareable link.",
    href: "/reports",
    cta: "New report",
  },
  {
    id: "team",
    icon: Users,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    title: "Invite a team member",
    description: "Collaborate in real time with your colleagues.",
    href: "/settings",
    cta: "Go to settings",
  },
];

interface Props {
  /** IDs of steps auto-detected as done from API data */
  apiDone: string[];
}

function loadManual(): Set<string> {
  try {
    const raw = localStorage.getItem(MANUAL_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveManual(ids: Set<string>) {
  try { localStorage.setItem(MANUAL_KEY, JSON.stringify([...ids])); } catch {}
}

function Confetti() {
  const items = Array.from({ length: 18 }, (_, i) => i);
  const colors = ["bg-blue-400", "bg-violet-400", "bg-cyan-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {items.map((i) => (
        <motion.div
          key={i}
          className={`absolute top-0 rounded-sm ${colors[i % colors.length]}`}
          style={{ left: `${5 + (i * 5.5) % 90}%`, width: 6, height: 10 }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: 160, opacity: 0, rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 20) }}
          transition={{ duration: 1.4 + (i % 4) * 0.2, delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

export function OnboardingChecklist({ apiDone }: Props) {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
  });
  const [manual, setManual] = useState<Set<string>>(loadManual);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [visible, setVisible] = useState(!dismissed);

  const isDone = (id: string) => apiDone.includes(id) || manual.has(id);
  const doneCount = STEPS.filter((s) => isDone(s.id)).length;
  const allDone = doneCount === STEPS.length;
  const pct = Math.round((doneCount / STEPS.length) * 100);

  const prevDone = STEPS.filter((s) => manual.has(s.id) || apiDone.includes(s.id)).length;

  const toggleManual = (id: string) => {
    setManual((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      saveManual(next);
      return next;
    });
  };

  // Celebrate when all steps just became done
  useEffect(() => {
    if (allDone && !celebration) {
      setShowConfetti(true);
      setCelebration(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setTimeout(() => setVisible(false), 4200);
    }
  }, [allDone]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    }, 400);
  };

  if (dismissed && !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.32 }}
          className="relative"
        >
          {showConfetti && <Confetti />}

          <div className={`relative overflow-hidden rounded-2xl border ${allDone ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"} p-5`}>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                {allDone ? (
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <PartyPopper className="h-5 w-5 text-emerald-500" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <h2 className="font-bold text-sm leading-snug">
                    {allDone ? "You're all set! 🎉" : "Get started with Noteora"}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {allDone
                      ? "You've completed every step. Welcome to the team!"
                      : `${doneCount} of ${STEPS.length} steps completed`}
                  </p>
                </div>
              </div>
              <button
                onClick={dismiss}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                aria-label="Dismiss checklist"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${allDone ? "bg-emerald-500" : "bg-primary"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-muted-foreground">{pct}% complete</span>
                <span className="text-[10px] text-muted-foreground">{doneCount}/{STEPS.length} done</span>
              </div>
            </div>

            {/* Steps grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
              {STEPS.map((step, i) => {
                const done = isDone(step.id);
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className={`relative flex flex-col gap-2.5 p-3 rounded-xl border transition-all ${
                      done
                        ? "border-emerald-500/25 bg-emerald-500/8 opacity-75"
                        : "border-border bg-background/60 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    {/* Check toggle */}
                    <button
                      onClick={() => toggleManual(step.id)}
                      className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={done ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {done
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        : <Circle className="h-4 w-4 opacity-30 hover:opacity-60 transition-opacity" />
                      }
                    </button>

                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${step.iconBg}`}>
                      <Icon className={`h-4 w-4 ${done ? "text-emerald-500" : step.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0 pr-5">
                      <p className={`text-xs font-semibold leading-snug mb-0.5 ${done ? "line-through text-muted-foreground" : ""}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        {step.description}
                      </p>
                    </div>

                    {!done && (
                      <Link href={step.href}>
                        <button className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors mt-auto">
                          {step.cta}
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            {!allDone && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-[11px] text-muted-foreground">
                  You can dismiss this and revisit it later from Settings.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground shrink-0"
                  onClick={dismiss}
                >
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
