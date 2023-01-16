import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { NavigationHeader } from "../../components/navigation_header";
import { api } from "../../utils/api";

const AdminPage: NextPage = () => {
  const { data: dataSession } = useSession();
  const mutation = api.admin.toggleAdmin.useMutation();
  if (!dataSession?.user?.admin) {
    return (
      <Box>
        <NavigationHeader showSignIn={true} />
        <Heading>Pas autorisé</Heading>
      </Box>
    );
  }
  const handleSetAdmin = () => {
    mutation.mutate({ activate: true, id: "clcyijro50000qrwxun7kx62c" });
  };
  return (
    <Box>
      <NavigationHeader showSignIn={true} />
      <Heading>Admin</Heading>
      <Link href={"/users"}>
        <Button>Users</Button>
      </Link>
      <Button onClick={() => void handleSetAdmin()}>
        Set Lucas User to admin :
      </Button>
    </Box>
  );
};

export default AdminPage;
