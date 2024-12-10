<script>
  import "$lib/css/reset.css";
  import "$lib/css/fonts.css";
  import "$lib/css/base.scss";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();

  export const prerender = "auto";
</script>

<!-- Header -->
<Header />

<!-- Main Content -->
<main id="main">
  {@render children()}
</main>

<!-- Main Footer -->
<Footer />
