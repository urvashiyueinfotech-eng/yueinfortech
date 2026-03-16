import PageHero from "@/components/ui/PageHero";

export default function ServicesLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Our Services"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-4xl text-center lg:mb-24">
            <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-indigo-100" />
            <div className="mx-auto mt-6 h-12 w-full max-w-3xl animate-pulse rounded-2xl bg-slate-200" />
            <div className="mx-auto mt-4 h-6 w-full max-w-2xl animate-pulse rounded-xl bg-slate-200" />
            <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
              <div className="h-12 flex-1 animate-pulse rounded-full bg-indigo-200" />
              <div className="h-12 flex-1 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-slate-100"
              >
                <div className="h-[240px] animate-pulse bg-slate-200" />
                <div className="space-y-5 p-8">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-indigo-100" />
                  <div className="h-7 w-3/4 animate-pulse rounded-xl bg-slate-200" />
                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  </div>
                  <div className="h-11 w-36 animate-pulse rounded-full bg-indigo-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

