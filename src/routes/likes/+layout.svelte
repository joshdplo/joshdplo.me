<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import PageMenu from "$lib/components/PageMenu.svelte";
  import { page } from "$app/stores";

  let { data, children } = $props();
  let heroText = $derived(
    $page.url.pathname
      .split("/")
      .slice(
        [...$page.url.pathname].filter((x) => x === "/").length >= 2 ? 2 : 1,
      )
      .join(""),
  );
</script>

<section class="contain">
  <div class="center-full">
    <HeroText text={heroText} hasDescenders={true} capitalize={true} />
  </div>
  <PageMenu links={data.likesLinks} />
</section>

{@render children()}
