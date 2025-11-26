export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 text-base leading-7 text-zinc-800 dark:text-zinc-200">
      <header className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          About
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50">
          What makes Next.js different?
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Next.js is a full-stack React framework focused on developer
          experience and production-grade performance. It combines modern
          rendering strategies, routing, data fetching, and build tooling into a
          single cohesive package.
        </p>
      </header>

      <article className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/40">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Key capabilities
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-200">
          <li>
            Hybrid rendering with Server Components, Static Site Generation, and
            Dynamic Rendering powered by the App Router.
          </li>
          <li>
            Built-in data fetching primitives (`fetch`, Server Actions, and
            Route Handlers) that run on the server by default for better
            security and latency.
          </li>
          <li>
            First-class image, font, and script optimization to ship faster,
            more efficient pages with minimal configuration.
          </li>
          <li>
            Turbopack-powered development server for fast refreshes and
            incremental builds, plus zero-config support for TypeScript and ESLint.
          </li>
        </ul>
      </article>

      <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          When to reach for Next.js
        </h2>
        <p>
          If you need routing, rendering control, API endpoints, and build
          optimizations without wiring everything from scratch, Next.js offers a
          batteries-included approach. Teams deploy to any Node.js runtime or to
          edge networks via the{" "}
          <a
            href="https://nextjs.org/docs/app/building-your-application/deploying"
            className="font-medium text-blue-600 underline-offset-2 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            supported deployment platforms
          </a>
          .
        </p>
      </article>

      <footer className="rounded-2xl bg-zinc-50 px-6 py-4 text-sm text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400">
        Built with the Next.js App Router template that ships with Tailwind
        CSS, ESLint, Turbopack, and TypeScript so you can begin shipping ideas
        quickly.
      </footer>
    </section>
  );
}

