import { useRoute, Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { BLOG_POSTS, type ContentBlock } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ArrowRight, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "paragraph":
      return <p key={i} className="text-base leading-[1.85] text-muted-foreground">{block.text}</p>;

    case "heading":
      return <h2 key={i} className="text-2xl font-extrabold mt-10 mb-2 text-foreground">{block.text}</h2>;

    case "subheading":
      return <h3 key={i} className="text-lg font-bold mt-6 mb-1 text-foreground">{block.text}</h3>;

    case "quote":
      return (
        <blockquote key={i} className="my-8 border-l-4 border-primary pl-6">
          <p className="text-lg italic text-foreground leading-relaxed">"{block.text}"</p>
          {block.attribution && (
            <footer className="mt-3 text-sm text-muted-foreground font-medium">— {block.attribution}</footer>
          )}
        </blockquote>
      );

    case "bullets":
      return (
        <ul key={i} className="space-y-2 my-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-base text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div key={i} className="my-8 rounded-2xl bg-primary/5 border border-primary/20 p-6">
          <p className="font-bold text-foreground mb-1">{block.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
        </div>
      );

    case "divider":
      return <hr key={i} className="my-8 border-border" />;

    default:
      return null;
  }
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === params?.slug);

  if (!post) {
    return (
      <PublicLayout>
        <div className="py-40 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Post not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative pt-14 pb-0 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/6 blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto pt-10">
          {/* Back */}
          <Link href="/blog">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              All posts
            </span>
          </Link>

          {/* Category + read time */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.categoryColor}`}>{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">{post.title}</h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>

          {/* Author + share */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-full ${post.avatarColor} flex items-center justify-center text-white font-bold`}>
                {post.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole} · {post.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="h-8 px-3 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center gap-1.5">
                <LinkIcon className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy link"}
              </button>
              <button className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                <Twitter className="h-3.5 w-3.5" />
              </button>
              <button className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                <Linkedin className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover graphic */}
      <div className="bg-gradient-to-br from-primary/8 via-cyan-500/5 to-violet-500/8 border-y border-border h-56 flex items-center justify-center my-0">
        <div className="text-[10rem] font-black text-primary/10 select-none leading-none">N</div>
      </div>

      {/* Article body */}
      <article className="px-6 py-14">
        <div className="max-w-3xl mx-auto space-y-5">
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>
      </article>

      {/* Author bio */}
      <div className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border p-7 flex gap-5 items-start">
            <div className={`h-14 w-14 rounded-2xl ${post.avatarColor} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
              {post.avatar}
            </div>
            <div>
              <p className="font-bold text-base">{post.author}</p>
              <p className="text-xs text-primary font-medium mb-2">{post.authorRole} · Noteora</p>
              <p className="text-sm text-muted-foreground leading-relaxed">A member of the founding team at Noteora, a product of AGT Venture. We raised $10M in 2026 to build the AI analytics layer for modern teams.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-border bg-muted/20 px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold">More from the blog</h2>
              <Link href="/blog">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                  All posts <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <article className="rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full flex flex-col group">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-3 ${p.categoryColor}`}>{p.category}</span>
                    <h3 className="font-extrabold text-sm leading-snug mb-3 group-hover:text-primary transition-colors flex-1">{p.title}</h3>
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                      <div className={`h-6 w-6 rounded-full ${p.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{p.avatar}</div>
                      <span className="text-xs text-muted-foreground">{p.date}</span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />{p.readTime}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="px-6 py-16 text-center border-t border-border">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-extrabold mb-3">Ready to try Noteora?</h3>
          <p className="text-muted-foreground text-sm mb-6">Start for free — no credit card required. Your first dashboard in under 10 minutes.</p>
          <Link href="/sign-up">
            <Button size="lg">
              Get started free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
