import Link from "next/link";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Blog
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50">
          Latest Articles
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Explore our latest thoughts, tutorials, and insights about web
          development and Next.js.
        </p>
      </header>

      <BlogList />

      <footer className="mt-8 rounded-2xl bg-zinc-50 px-6 py-4 text-sm text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400">
        <Link
          href="/"
          className="text-blue-600 underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to home
        </Link>
      </footer>
    </section>
  );
}

