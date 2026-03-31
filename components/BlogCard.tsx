import Link from "next/link";

export default function BlogCard({
  slug,
  title,
  excerpt
}: {
  slug: string;
  title: string;
  excerpt: string;
}) {
  return (
    <article className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-secondary/80">{excerpt}</p>
      <Link href={`/blog/${slug}`} className="mt-4 inline-block text-primary">
        Read article {"->"}
      </Link>
    </article>
  );
}
