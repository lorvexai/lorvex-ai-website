import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-secondary/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-space text-lg text-white">Lorvex AI</p>
          <p className="text-sm text-secondary/70">Lorvex AI Technologies Ltd</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-secondary/70">
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/capabilities" className="hover:text-white">
            Capabilities
          </Link>
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <Link href="/research" className="hover:text-white">
            Research
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
        <p className="text-xs text-secondary/50">
          (c) {new Date().getFullYear()} Lorvex AI Technologies Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
