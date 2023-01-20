import {
  Text,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Center,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NavigationHeader } from "../../components/navigation_header";
import { mdTheme } from "../../styles/mdTheme";
import { api } from "../../utils/api";

const AddBlogPage: NextPage = () => {
  const [title, setValue] = useState("");
  const [area, setArea] = useState("");
  const addblog = api.posts.createPost.useMutation();
  const handleChange = (value: string) => setValue(value);
  const handleArea = (value: string) => setArea(value);
  function publishPost(): void {
    addblog.mutate({ title: title, content: area });
    setValue("");
    setArea("");
  }

  return (
    <>
      <Head>
        <title>Ajouter un post</title>
      </Head>
      <Box>
        <NavigationHeader showSignIn={true} />
        <Heading>Add Blog Post</Heading>
        <Text>Titre : {title}</Text>
        <Input
          placeholder="Titre du blog"
          value={title}
          onChange={(event) => handleChange(event.target.value)}
        />
        <Text>Contenu au format .MD : {area}</Text>
        <Textarea
          placeholder="Titre du blog"
          value={area}
          onChange={(event) => handleArea(event.target.value)}
        />
        <Center>
          <Button onClick={() => publishPost()}>Publier !</Button>
        </Center>
        <Heading>Preview</Heading>
        <ReactMarkdown components={ChakraUIRenderer(mdTheme)}>
          {area}
        </ReactMarkdown>
      </Box>
    </>
  );
};

export default AddBlogPage;
