import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NavigationHeader } from "../../components/navigation_header";

const Blog: NextPage = () => {
  return (
    <Box>
      <NavigationHeader showSignIn={true} />
      <Heading>Blog</Heading>
    </Box>
  );
};

export default Blog;
