import type { NextPage } from "next";
import Head from "next/head";
import { EditComponent } from "../../components/edit_component";
import { NavigationHeader } from "../../components/navigation_header";

const AddBlogPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ajouter un post</title>
      </Head>
      <div>
        <NavigationHeader showSignIn={true} />
        <h1>Add Blog Post</h1>
        <EditComponent edit={false} />
      </div>
    </>
  );
};

export default AddBlogPage;
