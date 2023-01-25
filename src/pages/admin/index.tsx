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
      <div>
        <NavigationHeader showSignIn={true} />
        <h1>Pas autorisé</h1>
      </div>
    );
  }
  return (
    <div>
      <NavigationHeader showSignIn={true} />
      <h1>Admin</h1>
      <Link href={"/admin/users"}>
        <button className="px-5">Users</button>
      </Link>
      <Link href={"/admin/add-post"}>
        <button className="px-5">Add Blog Post</button>
      </Link>
      <Link href={"/admin/manage-posts"}>
        <button className="mx-5">Manage Posts</button>
      </Link>
    </div>
  );
};

export default AdminPage;
