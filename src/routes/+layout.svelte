<script>
  import "$lib/css/reset.css";
  import "$lib/css/fonts.css";
  import "$lib/css/base.scss";

  import { site, globalLinks } from "$lib/config";
  import { page } from "$app/stores";
  import FloatMenu from "$lib/components/FloatMenu.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title
    >{$page?.error
      ? site.title + " breaks =["
      : [site.title, ...$page.url.pathname.split("/").slice(1)]
          .filter(Boolean)
          .join(" ")}</title
  >
</svelte:head>

<!-- Header -->
<nav id="nav-main" class="contain">
  <a class="skip-to-content" href="#main">Skip to main content</a>
  <FloatMenu links={globalLinks} />
</nav>

<!-- Main Content -->
<main id="main">
  {@render children()}
</main>

<!-- Main Footer -->
<Footer links={globalLinks} />

<style>
  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    z-index: 19;
  }
</style>
