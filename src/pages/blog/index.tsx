import type { NextPage } from "next";
import Link from "next/link";
import { NavigationHeader } from "../../components/navigation_header";
import { api } from "../../utils/api";

const Blog: NextPage = () => {
  const { data: posts } = api.posts.posts.useQuery({});
  return (
    <div>
      <NavigationHeader showSignIn={true} />
      <h1>Blog</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <button>{post.title}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
