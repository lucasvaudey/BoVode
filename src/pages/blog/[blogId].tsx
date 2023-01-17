import { Box, Heading } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { mdTheme } from "../../styles/mdTheme";
import { api } from "../../utils/api";

const BlogPostPage: NextPage = () => {
  const { blogId } = useRouter().query as {
    blogId: string;
  };
  const { data: blog } = api.posts.post.useQuery({ id: parseInt(blogId) });
  return (
    <Box>
      <Heading>Blog Post {blogId}</Heading>
      <Heading>{blog?.title}</Heading>
      <ReactMarkdown components={ChakraUIRenderer(mdTheme)}>
        {blog?.content ?? ""}
      </ReactMarkdown>
    </Box>
  );
};

export default BlogPostPage;
