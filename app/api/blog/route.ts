import { NextResponse } from "next/server";

// 博客列表数据（用于获取相关文章）
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 16",
    date: "2024-01-15",
    author: "John Doe",
    readTime: "5 min read",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    date: "2024-01-20",
    author: "Jane Smith",
    readTime: "8 min read",
    category: "Technology",
  },
];

export async function GET() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json(blogPosts);
}

