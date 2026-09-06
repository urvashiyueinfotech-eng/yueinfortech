"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavServiceItem } from "@/lib/services.service";

// --- Configuration ---
const navItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "About", href: "/about-us", hasDropdown: false },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us", hasDropdown: false },
];

// Simple in-module cache to avoid repeated Firestore calls for nav services
let servicesCache: NavServiceItem[] | null = null;
let servicesPromise: Promise<NavServiceItem[]> | null = null;

async function fetchServicesOnce(): Promise<NavServiceItem[]> {
  if (servicesCache) return servicesCache;
  if (servicesPromise) return servicesPromise;

  servicesPromise = (async () => {
    const response = await fetch("/api/services/nav", { cache: "force-cache" });
    if (!response.ok) {
      throw new Error("Failed to load nav services");
    }

    const rows = (await response.json()) as NavServiceItem[];

    const fetched = rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      href: row.href ?? `/services/${row.slug}`,
      children: Array.isArray(row.children) ? row.children : [],
    }));

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

const MENU_OPEN_DELAY = 250;
const MENU_CLOSE_DELAY = 220;
const SUBMENU_SWITCH_DELAY = 140;

const DesktopNav = ({ isScrolled, services }: { isScrolled: boolean; services: NavServiceItem[] }) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstServiceLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);

  const pathActiveService =
    services.find((service) => pathname === service.href || pathname.startsWith(`${service.href}/`)) ??
    services.find((service) =>
      service.children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`))
    ) ??
    null;

  const activeService =
    services.find((service) => service.slug === activeServiceSlug) ?? pathActiveService ?? services[0] ?? null;

  const clearTimer = (timerRef: { current: ReturnType<typeof setTimeout> | null }) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const openServicesMenu = (immediate = false) => {
    clearTimer(closeTimerRef);
    clearTimer(openTimerRef);

    const open = () => {
      setServicesMenuOpen(true);
      setActiveServiceSlug((current) => current ?? pathActiveService?.slug ?? services[0]?.slug ?? null);
    };

    if (immediate) {
      open();
      return;
    }

    openTimerRef.current = setTimeout(open, MENU_OPEN_DELAY);
  };

  const closeServicesMenu = () => {
    clearTimer(openTimerRef);
    clearTimer(closeTimerRef);
    closeTimerRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
      setActiveServiceSlug(pathActiveService?.slug ?? null);
    }, MENU_CLOSE_DELAY);
  };

  const setActiveServiceWithIntent = (slug: string, immediate = false) => {
    clearTimer(switchTimerRef);

    if (immediate) {
      setActiveServiceSlug(slug);
      return;
    }

    switchTimerRef.current = setTimeout(() => {
      setActiveServiceSlug(slug);
    }, SUBMENU_SWITCH_DELAY);
  };

  useEffect(() => {
    return () => {
      clearTimer(openTimerRef);
      clearTimer(closeTimerRef);
      clearTimer(switchTimerRef);
    };
  }, []);

  return (
    <nav className="hidden xl:flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        if (item.label === "Services") {
          return (
            <div
              key={item.label}
              ref={menuRef}
              className="relative h-full flex items-center"
              onMouseEnter={() => openServicesMenu()}
              onMouseLeave={closeServicesMenu}
              onFocus={() => openServicesMenu(true)}
              onBlur={(event) => {
                if (!menuRef.current?.contains(event.relatedTarget as Node | null)) {
                  closeServicesMenu();
                }
              }}
            >
              <Link
                href={item.href}
                aria-haspopup="true"
                aria-expanded={servicesMenuOpen}
                aria-controls="services-dropdown"
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    openServicesMenu(true);
                    requestAnimationFrame(() => firstServiceLinkRef.current?.focus());
                  }

                  if (event.key === "Escape") {
                    setServicesMenuOpen(false);
                  }
                }}
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
                <ChevronDown className={cn("h-4 w-4 transition-transform", servicesMenuOpen && "rotate-180")} />
              </Link>

              <AnimatePresence>
                {servicesMenuOpen && services.length > 0 ? (
                  <motion.div
                    id="services-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-30 w-[760px] -translate-x-1/2 pt-4"
                    onMouseEnter={() => openServicesMenu(true)}
                  >
                    <div className="grid grid-cols-[330px_1fr] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.03]">
                      <div className="max-h-[min(620px,calc(100vh-140px))] overflow-y-auto border-r border-slate-100 p-3">
                        <div className="grid gap-1">
                          {services.map((svc, index) => {
                            const isActiveService = svc.slug === activeService?.slug;
                            const isCurrentService =
                              pathname === svc.href ||
                              pathname.startsWith(`${svc.href}/`) ||
                              svc.children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`));

                            return (
                              <Link
                                key={svc.slug}
                                ref={index === 0 ? firstServiceLinkRef : undefined}
                                href={svc.href}
                                onMouseEnter={() => setActiveServiceWithIntent(svc.slug)}
                                onFocus={() => setActiveServiceWithIntent(svc.slug, true)}
                                onKeyDown={(event) => {
                                  if (event.key === "ArrowRight" && svc.children.length > 0) {
                                    event.preventDefault();
                                    setActiveServiceWithIntent(svc.slug, true);
                                    const childLink = menuRef.current?.querySelector<HTMLAnchorElement>(
                                      `[data-child-group="${svc.slug}"] a`
                                    );
                                    childLink?.focus();
                                  }

                                  if (event.key === "Escape") {
                                    setServicesMenuOpen(false);
                                  }
                                }}
                                className={cn(
                                  "flex min-h-[58px] items-center justify-between gap-4 rounded-[18px] px-4 py-3 text-[15px] font-semibold text-slate-900 outline-none transition",
                                  isActiveService
                                    ? "bg-slate-100 shadow-[inset_0_0_0_1px_rgba(226,232,240,0.9)]"
                                    : "hover:bg-slate-50 focus-visible:bg-slate-50",
                                  isCurrentService && "text-indigo-700"
                                )}
                              >
                                <span className="leading-snug">{svc.title}</span>
                                {svc.children.length > 0 ? (
                                  <ChevronDown
                                    className={cn(
                                      "h-4 w-4 -rotate-90 text-slate-400 transition",
                                      isActiveService && "text-indigo-600"
                                    )}
                                  />
                                ) : null}
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="min-h-[270px] bg-gradient-to-br from-slate-50 to-white p-4">
                        {activeService ? (
                          <div className="flex h-full flex-col">
                            <div className="mb-4 rounded-[20px] border border-slate-200 bg-white px-4 py-4">
                              <p className="text-[11px] font-bold uppercase text-indigo-600">
                                Service Area
                              </p>
                              <Link
                                href={activeService.href}
                                className="mt-1 inline-flex items-center gap-2 text-[18px] font-extrabold text-slate-950 transition hover:text-indigo-600"
                              >
                                {activeService.title}
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </div>

                            {activeService.children.length > 0 ? (
                              <div className="grid gap-2" data-child-group={activeService.slug}>
                                {activeService.children.map((child) => (
                                  <Link
                                    key={child.slug}
                                    href={child.href}
                                    onKeyDown={(event) => {
                                      if (event.key === "Escape") {
                                        setServicesMenuOpen(false);
                                      }
                                    }}
                                    className={cn(
                                      "group flex min-h-[54px] items-center justify-between rounded-[16px] border border-transparent bg-white px-4 py-3 text-[15px] font-semibold text-slate-800 shadow-sm outline-none transition hover:border-indigo-100 hover:bg-indigo-50/60 hover:text-indigo-700 focus-visible:border-indigo-200 focus-visible:bg-indigo-50/70 focus-visible:text-indigo-700",
                                      (pathname === child.href || pathname.startsWith(`${child.href}/`)) &&
                                        "border-indigo-100 bg-indigo-50 text-indigo-700"
                                    )}
                                  >
                                    <span>{child.title}</span>
                                    <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-indigo-500" />
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="rounded-[18px] border border-dashed border-slate-200 bg-white/70 px-4 py-5">
                                <Link
                                  href={activeService.href}
                                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                                >
                                  View service overview
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
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
  services: NavServiceItem[];
}) => {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathActiveService =
    services.find((service) => pathname === service.href || pathname.startsWith(`${service.href}/`)) ??
    services.find((service) =>
      service.children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`))
    ) ??
    null;
  const [servicesOpen, setServicesOpen] = useState(Boolean(pathActiveService));
  const [expandedServiceSlug, setExpandedServiceSlug] = useState<string | null>(pathActiveService?.slug ?? null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleServices = () => {
    const nextServicesOpen = !servicesOpen;
    setServicesOpen(nextServicesOpen);

    if (nextServicesOpen && !expandedServiceSlug) {
      setExpandedServiceSlug(pathActiveService?.slug ?? services[0]?.slug ?? null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm xl:hidden"
          onClick={closeMenu}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col overflow-hidden bg-slate-950 shadow-2xl"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
              <Logo tone="light" />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h2 id="mobile-menu-title" className="sr-only">
              Navigation menu
            </h2>
            <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-4 py-5 sm:px-5">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                  if (item.label === "Services") {
                    return (
                      <div key={item.label} className="space-y-2">
                        <button
                          type="button"
                          onClick={toggleServices}
                          aria-expanded={servicesOpen}
                          aria-controls="mobile-services-list"
                          className={cn(
                            "flex min-h-[54px] w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                            isActive || servicesOpen
                              ? "bg-indigo-600 text-white"
                              : "bg-white/[0.04] text-slate-100 hover:bg-white/[0.08]"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.div
                              id="mobile-services-list"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                                {services.map((svc) => {
                                  const servicePanelId = `mobile-service-${svc.slug}`;
                                  const isExpanded = expandedServiceSlug === svc.slug;
                                  const isCurrentService =
                                    pathname === svc.href ||
                                    pathname.startsWith(`${svc.href}/`) ||
                                    svc.children.some(
                                      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
                                    );

                                  if (svc.children.length === 0) {
                                    return (
                                      <Link
                                        key={svc.slug}
                                        href={svc.href}
                                        onClick={closeMenu}
                                        className={cn(
                                          "flex min-h-[50px] items-center rounded-xl px-3 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                                          isCurrentService && "bg-white/10 text-white"
                                        )}
                                      >
                                        {svc.title}
                                      </Link>
                                    );
                                  }

                                  return (
                                    <div
                                      key={svc.slug}
                                      className={cn(
                                        "overflow-hidden rounded-xl border border-white/10 bg-slate-900/70",
                                        isCurrentService && "border-indigo-400/40 bg-indigo-500/10"
                                      )}
                                    >
                                      <div className="flex min-h-[54px] items-stretch">
                                        <Link
                                          href={svc.href}
                                          onClick={closeMenu}
                                          className="flex flex-1 items-center px-3 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-indigo-400"
                                        >
                                          {svc.title}
                                        </Link>
                                        <button
                                          type="button"
                                          onClick={() => setExpandedServiceSlug(isExpanded ? null : svc.slug)}
                                          aria-expanded={isExpanded}
                                          aria-controls={servicePanelId}
                                          className="flex w-12 shrink-0 items-center justify-center border-l border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-indigo-400"
                                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${svc.title} sub-services`}
                                        >
                                          <ChevronDown
                                            className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
                                          />
                                        </button>
                                      </div>
                                      <AnimatePresence initial={false}>
                                        {isExpanded && (
                                          <motion.div
                                            id={servicePanelId}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.18, ease: "easeOut" }}
                                            className="overflow-hidden border-t border-white/10"
                                          >
                                            <div className="grid gap-1 p-2">
                                              {svc.children.map((child) => (
                                                <Link
                                                  key={child.slug}
                                                  href={child.href}
                                                  onClick={closeMenu}
                                                  className={cn(
                                                    "flex min-h-[46px] items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                                                    (pathname === child.href || pathname.startsWith(`${child.href}/`)) &&
                                                      "bg-white/10 text-white"
                                                  )}
                                                >
                                                  <span>{child.title}</span>
                                                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                                                </Link>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex min-h-[54px] w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                        isActive ? "bg-indigo-600 text-white" : "bg-white/[0.04] text-slate-100 hover:bg-white/[0.08]"
                      )}
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                  );
                })}
              </nav>
              <div className="sticky bottom-0 mt-6 space-y-3 border-t border-white/10 bg-slate-950 pt-4">
                <Link
                  href="/contact-us"
                  onClick={closeMenu}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Book Free Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
                  <PhoneCall className="h-4 w-4 text-indigo-400" />
                  <div>
                    <a href="tel:8859366292" className="font-semibold text-white">
                      +91 8859366292
                    </a>
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
  servicesFromServer?: NavServiceItem[];
};

const Navbar = ({ servicesFromServer = [] }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [services, setServices] = useState<NavServiceItem[]>(servicesFromServer);

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
