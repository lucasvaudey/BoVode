import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { EditComponent } from "../../components/edit_component";
import { NavigationHeader } from "../../components/navigation_header";

const AddBlogPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ajouter un post</title>
      </Head>
      <Box>
        <NavigationHeader showSignIn={true} />
        <Heading>Add Blog Post</Heading>
        <EditComponent edit={false} />
      </Box>
    </>
  );
};

export default AddBlogPage;
