import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NavigationHeader } from "../components/navigation_header";

const Projects: NextPage = () => {
  return (
    <Box>
      <NavigationHeader />
      <Heading>Projects</Heading>
    </Box>
  );
};

export default Projects;
