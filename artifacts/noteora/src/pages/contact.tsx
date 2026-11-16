import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageCircle, Clock, Zap } from "lucide-react";
import { useState } from "react";

const CHANNELS = [
  { icon: Mail, title: "Email us", desc: "For general enquiries, partnerships, and press.", value: "hello@noteora.com", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: MessageCircle, title: "Sales", desc: "Interested in Enterprise? Our team responds within 2 hours.", value: "sales@noteora.com", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Zap, title: "Support", desc: "Current customer? Get help from our support team.", value: "support@noteora.com", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Clock, title: "Response time", desc: "We reply to all messages within one business day. Priority support for Pro & Enterprise plans.", value: "< 24 hours", color: "text-violet-500", bg: "bg-violet-500/10" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "General enquiry", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="text-5xl font-extrabold mb-4">We'd love to hear from you</h1>
          <p className="text-muted-foreground text-lg">Whether you have a question, want to book a demo, or just want to say hi — our team is here.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-5">
            {CHANNELS.map((c) => (
              <div key={c.title} className="rounded-xl border border-border p-5 flex gap-4">
                <div className={`h-10 w-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">{c.desc}</p>
                  <p className="text-sm font-medium text-primary">{c.value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-border p-5">
              <div className="flex gap-3 items-start">
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Office</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">548 Market St, Suite 1200<br />San Francisco, CA 94104<br />United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-border p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-extrabold mb-2">Message sent!</h3>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out. We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Your name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Work email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Company</label>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option>General enquiry</option>
                      <option>Book a demo</option>
                      <option>Enterprise sales</option>
                      <option>Partnership</option>
                      <option>Press & media</option>
                      <option>Careers</option>
                      <option>Technical support</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                  </div>
                  <Button type="submit" className="w-full" size="lg">Send message</Button>
                  <p className="text-xs text-muted-foreground text-center">By submitting, you agree to our <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
