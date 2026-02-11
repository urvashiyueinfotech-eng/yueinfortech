"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";
// 1. Import query and orderBy
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MainService } from "@/data/main-services.data";

// --- Configuration ---
const navItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "About", href: "/about-us", hasDropdown: false },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us", hasDropdown: false },
];

// Simple in-module cache to avoid repeated Firestore calls for nav services
let servicesCache: MainService[] | null = null;
let servicesPromise: Promise<MainService[]> | null = null;

async function fetchServicesOnce(): Promise<MainService[]> {
  if (servicesCache) return servicesCache;
  if (servicesPromise) return servicesPromise;

  servicesPromise = (async () => {
    // 2. Create the ordered query
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, orderBy("displayOrder", "asc"));
    
    // 3. Fetch using the ordered query
    const snap = await getDocs(q);
    
    const fetched = snap.docs.map((d) => {
      const data = d.data() as any;
      return {
        id: data.slug ?? d.id,
        eyebrow: (data.hero as any)?.eyebrow ?? "",
        title: data.hero?.heading ?? data.title ?? d.id,
        description: data.hero?.description ?? "",
        image: data.hero?.backgroundImage ?? data.image ?? "",
        services: [],
        primaryHref: `/services/${data.slug ?? d.id}`,
        slug: data.slug ?? d.id,
      } as MainService;
    });
    servicesCache = fetched;
    servicesPromise = null;
    return fetched;
  })().catch((err) => {
    servicesPromise = null;
    console.warn("Failed to load services for navbar dropdown", err);
    return [];
  });

  return servicesPromise;
}

// --- Sub-components ---
const Logo = ({ tone }: { tone: "light" | "dark" }) => (
  <Link href="/" className="flex shrink-0 items-center" aria-label="Back to homepage">
    <Image
      src={tone === "dark" ? "/Yueinfotech.com-logo.png" : "/Yueinfotech.com-logo-white.png"}
      alt="Yue Infotech"
      width={320}
      height={64}
      priority
      className="h-12 w-auto max-w-none sm:h-14 md:h-16"
    />
  </Link>
);

const DesktopNav = ({ isScrolled, services }: { isScrolled: boolean; services: MainService[] }) => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        if (item.label === "Services") {
          return (
            <div key={item.label} className="group relative h-full flex items-center">
              <Link
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isScrolled
                    ? isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    : isActive
                      ? "text-white bg-white/10"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span className="relative z-[1]">{item.label}</span>
                <ChevronDown className="h-4 w-4" />
              </Link>
              
              <div className="pointer-events-none absolute left-1/2 top-full z-30 w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/95 shadow-xl backdrop-blur-sm">
                  <div className="grid gap-1 p-3">
                    {/* Render services sorted by order */}
                    {services.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="flex flex-col rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-900 transition hover:bg-gray-50"
                      >
                        <span>{svc.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              isScrolled
                ? isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                : isActive
                  ? "text-white bg-white/10"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
            )}
          >
            <span className="relative z-[1]">{item.label}</span>
            {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
          </Link>
        );
      })}
    </nav>
  );
};

const MobileMenu = ({
  isOpen,
  setIsOpen,
  services,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  services: MainService[];
}) => {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-slate-900/95 shadow-2xl backdrop-blur-xl"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <nav className="space-y-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  if (item.label === "Services") {
                    return (
                      <div key={item.label} className="space-y-2">
                        <button
                          type="button"
                          onClick={() => setServicesOpen((prev) => !prev)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium transition-colors",
                            isActive ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {item.label}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                        </button>
                        {servicesOpen && (
                          <div className="grid gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
                            {services.map((svc) => (
                              <Link
                                key={svc.slug}
                                href={`/services/${svc.slug}`}
                                onClick={() => {
                                  setIsOpen(false);
                                  setServicesOpen(false);
                                }}
                                className="rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                              >
                                {svc.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium transition-colors",
                        isActive ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                  );
                })}
              </nav>
              <div className="space-y-4 pt-6">
                <Link href="/contact-us" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]">
                  Book Free Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400">
                  <PhoneCall className="h-4 w-4 text-indigo-400" />
                  <div>
                    <a href="tel:8859366292" className="font-semibold text-white">+91 8859366292</a>
                    <p className="text-xs">Talk with a strategist</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Component ---
type NavbarProps = {
  servicesFromServer?: MainService[];
};

const Navbar = ({ servicesFromServer = [] }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [services, setServices] = useState<MainService[]>(servicesFromServer);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!servicesFromServer.length) {
      fetchServicesOnce().then((fetched) => {
        if (mounted && fetched.length) setServices(fetched);
      });
    }
    return () => {
      mounted = false;
    };
  }, [servicesFromServer]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 transition-all duration-300 ease-in-out",
          isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4",
          isOpen ? "z-30" : "z-50"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("relative transition-all duration-300 ease-in-out")}>
            <div className="relative flex items-center justify-between gap-4">
              <div className={cn("transition-opacity", isOpen && "opacity-0")}>
                <Logo tone={isScrolled ? "dark" : "light"} />
              </div>
              
              <DesktopNav isScrolled={isScrolled} services={services} />
              
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-3 rounded-full border px-4 py-2 text-left text-xs backdrop-blur-lg xl:flex"
                  style={isScrolled ? { borderColor: 'rgb(229 231 235)'} : { borderColor: 'rgba(255, 255, 255, 0.1)'}}
                >
                  <PhoneCall className={cn("h-4 w-4", isScrolled ? "text-slate-900" : "text-indigo-400")} />
                  <div>
                    <a href="tel:8859366292" className={cn("font-semibold", isScrolled ? "text-slate-900" : "text-white")}>+91 8859366292</a>
                    <p className={cn("text-[11px]", isScrolled ? "text-slate-600" : "text-slate-300")}>Talk with a strategist</p>
                  </div>
                </div>
                <Link href="/contact-us" className="hidden items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105 hover:bg-indigo-700 xl:inline-flex">
                  Book Free Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                
                <AnimatePresence>
                  {!isOpen && (
                     <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                      <button
                        onClick={() => setIsOpen(true)}
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-full border transition-colors xl:hidden",
                          isScrolled
                            ? "border-slate-200 text-slate-700 hover:text-indigo-600"
                            : "border-white/20 text-white hover:text-white hover:bg-white/10"
                        )}
                        aria-label="Open navigation menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        >
                        <Menu className={cn("h-5 w-5")} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} services={services} />
    </>
  );
};

export default Navbar;