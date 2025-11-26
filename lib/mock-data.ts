// Mock 博客数据
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

// 模拟服务端数据获取（延迟模拟 API 调用）
export async function getBlogPosts(): Promise<BlogPost[]> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: 1,
      title: "Getting Started with Next.js 16",
      excerpt:
        "Learn how to build modern web applications with Next.js 16, featuring the latest App Router improvements and React Server Components.",
      date: "2024-01-15",
      author: "John Doe",
      readTime: "5 min read",
      category: "Tutorial",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Understanding React Server Components",
      excerpt:
        "Dive deep into React Server Components and discover how they revolutionize the way we build React applications with better performance and SEO.",
      date: "2024-01-20",
      author: "Jane Smith",
      readTime: "8 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Building Scalable Web Applications",
      excerpt:
        "Explore best practices for building scalable web applications that can handle millions of users with optimal performance.",
      date: "2024-01-25",
      author: "Alice Johnson",
      readTime: "6 min read",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Modern CSS Techniques with Tailwind",
      excerpt:
        "Discover advanced CSS techniques and how Tailwind CSS can help you build beautiful, responsive designs faster.",
      date: "2024-02-01",
      author: "Bob Williams",
      readTime: "7 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    },
  ];
}

