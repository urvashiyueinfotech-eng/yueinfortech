const shimmerClass =
  "animate-pulse rounded-full bg-white/10";

function ServiceCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`rounded-[20px] border bg-white px-7 py-8 shadow-[0_4px_24px_rgba(91,79,233,0.08)] ${
        featured
          ? "border-2 border-[#5B4FE9] md:col-span-2 xl:col-span-1"
          : "border-[rgba(91,79,233,0.06)]"
      }`}
    >
      <div className="h-3 w-24 animate-pulse rounded-full bg-[#EEF0FF]" />
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
      <div className="mt-4 rounded-lg border-l-[3px] border-[#5B4FE9] bg-[#EEF0FF] px-3.5 py-3">
        <div className="h-3 w-full animate-pulse rounded-full bg-white" />
        <div className="mt-2 h-3 w-5/6 animate-pulse rounded-full bg-white" />
      </div>
      <div className="mt-5 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B4FE9]" />
            <span className="h-3 flex-1 animate-pulse rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesLoading() {
  return (
    <main className="min-h-screen bg-[#F8F9FF] text-[#1E1B4B]">
      <section className="relative flex min-h-[82vh] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] px-[5%] pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(91,79,233,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[130%] w-[55%] bg-gradient-to-l from-[rgba(91,79,233,0.12)] via-[rgba(91,79,233,0.05)] to-transparent" />

        <div className="relative max-w-[720px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,79,233,0.4)] bg-[rgba(91,79,233,0.2)] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B72EE]" />
            <span className="h-3 w-44 animate-pulse rounded-full bg-[#7B72EE]/40" />
          </div>

          <div className="mt-8 space-y-4">
            <div className="h-12 w-full max-w-[650px] animate-pulse rounded-2xl bg-white/15 sm:h-16" />
            <div className="h-12 w-4/5 max-w-[520px] animate-pulse rounded-2xl bg-white/15 sm:h-16" />
          </div>

          <div className="mt-6 max-w-[580px] rounded-r-lg border-l-[3px] border-[#7B72EE] bg-white/10 px-5 py-4">
            <div className="h-3 w-full animate-pulse rounded-full bg-white/20" />
            <div className="mt-3 h-3 w-11/12 animate-pulse rounded-full bg-white/20" />
            <div className="mt-3 h-3 w-3/4 animate-pulse rounded-full bg-white/20" />
          </div>

          <div className="mt-8 flex flex-wrap gap-10">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="h-8 w-20 animate-pulse rounded-full bg-[#7B72EE]/30" />
                <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-white/15" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className={`${shimmerClass} h-12 w-44 bg-[#5B4FE9]/60`} />
            <div className={`${shimmerClass} h-12 w-36 border border-white/20`} />
          </div>
        </div>
      </section>

      <section className="bg-white px-[5%] py-[90px]">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="max-w-[460px]">
            <div className="h-3 w-24 animate-pulse rounded-full bg-[#5B4FE9]/20" />
            <div className="mt-4 h-10 w-full animate-pulse rounded-2xl bg-slate-200" />
            <div className="mt-3 h-10 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
            <div className="mt-5 space-y-3">
              <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-11/12 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[14px] border border-[rgba(91,79,233,0.08)] bg-white px-5 py-[18px] shadow-[0_4px_24px_rgba(91,79,233,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5B4FE9]" />
                  <span className="h-3 flex-1 animate-pulse rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FF] px-[5%] py-[90px]">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[#5B4FE9]/20" />
        <div className="mt-4 h-10 w-full max-w-[520px] animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-4 h-4 w-full max-w-[560px] animate-pulse rounded-full bg-slate-200" />

        <div className="mt-[52px] grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ServiceCardSkeleton key={index} featured={index === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
