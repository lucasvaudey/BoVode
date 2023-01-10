import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex">
      <a href="/">BoVoDé</a>
      <a href="/nous">Nous</a>
      <a href="/realisations">Réalisations</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Prendre contact</a>
    </div>
  );
});
