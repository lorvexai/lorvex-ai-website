import Link from "next/link";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-secondary/20 bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <Link href="/contact" className="btn-primary min-h-11 flex-1 justify-center text-sm">
          Book Strategy Call
        </Link>
        <Link href="/services" className="btn-outline min-h-11 flex-1 justify-center text-sm">
          Explore Services
        </Link>
      </div>
    </div>
  );
}
