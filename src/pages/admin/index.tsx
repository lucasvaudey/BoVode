import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { NavigationHeader } from "../../components/navigation_header";

const AdminPage: NextPage = () => {
  const { data: dataSession } = useSession();
  useEffect(() => {
    if (!dataSession?.user?.admin) {
      Router.push("/").catch((e) => console.error(e));
    }
  });
  if (!dataSession?.user?.admin) {
    return (
      <Box>
        <NavigationHeader showSignIn={true} />
        <Heading>Pas autorisé</Heading>
      </Box>
    );
  }
  return (
    <Box>
      <NavigationHeader showSignIn={true} />
      <Heading>Admin</Heading>
      <Link href={"/admin/users"}>
        <Button m="0.5">Users</Button>
      </Link>
      <Link href={"/admin/add-blog"}>
        <Button m="0.5">Add Blog Post</Button>
      </Link>
    </Box>
  );
};

export default AdminPage;
