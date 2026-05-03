import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";
import { useState } from "react";

const CATEGORIES = ["All", "Company", "Product", "Engineering", "Customer Stories", "Guides"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <PublicLayout>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Noteora Blog</p>
            <h1 className="text-5xl font-extrabold mb-4">Ideas, stories & insights</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Product updates, engineering deep dives, customer stories, and company news from the Noteora team.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`}>
              <div className="rounded-2xl border border-border overflow-hidden mb-10 hover:shadow-md transition-all hover:-translate-y-0.5 group cursor-pointer">
                <div className="grid md:grid-cols-2">
                  <div className="bg-gradient-to-br from-primary/10 via-cyan-500/10 to-violet-500/10 min-h-56 flex items-center justify-center">
                    <div className="text-8xl font-black text-primary/20 select-none">N</div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${featured.categoryColor}`}>
                        {featured.category}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-full ${featured.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                          {featured.avatar}
                        </div>
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
            </Link>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 group cursor-pointer flex flex-col h-full">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-4 ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <h3 className="font-extrabold text-base leading-snug mb-3 group-hover:text-primary transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className={`h-7 w-7 rounded-full ${post.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                          {post.avatar}
                        </div>
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
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No posts in this category yet.</p>
              <button onClick={() => setActiveCategory("All")} className="mt-3 text-sm text-primary hover:underline">
                Show all posts
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-muted/30 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-extrabold mb-2">Stay in the loop</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Get product updates, engineering posts, and company news delivered to your inbox — no spam, ever.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
