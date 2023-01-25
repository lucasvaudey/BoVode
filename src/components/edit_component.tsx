import type { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
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
      addblog.mutate({ title: title, content: area, thumbnail: thumb });
    }
    router.push("/admin/manage-posts").catch((e) => console.error(e));
  }
  return (
    <>
      <input
        placeholder="Titre du blog"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        placeholder="Mignature du billet de blog"
        value={thumb}
        onChange={(event) => setThumb(event.target.value)}
      />
      <p>Contenu au format .MD :</p>
      <textarea
        placeholder="Titre du blog"
        value={area}
        onChange={(event) => setArea(event.target.value)}
      />
      <center>
        <button onClick={() => saveEditPost()}>Sauvegarder !</button>
      </center>
      {error.length > 0 ? <p className="text-red">{error}</p> : <></>}
      <ReactMarkdown>{area}</ReactMarkdown>
    </>
  );
};
