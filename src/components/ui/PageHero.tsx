import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  breadcrumbs?: Breadcrumb[];
  backgroundImage: string;
};

export default function PageHero({
  title,
  breadcrumbs = [],
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative isolate h-[300px] lg:h-[380px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="mb-3 text-sm text-slate-300">
                <ol className="flex flex-wrap items-center gap-2">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="hover:text-white transition"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-slate-400">
                          {crumb.label}
                        </span>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <span className="opacity-50">/</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
