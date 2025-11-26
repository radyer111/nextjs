import { getBlogPosts } from "@/lib/mock-data";
import BlogCard from "./BlogCard";

// 服务端组件 - 博客列表
export default async function BlogList() {
  // 在服务端获取数据
  const blogPosts = await getBlogPosts();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {blogPosts.map((post) => (
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          excerpt={post.excerpt}
          date={post.date}
          author={post.author}
          readTime={post.readTime}
          category={post.category}
          image={post.image}
        />
      ))}
    </div>
  );
}

