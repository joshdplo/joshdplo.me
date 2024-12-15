<script>
  import { page } from "$app/stores";
  import HeroText from "$lib/components/HeroText.svelte";
  import PageMenu from "$lib/components/PageMenu.svelte";

  let { data, children } = $props();
  let isLanding = $derived($page.url.pathname === "/keeps");
  let subtext = $derived(
    $page.url.pathname
      .split("/")
      .slice(
        [...$page.url.pathname].filter((x) => x === "/").length >= 3 ? 3 : 1,
      )
      .join(""),
  );
</script>

<section class="contain">
  <div class="center-full">
    <HeroText
      text="Keeps"
      hasDescenders={true}
      color="quaternary"
      subtext={!isLanding ? `#${subtext}` : null}
    />
  </div>
  <PageMenu
    links={[{ title: "Everything", path: "/keeps" }, ...data.tags]}
    color="quaternary"
  />
</section>

{@render children()}
