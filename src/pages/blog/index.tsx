import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { NavigationHeader } from "../../components/navigation_header";
import { api } from "../../utils/api";

const Blog: NextPage = () => {
  const { data: posts } = api.posts.posts.useQuery({});
  return (
    <Box>
      <NavigationHeader showSignIn={true} />
      <Heading>Blog</Heading>
      {posts?.map((post) => (
        <Box key={post.id}>
          <Link href={"/blog/${post.id}"}>
            <Button>{post.title}</Button>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Blog;
