import { Text, Input, Textarea, Center, Button, Alert } from "@chakra-ui/react";
import type { Post } from "@prisma/client";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { mdTheme } from "../styles/mdTheme";
import { api } from "../utils/api";

interface EditComponentProps {
  postId?: number;
  post?: Post;
  edit: boolean;
}

export const EditComponent: React.FC<EditComponentProps> = ({
  postId,
  post,
  edit,
}) => {
  const [area, setArea] = useState(post?.content ?? "");
  const router = useRouter();
  const updateMutation = api.posts.updatePost.useMutation();
  const addblog = api.posts.createPost.useMutation();
  const [title, setTitle] = useState(post?.title ?? "");
  const [thumb, setThumb] = useState(post?.thumbnail ?? "");
  const [error, setError] = useState("");
  function saveEditPost(): void {
    if (title.length == 0 || thumb.length == 0 || area.length == 0) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    if (edit && post && postId) {
      updateMutation.mutate({
        id: postId,
        title: title,
        content: area,
      });
    } else {
      addblog.mutate({ title: title, content: area, thumbnail: "" });
    }
    router.push("/admin/manage-posts").catch((e) => console.error(e));
  }
  return (
    <>
      <Input
        placeholder="Titre du blog"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        placeholder="Mignature du billet de blog"
        value={thumb}
        onChange={(event) => setThumb(event.target.value)}
      />
      <Text>Contenu au format .MD : {area}</Text>
      <Textarea
        placeholder="Titre du blog"
        value={area}
        onChange={(event) => setArea(event.target.value)}
      />
      <Center>
        <Button onClick={() => saveEditPost()}>Sauvegarder !</Button>
      </Center>
      {error.length > 0 ? <Alert status="error">{error}</Alert> : <></>}
      <ReactMarkdown components={ChakraUIRenderer(mdTheme)}>
        {area}
      </ReactMarkdown>
    </>
  );
};
