import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NavigationHeader } from "../../components/navigation_header";
import { api } from "../../utils/api";

const BlogPostPage: NextPage = () => {
  const { postId } = useRouter().query as {
    postId: string;
  };
  const { data: blog } = api.posts.post.useQuery({ id: parseInt(postId) });
  return (
    <>
      <Head>
        <title>{blog?.title}</title>
      </Head>
      <div>
        <NavigationHeader />
        <div>
          <ReactMarkdown>{blog?.content ?? ""}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
