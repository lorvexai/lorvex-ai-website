"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const groups = [
  {
    label: "Industries",
    links: [
      { href: "/industries/finance",    label: "Finance & Banking" },
      { href: "/industries/healthcare", label: "Healthcare (NHS)" },
      { href: "/industries/enterprise", label: "Enterprise" }
    ]
  },
  {
    label: "Solutions",
    links: [
      { href: "/services",      label: "Services" },
      { href: "/products",      label: "Products" },
      { href: "/platform",      label: "Platform" },
      { href: "/capabilities",  label: "Capabilities" }
    ]
  },
  {
    label: "Insights",
    links: [
      { href: "/blog",    label: "Blog" },
      { href: "/models",  label: "Model Garden" },
      { href: "/research", label: "Research" }
    ]
  },
  {
    label: "Company",
    links: [
      { href: "/about",   label: "About" },
      { href: "/contact", label: "Contact" }
    ]
  }
];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const logoSrc = `${basePath}/Logo.png`.replace("//", "/");

export default function Header() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the nav
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/15 bg-background/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image
              src={logoSrc}
              alt="LorvexAI"
              width={220}
              height={54}
              priority
              className="h-11 w-auto md:h-12"
            />
            <span className="hidden text-sm font-medium text-secondary/85 lg:inline">
              LorvexAI Technologies Ltd
            </span>
          </Link>

          <nav ref={navRef} className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={`min-h-11 rounded-full px-4 py-2 text-sm transition ${
                pathname === "/" ? "text-white" : "text-secondary/80 hover:text-white"
              }`}
            >
              Home
            </Link>

            {groups.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <div key={group.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={`min-h-11 rounded-full px-4 py-2 text-sm transition ${
                      isOpen ? "text-white" : "text-secondary/80 hover:text-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {group.label}
                  </button>

                  <div className="absolute left-0 top-full z-50 w-56 pt-2">
                    <div
                      className={`rounded-2xl border border-secondary/20 bg-background/95 p-2 shadow-2xl backdrop-blur transition-all duration-150 ${
                        isOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-2 opacity-0"
                      }`}
                    >
                      {group.links.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenGroup(null)}
                            className={`mb-0.5 block min-h-10 rounded-xl px-3 py-2 text-sm transition last:mb-0 ${
                              active
                                ? "bg-primary/20 text-white"
                                : "text-secondary/80 hover:bg-primary/10 hover:text-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <Link href="/contact#form" className="btn-outline min-h-11 text-sm">
            Book a Call
          </Link>
        </div>

        {/* Mobile scroll nav */}
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "whitespace-nowrap rounded-full border border-primary/45 bg-primary/20 px-3 py-2 text-xs font-semibold text-white"
                : "whitespace-nowrap rounded-full border border-secondary/35 bg-background/30 px-3 py-2 text-xs text-secondary/85"
            }
          >
            Home
          </Link>
          {groups.flatMap((group) =>
            group.links.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  className={
                    active
                      ? "whitespace-nowrap rounded-full border border-primary/45 bg-primary/20 px-3 py-2 text-xs font-semibold text-white"
                      : "whitespace-nowrap rounded-full border border-secondary/35 bg-background/30 px-3 py-2 text-xs text-secondary/85"
                  }
                >
                  {item.label}
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </header>
  );
}
