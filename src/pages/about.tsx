import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { NavigationHeader } from "../components/navigation_header";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>À propos</title>
      </Head>
      <Box>
        <NavigationHeader />
        <Heading>About</Heading>
      </Box>
    </>
  );
};

export default About;
