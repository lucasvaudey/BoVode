import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const BlogPostPage: NextPage = () => {
  const { blogId } = useRouter().query as {
    blogId: string;
  };
  return <Box>Blog Post {blogId}</Box>;
};

export default BlogPostPage;
