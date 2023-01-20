import { Box, Heading, CircularProgress } from "@chakra-ui/react";
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
