import { Heading } from "@chakra-ui/react";
import type { Components } from "react-markdown";

export const mdTheme: Components = {
  h1: ({ children }) => <Heading color="red">{children}</Heading>,
};
