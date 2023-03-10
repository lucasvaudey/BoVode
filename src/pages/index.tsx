import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { NavigationHeader } from "../components/navigation_header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>BoVoDé</title>
        <meta name="description" content="BoVoDé Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavigationHeader />
        <AuthShowcase />
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-auto">
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <button
        onClick={
          sessionData ? () => void signOut() : () => void signIn("google")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
