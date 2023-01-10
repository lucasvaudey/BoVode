import { component$, Slot } from "@builder.io/qwik";
import NavigationBar from "~/components/navigation/navigation-bar";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main>
        <NavigationBar />
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
