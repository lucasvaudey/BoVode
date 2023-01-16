import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { NavigationHeader } from "../components/navigation_header";
import { Box, Button, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>BoVoDé</title>
        <meta name="description" content="BoVoDé Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <NavigationHeader />
        <AuthShowcase />
      </Box>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <Box m={"auto"}>
      <Text>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </Text>
      <Button
        onClick={
          sessionData ? () => void signOut() : () => void signIn("google")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </Box>
  );
};
