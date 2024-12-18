<script>
  import { globalState } from "$lib/state.svelte";
  import { site } from "$lib/config";
  import { page } from "$app/stores";

  let { data } = $props();

  const Content = $derived(data.content);

  // Global State
  globalState.pageColor = "quaternary";
</script>

<svelte:head>
  <title>{site.title} &raquo; {data.meta.title}</title>

  <link rel="canonical" href={`${site.url}${$page.url.pathname}`} />
  <meta name="description" content={data.meta.summary} />

  <meta property="og:type" content="article" />
  <meta property="og:url" content={`${site.url}${$page.url.pathname}`} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.summary} />
  <meta property="og:site_name" content={site.title} />
  <!-- @TODO IMAGES -->
  <!-- <meta property="og:image" content="/blog-banner.webp" /> -->

  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.summary} />
  <meta name="twitter:card" content="summary_large_image" />
  <!-- @TODO IMAGES -->
  <!-- <meta name="twitter:image:src" content="/blog-banner.webp" /> -->
  <meta name="twitter:widgets:new-embed-design" content="on" />

  <meta
    name="theme-color"
    content="#ffffff"
    media="(prefers-color-scheme: light)"
  />
  <meta
    name="theme-color"
    content="#000000"
    media="(prefers-color-scheme: dark)"
  />
</svelte:head>

<section class="contain">
  <div class="header">
    {#if data.meta.image}
      <img src="/src/keeps/images/{data.meta.image}?enhanced" alt="" />
    {/if}
    <h1>{data.meta.title}</h1>
    <div class="date">Created {data.meta.date}</div>
  </div>
  <Content />
</section>
