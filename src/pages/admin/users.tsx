import type { NextPage } from "next";
import { NavigationHeader } from "../../components/navigation_header";
import { api } from "../../utils/api";

const AdminUsersPage: NextPage = () => {
  const { data: users, refetch } = api.admin.users.useQuery({
    take: 10,
    skip: 0,
  });
  const tAdminMut = api.admin.toggleAdmin.useMutation();
  async function toggleAdmin(admin: boolean, id: string) {
    await tAdminMut.mutateAsync({ activate: !admin, id: id }).catch((e) => {
      alert(e.message);
    });
    await refetch();
  }

  return (
    <div>
      <NavigationHeader />
      <h1>Users :</h1>
      <table>
        <caption>All users</caption>
        <thead>
          <tr>
            <th>User id</th>
            <th>Username</th>
            <th>User email</th>
            <th>Admin</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin.toString()}</td>
              <td>
                <button onClick={() => void toggleAdmin(user.admin, user.id)}>
                  Toggle Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
