import { NextResponse } from "next/server";

// 博客详情数据
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = blogPosts[Number(id)];

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(post);
}

