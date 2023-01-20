import { Box } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NavigationHeader } from "../../components/navigation_header";
import { mdTheme } from "../../styles/mdTheme";
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
      <Box>
        <NavigationHeader />
        <ReactMarkdown components={ChakraUIRenderer(mdTheme)}>
          {blog?.content ?? ""}
        </ReactMarkdown>
      </Box>
    </>
  );
};

export default BlogPostPage;
