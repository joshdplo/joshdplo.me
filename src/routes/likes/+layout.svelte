<script>
  import { page } from "$app/stores";
  import { likesLinks } from "$lib/config";
  import HeroText from "$lib/components/HeroText.svelte";
  import PageMenu from "$lib/components/PageMenu.svelte";

  let { children } = $props();
  let isLanding = $derived($page.url.pathname === "/likes");
  let subtext = $derived(
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
    <HeroText
      text="Likes"
      subtext={!isLanding ? subtext : null}
      capitalize={true}
    />
  </div>
  <PageMenu links={likesLinks} />
</section>

{@render children()}
