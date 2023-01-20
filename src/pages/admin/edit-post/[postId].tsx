import type { Post } from ".prisma/client";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Input,
  Textarea,
  CircularProgress,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { EditComponent } from "../../../components/edit_component";
import { NavigationHeader } from "../../../components/navigation_header";
import { mdTheme } from "../../../styles/mdTheme";
import { api } from "../../../utils/api";

const EditPost: NextPage = () => {
  const { postId } = useRouter().query as {
    postId: string;
  };
  const { data: blog, isLoading } = api.posts.post.useQuery({
    id: parseInt(postId),
  });

  return (
    <Box>
      <NavigationHeader />
      <Heading>Edit Post</Heading>
      {isLoading ? (
        <CircularProgress isIndeterminate />
      ) : blog ? (
        <EditComponent postId={parseInt(postId)} post={blog} edit />
      ) : (
        <>Error</>
      )}
    </Box>
  );
};

export default EditPost;
