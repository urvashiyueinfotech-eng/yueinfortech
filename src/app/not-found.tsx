import { Compass, Home } from "lucide-react";
import CtaButton from "@/components/CtaButton";
import PageHero from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Page Not Found"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "404" },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_32%)]" />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:p-16">
              <div className="space-y-8 text-left">
                <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
                  Error 404
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    We couldn&apos;t find the page you were looking for.
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                    The link may be outdated, the page may have been removed, or the URL may be incorrect.
                    Use one of the options below to get back to the main site experience.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <CtaButton
                    href="/"
                    className="w-full gap-2 sm:w-auto"
                    bgClassName="bg-gradient-to-r from-violet-600 to-indigo-600"
                    textClassName="text-white"
                  >
                    <Home className="h-4 w-4" />
                    <span>Back to Home</span>
                  </CtaButton>
                  <CtaButton
                    href="/services"
                    className="w-full gap-2 sm:w-auto"
                    bgClassName="border border-slate-200 bg-white"
                    textClassName="text-slate-700"
                  >
                    <Compass className="h-4 w-4 text-indigo-600" />
                    <span>Explore Services</span>
                  </CtaButton>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative flex h-full min-h-[260px] w-full max-w-md items-center justify-center overflow-hidden rounded-[28px] border border-white/40 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-8 py-12 text-white shadow-2xl shadow-indigo-900/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_36%)]" />
                  <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
                  <div className="absolute -right-12 bottom-8 h-36 w-36 rounded-full bg-violet-400/20 blur-3xl" />

                  <div className="relative text-center">
                    <div className="text-[5.5rem] font-extrabold leading-none tracking-[-0.08em] text-white/95 sm:text-[7rem]">
                      404
                    </div>
                    <div className="mx-auto mt-5 h-px w-24 bg-white/20" />
                    <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-indigo-100/90 sm:text-base">
                      The requested route does not exist in the current website structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
