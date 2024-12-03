<script>
  import "$lib/css/reset.css";
  import "$lib/css/fonts.css";
  import "$lib/css/base.scss";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<!-- Header -->
<Header />

<!-- Main Content -->
<main id="main">
  {@render children()}

  <!-- for testing, remove -->
  <div id="spacer" style="width:100%;height:1000px"></div>
</main>

<!-- Main Footer -->
<Footer />
