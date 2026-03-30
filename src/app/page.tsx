import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="space-y-6 pb-8 pt-16 md:pb-12 md:pt-24 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 mx-auto">
          <Link
            href="https://twitter.com/ayato_studio"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow our progress on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Next-Gen Market Intelligence <br className="hidden sm:inline" /> 
            Powered by Autonomous AI
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Ayato Studio Reporter crawls, analyzes, and synthesizes global tech news 
            into actionable deep-dive reports. Hardened for speed and reliability.
          </p>
          <div className="space-x-4">
            <Link
              href="/reports"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              )}
            >
              Check Reports
            </Link>
            <Link
              href="https://github.com/ayato-studio"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container space-y-6 bg-slate-50 dark:bg-transparent py-8 md:py-12 lg:py-24 px-4 mx-auto"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an autonomous RAG-pipeline that delivers high-quality 
            tech analysis with zero human intervention.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.logo className="h-12 w-12 fill-current" />
              <div className="space-y-2">
                <h3 className="font-bold">Autonomous Crawling</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously monitors CNBC, NVIDIA Blog, and Qiita for new signals.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.post className="h-12 w-12 fill-current" />
              <div className="space-y-2">
                <h3 className="font-bold">AI Synthesis</h3>
                <p className="text-sm text-muted-foreground">
                  Uses Gemini Pro to synthesize raw news into structured intelligence.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.settings className="h-12 w-12 fill-current" />
              <div className="space-y-2">
                <h3 className="font-bold">Hardened CI/CD</h3>
                <p className="text-sm text-muted-foreground">
                  Static-build architecture ensure $0 hosting and DoS protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="open-source" className="container py-8 md:py-12 lg:py-24 mx-auto px-4">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Ayato Studio is open source and built on top of Taxonomy template. <br />{" "}
            Checkout the source code on{" "}
            <Link
              href="https://github.com/ayato-studio"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
