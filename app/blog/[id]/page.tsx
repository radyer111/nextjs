"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

// 博客文章类型
interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  tags?: string[];
}

// 相关文章类型
interface RelatedPost {
  id: number;
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

// Fetcher 函数
const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id as string;

  // 使用 SWR 获取博客文章
  const { data: post, error, isLoading } = useSWR<BlogPost>(
    id ? `/api/blog/${id}` : null,
    fetcher
  );

  // 使用 SWR 获取相关文章
  const { data: allPosts } = useSWR<RelatedPost[]>("/api/blog", fetcher);
  const relatedPosts = allPosts?.filter((p) => p.id !== Number(id)) || [];

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Post not found
          </h1>
          <Link
            href="/blog"
            className="text-blue-600 underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

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
