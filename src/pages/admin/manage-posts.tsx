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
    <div>
      <NavigationHeader />
      <table>
        <caption>All Blogs Posts</caption>
        <thead>
          <tr>
            <th>Blog ID</th>
            <th>author</th>
            <th>title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.user.name}</td>
              <td>{post.title}</td>
              <td>
                <div>
                  <button onClick={() => void pushEdit(post.id)}>Edit</button>
                  <button onClick={() => void deletePost(post.id)}>
                    Delete
                  </button>
                  <Link href={`/blog/${post.id}`}>
                    <button>Lien</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;
