import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NavigationHeader } from "../components/navigation_header";

const Blog: NextPage = () => {
  return (
    <Box>
      <NavigationHeader showSignIn={true} />
    </Box>
  );
};

export default Blog;
