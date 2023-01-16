import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NavigationHeader } from "../../components/navigation_header";

const AdminUsersPage: NextPage = () => {
  return (
    <Box>
      <NavigationHeader />
      <Heading>Users :</Heading>
    </Box>
  );
};

export default AdminUsersPage;
