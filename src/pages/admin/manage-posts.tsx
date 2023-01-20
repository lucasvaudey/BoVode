import {
  Box,
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavigationHeader } from "../../components/navigation_header";
import { api } from "../../utils/api";

const ManagePosts: NextPage = () => {
  const { data: posts, refetch } = api.posts.posts.useQuery({});
  const router = useRouter();
  const deleteMutation = api.posts.deletePost.useMutation();
  function pushEdit(id: number) {
    router.push(`/admin/edit-post/${id}`).catch((e) => console.error(e));
  }

  async function deletePost(id: number) {
    deleteMutation.mutate({ id });
    await refetch();
  }

  return (
    <Box>
      <NavigationHeader />
      <Table>
        <TableCaption>All Blogs Posts</TableCaption>
        <Thead>
          <Tr>
            <Th>Blog ID</Th>
            <Th>author</Th>
            <Th>title</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts?.map((post) => (
            <Tr key={post.id}>
              <Td>{post.id}</Td>
              <Td>{post.user.name}</Td>
              <Td>{post.title}</Td>
              <Td>
                <Box>
                  <Button onClick={() => void pushEdit(post.id)}>Edit</Button>
                  <Button onClick={() => void deletePost(post.id)}>
                    Delete
                  </Button>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {posts?.map((post) => (
        <Box key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <Button>{post.title}</Button>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default ManagePosts;
