import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NavigationHeader } from "../components/navigation_header";

const About: NextPage = () => {
  return (
    <Box>
      <NavigationHeader />
      <Heading>About</Heading>
    </Box>
  );
};

export default About;
