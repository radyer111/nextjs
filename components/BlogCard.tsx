import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

// 服务端组件 - 博客卡片
export default function BlogCard({
  id,
  title,
  excerpt,
  date,
  author,
  readTime,
  category,
  image,
}: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/60 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/40">
      {/* 图片部分 */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-300">
            {category}
          </span>
        </div>
      </div>

      {/* 内容部分 */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </h2>

        <p className="flex-1 text-zinc-600 dark:text-zinc-300">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>By {author}</span>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-sm font-medium text-blue-600 hover:bg-transparent hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Link href={`/blog/${id}`}>Read more →</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

