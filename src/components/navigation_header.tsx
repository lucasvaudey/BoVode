import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavProps {
  showSignIn?: boolean;
}

export const NavigationHeader: React.FC<NavProps> = ({ showSignIn }) => {
  const { data: sessionData } = useSession();

  return (
    <Flex p="5" alignItems={"center"}>
      <Heading pr="5">
        <Link href={"/"}>BoVoDé</Link>
      </Heading>
      <Link href={"/about"}>
        <Button mx="2.5" variant={"link"}>
          À propos
        </Button>
      </Link>
      <Link href={"/projects"}>
        <Button mx="2.5" variant={"link"}>
          Projets
        </Button>
      </Link>
      <Link href={"/contact"}>
        <Button mx="2.5" variant={"link"}>
          Contact
        </Button>
      </Link>
      <Spacer />
      <Link href={"/blog"}>
        <Button mx="2.5" variant={"link"}>
          Blog
        </Button>
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
