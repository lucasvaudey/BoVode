import type { NextPage } from "next";
import Head from "next/head";
import { NavigationHeader } from "../components/navigation_header";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>À propos</title>
      </Head>
      <div>
        <NavigationHeader />
        <h1>About</h1>
      </div>
    </>
  );
};

export default About;
