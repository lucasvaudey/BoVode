import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavProps {
  showSignIn?: boolean;
}

export const NavigationHeader: React.FC<NavProps> = ({ showSignIn }) => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center p-[5px]">
      <h1 className="pr-5">
        <Link href={"/"}>BoVoDé</Link>
      </h1>
      <Link href={"/about"}>À propos</Link>
      <Link href={"/projects"}>Projets</Link>
      <Link href={"/contact"}>Contact</Link>
      {sessionData?.user?.admin ? <Link href={"/admin"}>Admin</Link> : null}
      <Link href={"/blog"}>Blog</Link>
      {showSignIn ? (
        <button
          onClick={
            sessionData ? () => void signOut() : () => void signIn("google")
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      ) : null}
    </div>
  );
};
