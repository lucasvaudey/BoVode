import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
    tAdminMut.mutate({ activate: !admin, id: id });
    await refetch();
  }

  return (
    <Box>
      <NavigationHeader />
      <Heading>Users :</Heading>
      <Table variant={"simple"}>
        <TableCaption>All users</TableCaption>
        <Thead>
          <Tr>
            <Th>User id</Th>
            <Th>Username</Th>
            <Th>User email</Th>
            <Th>Admin</Th>
            <Th>Update</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.admin.toString()}</Td>
              <Td>
                <Button onClick={() => void toggleAdmin(user.admin, user.id)}>
                  Toggle Admin
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminUsersPage;
