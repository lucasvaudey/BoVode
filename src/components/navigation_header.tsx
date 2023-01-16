import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavProps {
  showSignIn?: boolean;
}

export const NavigationHeader: React.FC<NavProps> = ({ showSignIn }) => {
  const { data: sessionData } = useSession();

  // A react component navigation header for the app with the title, link to contact page, realisation page and a sign in button.
  return (
    <Flex>
      <Heading>BoVoDé</Heading>
      <Link href={"/about"}>
        <Button>À propos</Button>
      </Link>
      <Link href={"/projects"}>
        <Button>Projets</Button>
      </Link>
      <Link href={"/contact"}>
        <Button>Contact</Button>
      </Link>
      <Spacer />
      <Link href={"/blog"}>
        <Button>Blog</Button>
      </Link>
      {showSignIn ? (
        <Button
          onClick={
            sessionData ? () => void signOut() : () => void signIn("google")
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
      ) : null}
    </Flex>
  );
};
