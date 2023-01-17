import { Center, Heading } from "@chakra-ui/react";
import type { Components } from "react-markdown";

export const mdTheme: Components = {
  h1: ({ children }) => (
    <Center>
      <Heading>{children}</Heading>
    </Center>
  ),
};
