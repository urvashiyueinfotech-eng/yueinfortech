"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Configuration ---
const navItems = [
  { label: "Home", href: "/", hasDropdown: true },
  { label: "Pages", href: "/pages", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Blog", href: "/blog", hasDropdown: true },
  { label: "Contact", href: "/contact", hasDropdown: false },
];

// --- Sub-components ---
const Logo = ({ isScrolled }: { isScrolled: boolean }) => (
  <Link href="/" className="flex items-center gap-3" aria-label="Back to homepage">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/30">
      <span className={cn("text-lg font-bold", isScrolled ? "text-gray-900" : "text-primary")}>S</span>
    </div>
    <div className="leading-tight">
      <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">Seo Inux</p>
      <p className="text-lg font-semibold text-foreground">Search Engine Studio</p>
    </div>
  </Link>
);

const DesktopNav = ({ isScrolled }: { isScrolled: boolean }) => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
              isScrolled
                ? isActive
                  ? "text-primary-foreground bg-primary"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-100"
                : isActive
                  ? "text-foreground"
                  : "text-foreground/75 hover:text-foreground"
            )}
          >
            <span className="relative z-[1]">{item.label}</span>
            {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
            {!isScrolled && (
              <span
                className={cn(
                  "absolute inset-0 -z-[1] scale-95 rounded-full bg-white/5 opacity-0 transition-all duration-200",
                  isActive ? "opacity-100" : "group-hover:opacity-100"
                )}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const MobileMenu = ({ isOpen, setIsOpen, isScrolled }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; isScrolled: boolean }) => {
  const pathname = usePathname();
  
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
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-background/95 shadow-2xl backdrop-blur-xl"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <Logo isScrolled={isScrolled} />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-primary"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <nav className="space-y-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium transition-colors",
                        isActive ? "bg-white/10 text-primary" : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                  );
                })}
              </nav>
              <div className="space-y-4 pt-6">
                <Link href="/contact" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-orange-400 px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-[1.02]">
                  Book Free Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-muted-foreground">
                  <PhoneCall className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">+1 (803) 555-1991</p>
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
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-6",
          isOpen ? "z-30" : "z-50"
        )}
      >
        <div className="container">
          <div
            className={cn(
              "relative transition-all duration-300 ease-in-out",
              !isScrolled && !isOpen && "rounded-full border border-white/10 bg-background/70 px-4 py-3 shadow-card backdrop-blur-2xl xl:px-6"
            )}
          >
            <div className="relative flex items-center justify-center gap-4 xl:justify-between">
              <div className={cn("transition-opacity", isOpen && "opacity-0")}>
                <Logo isScrolled={isScrolled} />
              </div>
              
              <DesktopNav isScrolled={isScrolled} />
              
              <div className="absolute right-0 flex items-center gap-2 xl:static">
                <div className="hidden items-center gap-3 rounded-full border border-white/10 px-5 py-2 text-left text-xs text-muted-foreground backdrop-blur-lg xl:flex">
                  <PhoneCall className={cn("h-4 w-4", isScrolled ? "text-gray-900" : "text-primary")} />
                  <div>
                    <p className={cn("font-semibold", isScrolled ? "text-gray-900" : "text-foreground")}>+1 (803) 555-1991</p>
                    <p className={cn("text-[11px]", isScrolled ? "text-gray-600" : "text-muted-foreground")}>Talk with a strategist</p>
                  </div>
                </div>
                <Link href="/contact" className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary to-orange-400 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-105 hover:shadow-primary/40 xl:inline-flex">
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
                            ? "border-gray-200 text-gray-700 hover:text-primary"
                            : "border-white/10 text-foreground hover:text-primary"
                        )}
                        aria-label="Open navigation menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        >
                        <Menu className={cn("h-5 w-5", isScrolled && "text-primary")} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} isScrolled={isScrolled} />
    </>
  );
};

export default Navbar;
