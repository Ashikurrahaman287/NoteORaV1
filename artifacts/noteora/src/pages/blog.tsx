import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";

const POSTS = [
  {
    slug: "#",
    category: "Company",
    categoryColor: "bg-blue-500/10 text-blue-600",
    title: "Noteora Raises $10M Series A to Build the AI Analytics Layer for Modern Teams",
    excerpt: "Today we're thrilled to announce a $10M Series A round led by Horizon Ventures. We'll use the capital to accelerate our AI-powered insights engine — the feature our customers ask about most.",
    author: "Arjun Gupta",
    authorRole: "CEO",
    avatar: "AG",
    avatarColor: "bg-blue-600",
    date: "February 12, 2026",
    readTime: "4 min read",
    featured: true,
  },
  {
    slug: "#",
    category: "Product",
    categoryColor: "bg-violet-500/10 text-violet-600",
    title: "Introducing AI Insights: Your Always-On Data Analyst",
    excerpt: "AI Insights scans your datasets in real time and surfaces anomalies, trends, and opportunities — automatically, without any prompts. Here's how we built it.",
    author: "Tomás Rivera",
    authorRole: "CTO",
    avatar: "TR",
    avatarColor: "bg-violet-600",
    date: "January 28, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "#",
    category: "Engineering",
    categoryColor: "bg-emerald-500/10 text-emerald-600",
    title: "How We Serve Sub-200ms Query Responses at Scale",
    excerpt: "Speed is a core feature for Noteora. In this post, Kwame walks through the caching strategy, query planning optimisations, and infrastructure choices that let us promise real-time analytics to every customer.",
    author: "Kwame Asante",
    authorRole: "Head of Engineering",
    avatar: "KA",
    avatarColor: "bg-amber-600",
    date: "January 14, 2026",
    readTime: "11 min read",
    featured: false,
  },
  {
    slug: "#",
    category: "Customer Stories",
    categoryColor: "bg-rose-500/10 text-rose-600",
    title: "How Stackwise Cut Reporting Time by 80% with Noteora",
    excerpt: "Stackwise's analytics team was spending four hours every Monday morning producing weekly reports. After switching to Noteora, that number dropped to 45 minutes. Here's how they did it.",
    author: "Daniel Park",
    authorRole: "VP of Sales",
    avatar: "DP",
    avatarColor: "bg-sky-600",
    date: "December 20, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "#",
    category: "Product",
    categoryColor: "bg-violet-500/10 text-violet-600",
    title: "Changelog: Custom Report Templates, Dark Mode Upgrades, and More",
    excerpt: "December brought a bumper release: custom report templates, a polished dark mode, CSV bulk import improvements, and 14 bug fixes. Full notes inside.",
    author: "Lena Fischer",
    authorRole: "CPO",
    avatar: "LF",
    avatarColor: "bg-emerald-600",
    date: "December 5, 2025",
    readTime: "3 min read",
    featured: false,
  },
  {
    slug: "#",
    category: "Guides",
    categoryColor: "bg-amber-500/10 text-amber-600",
    title: "From Spreadsheets to Smart Analytics: A Step-by-Step Migration Guide",
    excerpt: "Still living in Google Sheets? We've migrated hundreds of teams. This guide covers every step — from exporting your data to setting up your first live dashboard in Noteora.",
    author: "Priya Mehta",
    authorRole: "Head of Design",
    avatar: "PM",
    avatarColor: "bg-rose-600",
    date: "November 18, 2025",
    readTime: "8 min read",
    featured: false,
  },
];

const CATEGORIES = ["All", "Company", "Product", "Engineering", "Customer Stories", "Guides"];

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <PublicLayout>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Noteora Blog</p>
            <h1 className="text-5xl font-extrabold mb-4">Ideas, stories & insights</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Product updates, engineering deep dives, customer stories, and company news from the Noteora team.</p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {CATEGORIES.map((c, i) => (
              <button key={c} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <div className="rounded-2xl border border-border overflow-hidden mb-10 hover:shadow-md transition-shadow group">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary/10 via-cyan-500/10 to-violet-500/10 min-h-56 flex items-center justify-center">
                <div className="text-8xl font-black text-primary/20 select-none">N</div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${featured.categoryColor}`}>{featured.category}</span>
                  <Badge variant="outline" className="text-xs">Featured</Badge>
                </div>
                <h2 className="text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors leading-snug">{featured.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-full ${featured.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>{featured.avatar}</div>
                    <div>
                      <p className="text-sm font-medium leading-none">{featured.author}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{featured.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />{featured.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article key={post.title} className="rounded-2xl border border-border p-6 hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-4 ${post.categoryColor}`}>{post.category}</span>
                <h3 className="font-extrabold text-base leading-snug mb-3 group-hover:text-primary transition-colors flex-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-full ${post.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>{post.avatar}</div>
                    <div>
                      <p className="text-xs font-medium leading-none">{post.author}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />{post.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-muted/30 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-extrabold mb-2">Stay in the loop</h3>
          <p className="text-muted-foreground mb-6 text-sm">Get product updates, engineering posts, and company news delivered to your inbox — no spam, ever.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="you@company.com" className="flex-1 h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
