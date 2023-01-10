import { component$ } from "@builder.io/qwik";

export default component$(() => {
  //TODO: Redirect to login page if a jwt is not registered in the sessions
  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
});
