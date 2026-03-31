"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/15 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-primary/10">
            <Image
              src="/lorvex_icon.png"
              alt="Lorvex AI"
              width={28}
              height={28}
              priority
            />
          </span>
          <span className="font-space text-lg font-semibold">Lorvex AI</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
                  active ? "text-white" : "text-secondary/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contact" className="btn-outline text-sm">
          Start a Project
        </Link>
      </div>
    </header>
  );
}
