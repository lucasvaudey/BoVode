import type { NextPage } from "next";
import { useRouter } from "next/router";
import { EditComponent } from "../../../components/edit_component";
import { NavigationHeader } from "../../../components/navigation_header";
import { api } from "../../../utils/api";

const EditPost: NextPage = () => {
  const { postId } = useRouter().query as {
    postId: string;
  };
  const { data: blog, isLoading } = api.posts.post.useQuery({
    id: parseInt(postId),
  });

  return (
    <div>
      <NavigationHeader />
      <h1>Edit Post</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : blog ? (
        <EditComponent postId={parseInt(postId)} post={blog} edit />
      ) : (
        <>Error</>
      )}
    </div>
  );
};

export default EditPost;
