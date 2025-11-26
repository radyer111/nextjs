import Link from "next/link";
import { notFound } from "next/navigation";

// 博客数据
const blogPosts: Record<
  number,
  {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    readTime: string;
    category: string;
    tags?: string[];
  }
> = {
  1: {
    id: 1,
    title: "Getting Started with Next.js 16",
    content: `Next.js 16 brings exciting new features and improvements to the React ecosystem. In this comprehensive guide, we'll explore the key enhancements and how they can benefit your development workflow.

## What's New in Next.js 16

The latest version introduces significant improvements to the App Router, making it more powerful and easier to use. React Server Components are now the default, providing better performance and SEO out of the box.

The App Router has been completely redesigned to support the latest React features, including Server Components, Streaming, and Suspense. This means you can now build applications that are faster, more efficient, and provide a better user experience.

## Key Features

### Enhanced App Router

The App Router has been refined with better TypeScript support and improved developer experience. You can now use async components, server actions, and route handlers with full type safety.

### Improved Performance

With Turbopack as the default bundler, you'll experience faster builds and hot reloads. The new bundler is written in Rust and provides significant performance improvements over Webpack.

### Better Developer Tools

Enhanced error messages and debugging capabilities make development smoother. You'll see clearer error messages, better stack traces, and improved TypeScript integration.

## Getting Started

To start a new Next.js 16 project, simply run:

\`\`\`bash
npx create-next-app@latest
\`\`\`

This will set up a new project with all the latest features and best practices configured. The CLI will guide you through the setup process, allowing you to choose your preferred options.

## Best Practices

When working with Next.js 16, keep these tips in mind:

1. **Use Server Components by default** - They provide better performance and SEO
2. **Leverage the App Router** - It's the recommended way to build Next.js applications
3. **Take advantage of Streaming** - Improve perceived performance with React Suspense
4. **Use TypeScript** - Full type safety is now easier than ever

## Conclusion

Next.js 16 represents a significant step forward in React framework development. Whether you're building a simple blog or a complex web application, Next.js 16 provides the tools you need to succeed. The combination of Server Components, improved performance, and better developer experience makes it an excellent choice for your next project.`,
    date: "2024-01-15",
    author: "John Doe",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Next.js", "React", "Web Development", "Tutorial"],
  },
  2: {
    id: 2,
    title: "Understanding React Server Components",
    content: `React Server Components (RSC) represent a paradigm shift in how we think about React applications. This article explores what RSC means for developers and how to leverage them effectively.

## What are Server Components?

Server Components allow you to build UI that renders on the server, reducing the amount of JavaScript sent to the client. This results in faster page loads and better performance.

Unlike traditional React components that run in the browser, Server Components execute on the server during the render phase. This means they can directly access databases, file systems, and other server-side resources without exposing sensitive information to the client.

## Benefits of Server Components

### Reduced Bundle Size

Less JavaScript means faster initial page loads. Since Server Components don't ship their code to the client, your bundle size is significantly reduced.

### Direct Database Access

Query databases directly from components without needing API routes. This simplifies your data fetching logic and reduces the number of round trips between client and server.

### Better Security

Keep sensitive logic and credentials on the server. Server Components never expose their implementation details to the client, making them ideal for handling authentication, authorization, and data access.

### Improved SEO

Content is rendered on the server, making it immediately available to search engines. This is crucial for content-heavy applications and improves your search engine rankings.

## How They Work

Server Components run only on the server and never send their code to the client. They can fetch data directly and pass it to Client Components, which handle interactivity.

The key distinction is:
- **Server Components**: Run on the server, no JavaScript sent to client
- **Client Components**: Marked with "use client", run in the browser

## Best Practices

1. **Use Server Components by default** - Start with Server Components and only add "use client" when you need interactivity
2. **Add "use client" only when needed** - Client Components should be used sparingly for interactive features
3. **Keep Server Components near the top** - Structure your component tree with Server Components at the top
4. **Pass serializable props** - Only pass serializable data between Server and Client Components

## Real-World Example

Here's a simple example of how Server and Client Components work together:

\`\`\`tsx
// Server Component (default)
async function BlogPost({ id }: { id: string }) {
  const post = await fetchPost(id);
  
  return (
    <div>
      <h1>{post.title}</h1>
      <LikeButton postId={id} />
    </div>
  );
}

// Client Component
'use client';
function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  // Interactive logic here
}
\`\`\`

## Conclusion

React Server Components are a powerful addition to the React ecosystem. By understanding when and how to use them, you can build faster, more efficient applications. The combination of server-side rendering and client-side interactivity provides the best of both worlds.`,
    date: "2024-01-20",
    author: "Jane Smith",
    readTime: "8 min read",
    category: "Technology",
    tags: ["React", "Server Components", "Performance", "Architecture"],
  },
};

// 获取相关文章
function getRelatedPosts(currentId: number) {
  const allPosts = Object.values(blogPosts);
  return allPosts.filter((post) => post.id !== currentId);
}

// 渲染内容组件
function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = "";

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={elements.length} className="mb-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  }

  function flushCodeBlock() {
    if (codeBlockContent.length > 0) {
      const code = codeBlockContent.join("\n");
      elements.push(
        <div key={elements.length} className="my-6 overflow-hidden rounded-lg">
          <div className="bg-zinc-900 px-4 py-2 text-xs text-zinc-400">
            {codeBlockLanguage || "code"}
          </div>
          <pre className="overflow-x-auto bg-zinc-950 p-4 text-sm text-zinc-100">
            <code>{code}</code>
          </pre>
        </div>
      );
      codeBlockContent = [];
      codeBlockLanguage = "";
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 处理代码块
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        inCodeBlock = true;
        codeBlockLanguage = line.replace("```", "").trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // 处理标题
    if (line.startsWith("## ")) {
      flushParagraph();
      const title = line.replace("## ", "").trim();
      elements.push(
        <h2
          key={elements.length}
          className="mb-4 mt-12 text-2xl font-semibold text-zinc-900 dark:text-white first:mt-0"
        >
          {title}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      const title = line.replace("### ", "").trim();
      elements.push(
        <h3
          key={elements.length}
          className="mb-3 mt-8 text-xl font-semibold text-zinc-900 dark:text-white"
        >
          {title}
        </h3>
      );
      continue;
    }

    // 处理列表项
    if (line.trim().startsWith("- ") || /^\d+\.\s/.test(line.trim())) {
      flushParagraph();
      const listItems: string[] = [];
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith("- ") || /^\d+\.\s/.test(lines[j].trim()))) {
        const item = lines[j].trim().replace(/^[-•]\s+/, "").replace(/^\d+\.\s+/, "");
        listItems.push(item);
        j++;
      }
      i = j - 1;

      elements.push(
        <ul key={elements.length} className="my-6 list-disc space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
          {listItems.map((item, idx) => {
            // 处理粗体文本
            const parts = item.split(/(\*\*.*?\*\*)/g);
            return (
              <li key={idx} className="leading-7">
                {parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={pIdx} className="font-semibold text-zinc-900 dark:text-white">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return <span key={pIdx}>{part}</span>;
                })}
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // 处理普通段落
    if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line.trim());
    }
  }

  flushParagraph();
  flushCodeBlock();

  return <div className="prose prose-zinc max-w-none dark:prose-invert">{elements}</div>;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts[Number(id)];

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <article className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
        {/* 返回按钮 */}
        <Link
          href="/blog"
          className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 underline-offset-2 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <span>←</span>
          <span>Back to blog</span>
        </Link>

        {/* 文章头部 */}
        <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {post.author}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Author</span>
              </div>
            </div>
          </div>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-700">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
          <ContentRenderer content={post.content} />
        </div>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <section className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Related Articles
            </h2>
            <div className="flex flex-col gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-blue-600 dark:hover:bg-blue-900/20"
                >
                  <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                      {relatedPost.category}
                    </span>
                    <span>{relatedPost.date}</span>
                    <span>•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 底部导航 */}
        <footer className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 underline-offset-2 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>←</span>
            <span>Back to blog</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-600 underline-offset-2 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Home
          </Link>
        </footer>
      </article>
    </div>
  );
}
