import { Text, Box, Heading, Input, Textarea, Center } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { NextPage } from "next";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NavigationHeader } from "../../components/navigation_header";
import { mdTheme } from "../../styles/mdTheme";

const AddBlogPage: NextPage = () => {
  const [title, setValue] = useState("");
  const [area, setArea] = useState("");
  const handleChange = (value: string) => setValue(value);
  const handleArea = (value: string) => setArea(value);
  return (
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
      <Heading>Preview</Heading>
      <Center>
        <Box>
          <ReactMarkdown components={ChakraUIRenderer(mdTheme)}>
            {area}
          </ReactMarkdown>
        </Box>
      </Center>
    </Box>
  );
};

export default AddBlogPage;
