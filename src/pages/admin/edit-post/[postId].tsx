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
        <EditComponent postId={parseInt(postId)} post={blog} />
      ) : (
        <>Error</>
      )}
    </Box>
  );
};

export default EditPost;

interface EditComponentProps {
  postId: number;
  post: Post;
}

const EditComponent: React.FC<EditComponentProps> = ({ postId, post }) => {
  const [area, setArea] = useState(post.content ?? "");
  const router = useRouter();
  const updateMutation = api.posts.updatePost.useMutation();
  const [title, setTitle] = useState(post.title ?? "");
  function saveEditPost(): void {
    updateMutation.mutate({
      id: postId,
      title: title,
      content: area,
    });
    router.push("/admin/manage-posts").catch((e) => console.error(e));
  }
  return (
    <>
      <Input
        placeholder="Titre du blog"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Text>Contenu au format .MD : {area}</Text>
      <Textarea
        placeholder="Titre du blog"
        value={area}
        onChange={(event) => setArea(event.target.value)}
      />
      <Center>
        <Button onClick={() => saveEditPost()}>Publier !</Button>
      </Center>
      <ReactMarkdown components={ChakraUIRenderer(mdTheme)}>
        {area}
      </ReactMarkdown>
    </>
  );
};
