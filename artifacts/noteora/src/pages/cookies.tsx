import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const COOKIE_TYPES = [
  {
    name: "Strictly Necessary",
    required: true,
    desc: "These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions you take such as logging in or filling in forms.",
    examples: [
      { name: "__session", purpose: "Manages your authenticated session", duration: "Session" },
      { name: "__clerk_db_jwt", purpose: "Authentication token from Clerk", duration: "Session" },
      { name: "csrf_token", purpose: "Prevents cross-site request forgery", duration: "Session" },
    ],
  },
  {
    name: "Performance & Analytics",
    required: false,
    desc: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. All data collected by these cookies is aggregated and anonymous.",
    examples: [
      { name: "_noteora_session_id", purpose: "Tracks session for analytics (anonymised)", duration: "30 minutes" },
      { name: "_noteora_uid", purpose: "Distinguishes unique visitors (hashed)", duration: "1 year" },
    ],
  },
  {
    name: "Functional",
    required: false,
    desc: "These cookies enable the website to provide enhanced functionality and personalisation, such as remembering your theme preference (dark/light mode) and sidebar state.",
    examples: [
      { name: "noteora_theme", purpose: "Stores your dark/light mode preference", duration: "1 year" },
      { name: "noteora_sidebar", purpose: "Stores sidebar collapsed/expanded state", duration: "30 days" },
    ],
  },
  {
    name: "Marketing",
    required: false,
    desc: "Currently, we do not use marketing or advertising cookies. We do not serve ads on Noteora or share your browsing behaviour with advertising networks.",
    examples: [],
  },
];

export default function CookiesPage() {
  const [prefs, setPrefs] = useState({ performance: true, functional: true, marketing: false });

  return (
    <PublicLayout>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: <strong>January 15, 2026</strong></p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              This Cookie Policy explains what cookies are, which cookies Noteora uses, and how you can control them. For more information about how we use your personal data, see our{" "}
              <Link href="/privacy"><span className="text-primary underline cursor-pointer">Privacy Policy</span></Link>.
            </p>
          </div>

          {/* What are cookies */}
          <div className="border-t border-border pt-8 mb-10">
            <h2 className="text-xl font-bold mb-3">What are cookies?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or to work more efficiently, as well as to provide information to the site owners. Cookies set by the website you're visiting are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".
            </p>
          </div>

          {/* Cookie types */}
          <div className="space-y-8 mb-12">
            {COOKIE_TYPES.map((type) => (
              <div key={type.name} className="rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Cookie className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">{type.name}</h3>
                    {type.required && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">Always on</span>
                    )}
                  </div>
                  {!type.required && (
                    <button
                      onClick={() => {
                        const key = type.name.toLowerCase().split(" ")[0] as keyof typeof prefs;
                        if (key in prefs) setPrefs((p) => ({ ...p, [key]: !p[key] }));
                      }}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        prefs[type.name.toLowerCase().split(" ")[0] as keyof typeof prefs]
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                    >
                      <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        prefs[type.name.toLowerCase().split(" ")[0] as keyof typeof prefs]
                          ? "translate-x-5"
                          : ""
                      }`} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{type.desc}</p>
                {type.examples.length > 0 && (
                  <div className="rounded-lg bg-muted/40 overflow-hidden">
                    <div className="grid grid-cols-3 text-xs font-semibold text-muted-foreground px-4 py-2 border-b border-border">
                      <span>Cookie name</span><span>Purpose</span><span>Duration</span>
                    </div>
                    {type.examples.map((ex) => (
                      <div key={ex.name} className="grid grid-cols-3 text-xs px-4 py-2.5 border-b border-border last:border-0">
                        <span className="font-mono text-foreground">{ex.name}</span>
                        <span className="text-muted-foreground">{ex.purpose}</span>
                        <span className="text-muted-foreground">{ex.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPrefs({ performance: false, functional: false, marketing: false })}>
              Reject optional
            </Button>
            <Button onClick={() => setPrefs({ performance: true, functional: true, marketing: false })}>
              Save preferences
            </Button>
          </div>

          <div className="border-t border-border pt-8 mt-10">
            <h2 className="text-xl font-bold mb-3">How to control cookies via your browser</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You can also control cookies through your browser settings. Most browsers allow you to refuse all cookies or accept only certain types. Note that disabling strictly necessary cookies will prevent you from logging in to Noteora. For more information, visit the help pages of your browser: <a href="https://support.google.com/chrome/answer/95647" className="text-primary underline" target="_blank" rel="noreferrer">Chrome</a>, <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-primary underline" target="_blank" rel="noreferrer">Firefox</a>, <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" className="text-primary underline" target="_blank" rel="noreferrer">Safari</a>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
