export default function MockupFrame({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-secondary/20 shadow-2xl" style={{ background: "rgba(10,20,40,0.95)" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-secondary/10 px-4 py-3" style={{ background: "rgba(15,30,55,0.9)" }}>
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex-1 rounded-md border border-secondary/15 bg-background/60 px-3 py-1 text-center">
          <span className="font-mono text-[10px] text-secondary/40">{title}</span>
        </div>
      </div>
      {/* Content */}
      <div className="p-0">{children}</div>
    </div>
  );
}
