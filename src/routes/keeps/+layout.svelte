<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import PageMenu from "$lib/components/PageMenu.svelte";

  let { data, children } = $props();
</script>

<section class="contain">
  <div class="center-full">
    <HeroText text="Keeps" hasDescenders={true} color="quaternary" />
  </div>
  <PageMenu
    links={[
      { title: "Fake Place", path: "/keeps/123" },
      { title: "Not Real", path: "/keeps/404" },
      { title: "Even Not Realer", path: "/keeps/440044" },
    ]}
    color="quaternary"
  />
</section>

{@render children()}
