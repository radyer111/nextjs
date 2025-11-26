import Image from "next/image";
import Link from "next/link";
import BlogList from "@/components/BlogList";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center py-20 px-6">
        {/* Hero Section */}
        <div className="mb-16 flex w-full max-w-3xl flex-col items-center justify-center bg-white shadow-sm dark:bg-black sm:items-start sm:rounded-2xl sm:p-12">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="mt-8 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Welcome to Next.js Blog
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Explore our latest articles about web development, Next.js, and
              modern React patterns.
            </p>
          </div>
        </div>

        {/* Blog Posts Section */}
        <section className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Latest Articles
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                Featured Blog Posts
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 underline-offset-2 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all →
            </Link>
          </div>
          <BlogList />
        </section>
      </main>
    </div>
  );
}
