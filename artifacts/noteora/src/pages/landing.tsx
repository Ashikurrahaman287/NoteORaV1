import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, Lock, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2 text-primary">
          <BarChart3 className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight text-foreground">Noteora</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log in</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Data Intelligence for the Modern Enterprise
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Noteora transforms raw data into precision insights. A serious cockpit for founders, marketers, and analysts who need speed and clarity.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base">
                Start Analyzing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              View Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-secondary/30 px-6 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">A Precision Cockpit</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every element earns its place. Dense with information, yet elegant and accessible.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Instantly process large datasets and render complex visualizations without breaking a sweat." },
              { icon: Database, title: "Any Data Source", desc: "Connect APIs, upload CSVs, or enter data manually. We normalize it instantly." },
              { icon: Lock, title: "Enterprise Grade", desc: "Built with security and privacy in mind. Your data remains yours, always." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                className="bg-card p-6 rounded-xl border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
