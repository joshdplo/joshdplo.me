<script>
  import "$lib/css/reset.css";
  import "$lib/css/fonts.css";
  import "$lib/css/base.scss";

  import FloatMenu from "$lib/components/FloatMenu.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import { page } from "$app/stores";

  let { data, children } = $props();
</script>

<svelte:head>
  <title
    >{$page?.error
      ? data.siteHeadTitle + " breaks =["
      : [data.siteHeadTitle, ...$page.url.pathname.split("/").slice(1)]
          .filter(Boolean)
          .join(" ")}</title
  >
</svelte:head>

<!-- Header -->
<nav id="nav-main" class="contain">
  <a class="skip-to-content" href="#main">Skip to main content</a>
  <FloatMenu links={data.globalLinks} />
</nav>

<!-- Main Content -->
<main id="main">
  {@render children()}
</main>

<!-- Main Footer -->
<Footer links={data.globalLinks} />

<style>
  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
    z-index: 25;
  }
</style>
