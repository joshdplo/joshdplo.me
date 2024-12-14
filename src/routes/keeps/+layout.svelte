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
    links={[{ title: "Things", path: "/keeps" }, ...data.tags]}
    color="quaternary"
  />
</section>

{@render children()}
